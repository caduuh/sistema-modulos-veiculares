const crypto = require("crypto");
const { assertClientAccess } = require("../auth/session");
const { getSupabaseClient } = require("../db/supabase");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getBootstrapData(seedFallback, session = null) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ...seedFallback, remote: false };
  }

  const [clients, providers, services, pocs, stockMovements, financeExpenses, accesses] = await Promise.all([
    readTable(supabase, "clients"),
    readTable(supabase, "providers"),
    readTable(supabase, "services"),
    readTable(supabase, "poc_controls"),
    readTable(supabase, "stock_movements"),
    readOptionalTable(supabase, "finance_expenses"),
    readAccesses(supabase).catch(() => seedFallback.accesses || [])
  ]);

  const allowedClients = new Set((session?.clients || []).map(String));
  const isAdmin = session?.role === "admin" || allowedClients.has("all");
  const canSeeFinance = isAdmin || session?.views?.includes("all") || session?.views?.includes("finance");
  const visibleClients = isAdmin ? clients : clients.filter((client) => allowedClients.has(String(client.id)));
  const visibleClientIds = new Set(visibleClients.map((client) => String(client.id)));
  const visibleServices = isAdmin ? services : services.filter((service) => visibleClientIds.has(String(service.client_id)));
  const visiblePocs = isAdmin ? pocs : pocs.filter((poc) => visibleClientIds.has(String(poc.client_id)));
  const visibleStock = isAdmin ? stockMovements : stockMovements.filter((move) => visibleClientIds.has(String(move.client_id)));

  return {
    remote: true,
    clients: visibleClients.map(mapClient),
    providers: providers.map(mapProvider),
    services: visibleServices.map(mapService),
    pocs: visiblePocs.map(mapPoc),
    stockMovements: visibleStock.map(mapStockMovement),
    financeExpenses: canSeeFinance ? financeExpenses.map(mapFinanceExpense) : [],
    accesses: isAdmin ? accesses : []
  };
}

async function readTable(supabase, table) {
  const { data, error } = await supabase.from(table).select("*").limit(500);
  if (error) {
    throw new Error(`Falha ao ler ${table}: ${error.message}`);
  }

  return data || [];
}

async function readOptionalTable(supabase, table) {
  try {
    return await readTable(supabase, table);
  } catch {
    return [];
  }
}

async function createClient(payload, session) {
  return insertRow("clients", {
    company_name: payload.company,
    responsible_name: payload.responsible,
    phone: payload.phone,
    email: payload.email,
    cnpj: payload.cnpj,
    address: payload.address,
    status: payload.status,
    fleet_size: Number(payload.fleet || 0),
    installed_modules: Number(payload.installedModules || 0),
    company_type: payload.companyType || "Padrao",
    exclusive: Boolean(payload.exclusive),
    notes: payload.notes || ""
  }, mapClient);
}

async function createProvider(payload, session) {
  return insertRow("providers", {
    name: payload.name,
    region: payload.region,
    state: payload.state,
    city: payload.city,
    type: payload.type,
    availability: payload.availability,
    contact: payload.contact,
    agenda: payload.agenda || ""
  }, mapProvider);
}

async function createService(payload, session) {
  if (session) assertClientAccess(session, payload.clientId);
  return insertRow("services", {
    client_id: payload.clientId,
    provider_id: payload.providerId,
    service_type: payload.serviceType,
    region_state: payload.regionState,
    scheduled_date: payload.date,
    service_time: payload.time || null,
    vehicle_plate: payload.vehiclePlate || "",
    vehicle_model: payload.vehicleModel || "",
    installation_type: payload.installationType,
    km: Number(payload.km || 0),
    km_value: Number(payload.kmValue || 0),
    toll: Number(payload.toll || 0),
    install_value: Number(payload.installValue || 0),
    provider_paid: Number(payload.providerPaid || 0),
    notes: payload.notes || "",
    status: payload.status
  }, mapService);
}

async function createFinanceExpense(payload, session) {
  return insertRow("finance_expenses", {
    type: payload.type,
    category: payload.category,
    amount: Number(payload.amount || 0),
    due_date: payload.dueDate,
    status: payload.status || "Pendente",
    notes: payload.notes || ""
  }, mapFinanceExpense);
}

async function createStockMovement(payload, session) {
  if (session) assertClientAccess(session, payload.clientId);
  return insertRow("stock_movements", {
    client_id: payload.clientId,
    region: payload.region,
    type: payload.type,
    quantity: Number(payload.quantity || 0),
    responsible: payload.responsible,
    notes: payload.notes || ""
  }, mapStockMovement);
}

async function readAccesses(supabase = getSupabaseClient()) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("app_accesses")
    .select("id,name,email,role,allowed_views,active,app_access_clients(client_id)")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data || []).map(mapAccess);
}

async function upsertAccess(payload) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const error = new Error("Banco nao configurado.");
    error.statusCode = 503;
    throw error;
  }

  if (!payload.name || !payload.email || !payload.role) {
    const error = new Error("Nome, e-mail e perfil sao obrigatorios.");
    error.statusCode = 400;
    throw error;
  }
  if (!isValidEmail(payload.email)) {
    const error = new Error("E-mail invalido.");
    error.statusCode = 400;
    throw error;
  }

  const row = {
    name: payload.name,
    email: String(payload.email).trim().toLowerCase(),
    role: normalizeRole(payload.role),
    allowed_views: normalizeRole(payload.role) === "admin" ? ["all"] : (payload.views || []),
    active: payload.active !== false
  };
  if (payload.password) row.password_hash = hashPassword(payload.password);

  if (!payload.id && !row.password_hash) {
    const error = new Error("Senha obrigatoria para novo acesso.");
    error.statusCode = 400;
    throw error;
  }

  const query = payload.id
    ? supabase.from("app_accesses").update(row).eq("id", payload.id).select("*").single()
    : supabase.from("app_accesses").insert(row).select("*").single();
  const { data, error } = await query;
  if (error) {
    error.statusCode = 400;
    throw error;
  }

  const clients = payload.role === "admin" ? ["all"] : (payload.clients || []);
  await supabase.from("app_access_clients").delete().eq("access_id", data.id);
  if (clients.length && !clients.includes("all")) {
    const rows = clients.map((clientId) => ({ access_id: data.id, client_id: clientId }));
    const { error: clientsError } = await supabase.from("app_access_clients").insert(rows);
    if (clientsError) {
      clientsError.statusCode = 400;
      throw clientsError;
    }
  }

  return (await readAccesses()).find((access) => String(access.id) === String(data.id));
}

async function verifyAccessLogin(payload) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const email = String(payload.email || "").trim().toLowerCase();
  if (!isValidEmail(email)) return null;
  const { data, error } = await supabase
    .from("app_accesses")
    .select("id,name,email,role,password_hash,allowed_views,active,app_access_clients(client_id)")
    .eq("email", email)
    .maybeSingle();

  if (error || !data || !data.active || !verifyPassword(payload.password, data.password_hash)) return null;
  const access = mapAccess(data);
  if (access.role !== normalizeRole(payload.role)) return null;
  if (access.role !== "admin" && !access.clients.length) return null;
  return access;
}

async function insertRow(table, row, mapper) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const error = new Error("Banco nao configurado.");
    error.statusCode = 503;
    throw error;
  }

  const { data, error } = await supabase.from(table).insert(row).select("*").single();
  if (error) {
    error.statusCode = 400;
    throw error;
  }

  return mapper(data);
}

function mapClient(row) {
  return {
    id: row.id,
    company: row.company_name,
    responsible: row.responsible_name,
    phone: row.phone,
    email: row.email,
    cnpj: row.cnpj,
    address: row.address,
    status: row.status,
    fleet: row.fleet_size,
    installedModules: row.installed_modules || 0,
    companyType: row.company_type || "Padrao",
    exclusive: Boolean(row.exclusive),
    notes: row.notes || ""
  };
}

function mapProvider(row) {
  return {
    id: row.id,
    name: row.name,
    region: row.region,
    state: row.state,
    city: row.city,
    type: row.type,
    availability: row.availability,
    contact: row.contact,
    agenda: row.agenda || ""
  };
}

function mapService(row) {
  return {
    id: row.id,
    clientId: row.client_id,
    providerId: row.provider_id,
    regionState: row.region_state,
    date: row.scheduled_date,
    time: row.service_time || "",
    vehiclePlate: row.vehicle_plate || "",
    vehicleModel: row.vehicle_model || "",
    serviceType: row.service_type,
    installationType: row.installation_type,
    km: Number(row.km || 0),
    kmValue: Number(row.km_value || 0),
    toll: Number(row.toll || 0),
    installValue: Number(row.install_value || 0),
    providerPaid: Number(row.provider_paid || 0),
    notes: row.notes || "",
    status: row.status
  };
}

function mapFinanceExpense(row) {
  return {
    id: row.id,
    type: row.type,
    category: row.category,
    amount: Number(row.amount || 0),
    dueDate: row.due_date,
    status: row.status,
    notes: row.notes || ""
  };
}

function mapPoc(row) {
  return {
    id: row.id,
    clientId: row.client_id,
    start: row.start_date,
    end: row.end_date,
    modules: row.installed_modules,
    visits: []
  };
}

function mapStockMovement(row) {
  return {
    id: row.id,
    date: row.movement_date,
    clientId: row.client_id,
    region: row.region,
    type: row.type,
    quantity: row.quantity,
    responsible: row.responsible,
    notes: row.notes || ""
  };
}

function mapAccess(row) {
  const role = normalizeRole(row.role);
  const clients = role === "admin"
    ? ["all"]
    : (row.app_access_clients || []).map((item) => item.client_id);
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role,
    active: row.active !== false,
    clients,
    views: row.allowed_views || (role === "admin" ? ["all"] : [])
  };
}

function normalizeRole(role) {
  if (role === "company") return "manager";
  if (role === "analyst") return "technician";
  return role;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!password || !stored) return false;
  if (String(stored) === String(password)) return true;
  const [salt, hash] = String(stored).split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(String(password), salt, 64);
  const storedBuffer = Buffer.from(hash, "hex");
  return storedBuffer.length === candidate.length && crypto.timingSafeEqual(storedBuffer, candidate);
}

function isValidEmail(email) {
  return EMAIL_PATTERN.test(String(email || "").trim());
}

module.exports = {
  getBootstrapData,
  createClient,
  createProvider,
  createService,
  createFinanceExpense,
  createStockMovement,
  readAccesses,
  upsertAccess,
  verifyAccessLogin
};
