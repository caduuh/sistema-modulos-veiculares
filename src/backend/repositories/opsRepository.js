const { getSupabaseClient } = require("../db/supabase");

async function getBootstrapData(seedFallback) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ...seedFallback, remote: false };
  }

  const [clients, providers, services, pocs, stockMovements, financeExpenses, accessUsers] = await Promise.all([
    readTable(supabase, "clients"),
    readTable(supabase, "providers"),
    readTable(supabase, "services"),
    readTable(supabase, "poc_controls"),
    readTable(supabase, "stock_movements"),
    readOptionalTable(supabase, "finance_expenses"),
    readOptionalTable(supabase, "access_users")
  ]);

  return {
    remote: true,
    clients: clients.map(mapClient),
    providers: providers.map(mapProvider),
    services: services.map(mapService),
    pocs: pocs.map(mapPoc),
    stockMovements: stockMovements.map(mapStockMovement),
    financeExpenses: financeExpenses.map(mapFinanceExpense),
    accessUsers: accessUsers.map(mapAccessUser)
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

async function createClient(payload) {
  return insertRow("clients", {
    company_name: payload.company,
    responsible_name: payload.responsible,
    phone: payload.phone,
    email: payload.email,
    cnpj: payload.cnpj,
    address: payload.address,
    status: payload.status,
    fleet_size: Number(payload.fleet || 0),
    notes: payload.notes || ""
  }, mapClient);
}

async function createProvider(payload) {
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

async function createService(payload) {
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

async function createFinanceExpense(payload) {
  return insertRow("finance_expenses", {
    type: payload.type,
    category: payload.category,
    amount: Number(payload.amount || 0),
    due_date: payload.dueDate,
    status: payload.status || "Pendente",
    notes: payload.notes || ""
  }, mapFinanceExpense);
}

async function createStockMovement(payload) {
  return insertRow("stock_movements", {
    region: payload.region,
    type: payload.type,
    quantity: Number(payload.quantity || 0),
    responsible: payload.responsible,
    notes: payload.notes || ""
  }, mapStockMovement);
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

function mapAccessUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: "",
    role: row.role,
    permissions: row.permissions || [],
    active: row.active
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
    region: row.region,
    type: row.type,
    quantity: row.quantity,
    responsible: row.responsible,
    notes: row.notes || ""
  };
}

module.exports = {
  getBootstrapData,
  createClient,
  createProvider,
  createService,
  createFinanceExpense,
  createStockMovement
};
