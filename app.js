const STORAGE_KEY = "instalacoes-sarter-v1";

const menu = [
  ["dashboard", "Dashboard"],
  ["access", "Acessos"],
  ["clients", "Clientes"],
  ["providers", "Prestadores"],
  ["services", "Agendamentos"],
  ["finance", "Financeiro"],
  ["reports", "Relatorios"],
  ["poc", "POC"],
  ["calendarView", "Calendario"],
  ["stock", "Estoque"]
];
const allViewIds = menu.map(([id]) => id);
const roleLabels = {
  admin: "Admin",
  manager: "Gestor",
  technician: "Tecnico"
};
const defaultViewsByRole = {
  admin: allViewIds,
  manager: allViewIds.filter((id) => id !== "access"),
  technician: ["calendarView", "services", "stock"]
};

const demo = {
  clients: [
    { id: 1, company: "Facss", responsible: "Marina Rocha", phone: "(31) 98810-4420", email: "marina@facss.com.br", cnpj: "12.345.678/0001-90", address: "Contagem, MG", status: "Contrato fechado", fleet: 86, installedModules: 40, companyType: "Facss", exclusive: true, notes: "Atendimento exclusivo. Não pode coincidir com agenda geral." },
    { id: 2, company: "Frota Minas Alimentos", responsible: "Rafael Dias", phone: "(31) 99722-8810", email: "rafael@frotaminas.com.br", cnpj: "31.554.010/0001-12", address: "Betim, MG", status: "Cliente ativo", fleet: 42, installedModules: 18, companyType: "Padrao", exclusive: false, notes: "Manutenção preventiva prioritária." },
    { id: 3, company: "Expresso Centro-Oeste", responsible: "Camila Torres", phone: "(62) 99180-1100", email: "camila@ecoeste.com.br", cnpj: "08.117.222/0001-40", address: "Goiânia, GO", status: "POC", fleet: 24, installedModules: 8, companyType: "Padrao", exclusive: false, notes: "POC com 8 módulos plug and play." },
    { id: 4, company: "Rota Sul Distribuição", responsible: "Henrique Prado", phone: "(51) 98822-4415", email: "henrique@rotasul.com.br", cnpj: "45.070.889/0001-55", address: "Porto Alegre, RS", status: "POC", fleet: 18, installedModules: 5, companyType: "Padrao", exclusive: false, notes: "Teste com Izzycan em veículos leves." }
  ],
  providers: [
    { id: 1, name: "Equipe BH Norte", region: "Belo Horizonte", state: "MG", city: "Belo Horizonte", type: "Equipe própria", availability: "Disponível", contact: "(31) 99910-2010", agenda: "Seg-Sex 08:00-18:00" },
    { id: 2, name: "TecCar Contagem", region: "Metropolitana BH", state: "MG", city: "Contagem", type: "Terceirizado", availability: "Disponível", contact: "(31) 98831-9022", agenda: "Seg-Sáb 07:30-17:00" },
    { id: 3, name: "SulTrack Serviços", region: "Sul", state: "RS", city: "Porto Alegre", type: "Terceirizado", availability: "Agenda cheia", contact: "(51) 99610-7720", agenda: "Ter-Sáb 08:00-18:00" },
    { id: 4, name: "Equipe Centro-Oeste", region: "Centro-Oeste", state: "GO", city: "Goiânia", type: "Equipe própria", availability: "Em deslocamento", contact: "(62) 99120-4210", agenda: "Seg-Sex 09:00-18:00" }
  ],
  services: [
    { id: 1, clientId: 1, providerId: 1, regionState: "Contagem, MG", date: "2026-05-13", time: "09:00", vehiclePlate: "FAC1A40", vehicleModel: "Van", serviceType: "Instalação", installationType: "Plug and Play", km: 34, kmValue: 2.4, toll: 0, installValue: 680, providerPaid: 180, notes: "Instalar 4 módulos em vans.", status: "Em andamento" },
    { id: 2, clientId: 2, providerId: 2, regionState: "Betim, MG", date: "2026-05-12", time: "14:00", vehiclePlate: "FMG2B42", vehicleModel: "Fiorino", serviceType: "Manutenção", installationType: "Izzycan", km: 58, kmValue: 2.4, toll: 18, installValue: 420, providerPaid: 145, notes: "Revisar falha de leitura CAN.", status: "Agendado" },
    { id: 3, clientId: 3, providerId: 4, regionState: "Goiânia, GO", date: "2026-05-13", time: "10:30", vehiclePlate: "ECO8P24", vehicleModel: "Sprinter", serviceType: "Instalação", installationType: "Plug and Play", km: 22, kmValue: 2.2, toll: 0, installValue: 920, providerPaid: 190, notes: "POC inicial com 8 módulos.", status: "Em andamento" },
    { id: 4, clientId: 4, providerId: 3, regionState: "Porto Alegre, RS", date: "2026-05-11", time: "08:30", vehiclePlate: "ROT1S18", vehicleModel: "Master", serviceType: "Retirada", installationType: "Híbrido OBD + chicote", km: 41, kmValue: 2.6, toll: 12, installValue: 760, providerPaid: 260, notes: "Validar compatibilidade antes de finalizar.", status: "Agendado" },
    { id: 5, clientId: 1, providerId: 1, regionState: "Contagem, MG", date: "2026-05-10", time: "11:00", vehiclePlate: "FAC0M26", vehicleModel: "Ducato", serviceType: "Manutenção", installationType: "Plug and Play", km: 26, kmValue: 2.4, toll: 0, installValue: 360, providerPaid: 120, notes: "Troca de módulo com mau contato.", status: "Finalizado" }
  ],
  financeExpenses: [
    { id: 1, type: "Despesa fixa", category: "Salário colaborador", amount: 2200, dueDate: "2026-05-20", status: "Pendente", notes: "Pagamento mensal" },
    { id: 2, type: "Despesa variável", category: "Gasolina", amount: 320, dueDate: "2026-05-16", status: "Pendente", notes: "Deslocamentos da semana" }
  ],
  pocs: [
    { id: 1, clientId: 3, start: "2026-05-06", end: "2026-06-05", modules: 8, visits: ["Instalação inicial em 15/05", "Checklist remoto pendente"], selected: false },
    { id: 2, clientId: 4, start: "2026-05-09", end: "2026-06-08", modules: 5, visits: ["Visita técnica agendada", "Validação Izzycan"], selected: false }
  ],
  convertedPocs: [
    { id: 1, client: "Cliente piloto convertido", date: "2026-05-03", modules: 6 }
  ],
  accesses: [
    { id: 1, name: "Admin", email: "admin@sarter.local", role: "admin", password: "Sarter@123", clients: ["all"], views: defaultViewsByRole.admin },
    { id: 2, name: "Gestor Facss", email: "facss@sarter.local", role: "manager", password: "Sarter@123", clients: [1], views: defaultViewsByRole.manager },
    { id: 3, name: "Tecnico Operacional", email: "tecnico@sarter.local", role: "technician", password: "Sarter@123", clients: [1, 2], views: defaultViewsByRole.technician }
  ],
  stockMovements: [
    { id: 1, date: "2026-05-01", clientId: 1, region: "MG", type: "Entrada", quantity: 80, responsible: "Matriz", notes: "Lote maio" },
    { id: 2, date: "2026-05-06", clientId: 3, region: "GO", type: "Entregue", quantity: 8, responsible: "Equipe Centro-Oeste", notes: "POC Expresso Centro-Oeste" },
    { id: 3, date: "2026-05-09", clientId: 4, region: "RS", type: "Retirado na matriz", quantity: 5, responsible: "SulTrack Serviços", notes: "POC Rota Sul" },
    { id: 4, date: "2026-05-10", clientId: 1, region: "MG", type: "Saída", quantity: 4, responsible: "Equipe BH Norte", notes: "Troca em manutenção" }
  ]
};

let state = loadState();
let currentView = "dashboard";
let providerFilter = "Todos";
let serviceFilter = "Todos";
let selectedPocId = null;
let remoteEnabled = false;
let currentUser = JSON.parse(sessionStorage.getItem("sarter-session") || "null");
let authToken = sessionStorage.getItem("sarter-token") || "";
let hideValues = localStorage.getItem("sarter-hide-values") === "1";
let sidebarCollapsed = localStorage.getItem("sarter-sidebar-collapsed") === "1";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const ADMIN_DEFAULT = { email: "admin@sarter.local", password: "Sarter@123" };
const API_TIMEOUT_MS = 8000;
const byId = (id) => document.getElementById(id);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const money = (value) => brl.format(Number(value) || 0);
const uid = (items) => {
  const numericIds = items.map((item) => Number(item.id)).filter(Number.isFinite);
  return numericIds.length ? Math.max(0, ...numericIds) + 1 : `local-${Date.now()}`;
};
const today = "2026-05-13";

boot();

async function boot() {
  renderNav();
  bindEvents();
  if (currentUser && authToken) await hydrateRemoteState();
  fillSelects();
  renderAll();
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const data = saved ? JSON.parse(saved) : structuredClone(demo);
  const savedAccesses = localStorage.getItem("sarter-accesses");
  data.convertedPocs = data.convertedPocs || [];
  data.pocs = data.pocs || [];
  data.stockMovements = data.stockMovements || [];
  data.financeExpenses = data.financeExpenses || structuredClone(demo.financeExpenses);
  data.accesses = normalizeAccesses(savedAccesses ? JSON.parse(savedAccesses) : (data.accesses || structuredClone(demo.accesses)));
  data.clients = (data.clients || []).map((client) => ({ installedModules: 0, companyType: "Padrao", exclusive: false, ...client }));
  data.providers = (data.providers || []).map((provider) => ({ ...provider, installValue: undefined, maintenanceValue: undefined }));
  data.services = (data.services || []).map(normalizeService);
  data.stockMovements = data.stockMovements.map((move) => ({ clientId: data.clients[0]?.id || 1, ...move }));
  return data;
}

function normalizeService(service) {
  return {
    time: "",
    vehiclePlate: "",
    vehicleModel: "",
    ...service,
    installationType: service.installationType === "Outro" ? (service.customInstallation || "Outro") : service.installationType,
    gasoline: undefined,
    carMaintenance: undefined,
    fixedSalary: undefined,
    expenses: undefined
  };
}

function normalizeAccesses(accesses) {
  return accesses.map((access) => {
    const role = access.role === "company" ? "manager" : access.role === "analyst" ? "technician" : access.role;
    return {
      ...access,
      role,
      clients: access.clients || (role === "admin" ? ["all"] : []),
      views: access.views || defaultViewsByRole[role] || [],
      active: access.active !== false
    };
  });
}

function allowedMenu() {
  return menu.filter(([id]) => canView(id));
}

function canView(viewId) {
  if (!currentUser) return viewId === "dashboard";
  if (currentUser.role === "admin") return true;
  const allowed = currentUser.allowedViews || defaultViewsByRole[currentUser.role] || [];
  return allowed.includes("all") || allowed.includes(viewId);
}

function viewName(viewId) {
  return menu.find(([id]) => id === viewId)?.[1] || viewId;
}

function isValidEmail(email) {
  return EMAIL_PATTERN.test(String(email || "").trim());
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function saveState() {
  if (remoteEnabled) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function apiHeaders(extra = {}) {
  return {
    ...extra,
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
  };
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function hydrateRemoteState() {
  if (!authToken) return;
  try {
    const response = await fetchWithTimeout("/api/bootstrap", { headers: apiHeaders({ "Accept": "application/json" }) });
    if (!response.ok) return;

    const payload = await response.json();
    if (!payload.data?.remote) return;

    state = {
      ...state,
      ...payload.data,
      convertedPocs: state.convertedPocs || []
    };
    state.clients = state.clients.map((client) => ({ installedModules: 0, companyType: "Padrao", exclusive: false, ...client }));
    state.accesses = normalizeAccesses(state.accesses || structuredClone(demo.accesses));
    state.providers = state.providers.map((provider) => ({ ...provider, installValue: undefined, maintenanceValue: undefined }));
    state.services = state.services.map(normalizeService);
    state.financeExpenses = state.financeExpenses || [];
    state.stockMovements = state.stockMovements.map((move) => ({ clientId: state.clients[0]?.id || 1, ...move }));
    remoteEnabled = true;
    toast("Banco online conectado.");
  } catch {
    remoteEnabled = false;
  }
}

function renderNav() {
  const items = allowedMenu();
  byId("nav").innerHTML = items.map(([id, label]) => (
    `<button class="${id === currentView ? "active" : ""}" data-view="${id}" type="button">${label}</button>`
  )).join("");
}

function bindEvents() {
  byId("loginRole").addEventListener("change", renderLoginCompanies);
  byId("loginForm").addEventListener("submit", handleLogin);
  byId("logoutButton").addEventListener("click", handleLogout);
  byId("sidebarToggle").addEventListener("click", toggleSidebar);
  byId("toggleValues").addEventListener("click", toggleValuesVisibility);
  byId("globalCompanyFilter").addEventListener("change", renderAll);
  byId("accessForm").addEventListener("submit", saveAccess);
  byId("nav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    currentView = button.dataset.view;
    document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === currentView));
    byId("pageTitle").textContent = menu.find(([id]) => id === currentView)[1];
    renderNav();
    renderAll();
  });
  byId("accessForm").elements.role.addEventListener("change", renderAccessRoleDefaults);
  byId("reportServiceFilter")?.addEventListener("change", renderReports);
  byId("clientForm").addEventListener("submit", saveClient);
  byId("providerForm").addEventListener("submit", saveProvider);
  byId("serviceForm").addEventListener("submit", saveService);
  byId("serviceForm").addEventListener("input", updateServicePreview);
  byId("expenseForm")?.addEventListener("submit", saveExpense);
  byId("stockForm").addEventListener("submit", saveStockMovement);
  byId("calendarQuickForm").addEventListener("submit", saveCalendarQuickService);
  byId("dailySchedule").addEventListener("change", handleDashboardQuickEdit);
  document.querySelectorAll("[data-provider-filter]").forEach((button) => button.addEventListener("click", () => {
    providerFilter = button.dataset.providerFilter;
    document.querySelectorAll("[data-provider-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderProviders();
  }));
  document.querySelectorAll("[data-service-filter]").forEach((button) => button.addEventListener("click", () => {
    serviceFilter = button.dataset.serviceFilter;
    document.querySelectorAll("[data-service-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderServices();
  }));
  byId("printReport")?.addEventListener("click", () => { currentView = "reports"; byId("nav").querySelector('[data-view="reports"]').click(); window.print(); });
  byId("reportPrint").addEventListener("click", () => window.print());
  byId("exportExcel")?.addEventListener("click", exportExcel);
  byId("reportExcel").addEventListener("click", exportExcel);
  byId("convertSelectedPoc").addEventListener("click", convertPoc);
}

function renderAll() {
  normalizeAccess();
  renderNav();
  renderLoginCompanies();
  fillSelects();
  renderDashboard();
  renderAccesses();
  renderClients();
  renderProviders();
  renderServices();
  renderFinance();
  renderReports();
  renderPoc();
  renderCalendars();
  renderStock();
}

function normalizeAccess() {
  document.body.classList.toggle("is-authenticated", Boolean(currentUser));
  document.body.classList.toggle("sidebar-collapsed", sidebarCollapsed);
  document.body.classList.toggle("hide-values", hideValues);
  byId("toggleValues").textContent = hideValues ? "Valores ocultos" : "Ocultar valores";
  if (!currentUser) return;
  if (currentUser.role === "company") currentUser.role = "manager";
  if (currentUser.role === "analyst") currentUser.role = "technician";
  currentUser.allowedViews = currentUser.allowedViews || defaultViewsByRole[currentUser.role] || [];
  if (currentUser.role !== "admin") {
    currentUser.clientId = currentUser.clientId || currentUser.allowedClients?.[0] || state.clients[0]?.id;
  }
  if (!canView(currentView)) currentView = allowedMenu()[0]?.[0] || "dashboard";
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === currentView));
  byId("pageTitle").textContent = menu.find(([id]) => id === currentView)?.[1] || "Dashboard";
}

async function handleLogin(event) {
  event.preventDefault();
  const role = byId("loginRole").value;
  const email = normalizeEmail(byId("loginEmail").value);
  const password = byId("loginPassword").value;
  if (!isValidEmail(email)) {
    toast("Informe um e-mail valido.");
    return;
  }

  try {
    const response = await fetchWithTimeout("/api/auth/login", {
      method: "POST",
      headers: apiHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ email, password, role })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access) {
      toast(data.error || "Acesso nao liberado.");
      return;
    }
    currentUser = data.access.role === "admin"
      ? { role: "admin", label: data.access.name || "Administrador", allowedViews: data.access.views || defaultViewsByRole.admin }
      : { role: data.access.role, clientId: data.access.clients?.[0], allowedClients: data.access.clients, allowedViews: data.access.views || defaultViewsByRole[data.access.role], label: data.access.name };
    authToken = data.token || "";
    sessionStorage.setItem("sarter-token", authToken);
    sessionStorage.setItem("sarter-session", JSON.stringify(currentUser));
    await hydrateRemoteState();
    renderAll();
    return;
  } catch {
    remoteEnabled = false;
  }

  const access = state.accesses.find((item) => {
    if (item.active === false) return false;
    if (normalizeEmail(item.email) !== email || item.role !== role || item.password !== password) return false;
    if (role === "admin") return true;
    return item.clients?.length;
  });
  const fallbackAdmin = role === "admin" && email === ADMIN_DEFAULT.email && password === ADMIN_DEFAULT.password;
  if (!access && !fallbackAdmin) {
    toast("Acesso nao liberado para este perfil/empresa.");
    return;
  }
  currentUser = role === "admin"
    ? { role: "admin", label: access?.name || "Administrador", allowedViews: access?.views || defaultViewsByRole.admin }
    : { role, clientId: access.clients?.[0], allowedClients: access.clients, allowedViews: access.views || defaultViewsByRole[role], label: access.name };
  sessionStorage.setItem("sarter-session", JSON.stringify(currentUser));
  renderAll();
}

function handleLogout() {
  currentUser = null;
  authToken = "";
  remoteEnabled = false;
  sessionStorage.removeItem("sarter-session");
  sessionStorage.removeItem("sarter-token");
  renderAll();
}

function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  localStorage.setItem("sarter-sidebar-collapsed", sidebarCollapsed ? "1" : "0");
  renderAll();
}

function toggleValuesVisibility() {
  hideValues = !hideValues;
  localStorage.setItem("sarter-hide-values", hideValues ? "1" : "0");
  renderAll();
}

function renderLoginCompanies() {
  const role = byId("loginRole").value;
  if (role === "admin" && !byId("loginEmail").value) byId("loginEmail").value = ADMIN_DEFAULT.email;
}

function renderAccessRoleDefaults() {
  const form = byId("accessForm");
  const role = form.elements.role.value;
  const views = defaultViewsByRole[role] || [];
  form.querySelectorAll('input[name="clients"]').forEach((input) => {
    input.checked = role === "admin";
  });
  form.querySelectorAll('input[name="views"]').forEach((input) => {
    input.checked = role === "admin" || views.includes(input.value);
  });
}

function query() {
  return "";
}

function matchesText(...values) {
  const q = query();
  return !q || values.join(" ").toLowerCase().includes(q);
}

function clientName(id) {
  return state.clients.find((item) => String(item.id) === String(id))?.company || "Cliente removido";
}

function providerName(id) {
  return state.providers.find((item) => String(item.id) === String(id))?.name || "Prestador removido";
}

function serviceTotal(service) {
  // Regra financeira principal: deslocamento por KM + instalação + pedágio.
  return (Number(service.km) * Number(service.kmValue)) + Number(service.installValue) + Number(service.toll);
}

function serviceProfit(service) {
  // Lucro por atendimento antes das despesas gerais do financeiro.
  return serviceTotal(service) - Number(service.providerPaid || 0);
}

function getClient(id) {
  return state.clients.find((client) => String(client.id) === String(id));
}

function visibleClients() {
  if (!currentUser) return state.clients;
  if (currentUser?.role !== "admin") {
    const allowed = new Set((currentUser.allowedClients || []).map(String));
    return state.clients.filter((client) => allowed.has(String(client.id)));
  }
  return state.clients;
}

function visibleServices() {
  const allowed = new Set(visibleClients().map((client) => String(client.id)));
  return state.services.filter((service) => allowed.has(String(service.clientId)));
}

function selectedFilterValue(id) {
  const value = byId("globalCompanyFilter")?.value;
  if (currentUser?.role !== "admin") return String(value || currentUser?.clientId || currentUser?.allowedClients?.[0] || "all");
  return value || "all";
}

function filterByCompany(items, selectId, key = "clientId") {
  const value = selectedFilterValue(selectId);
  return value === "all" ? items : items.filter((item) => String(item[key]) === String(value));
}

function monthlyServices() {
  return visibleServices().filter((service) => service.date?.startsWith("2026-05"));
}

function monthlyExpenses() {
  return (state.financeExpenses || []).filter((expense) => expense.dueDate?.startsWith("2026-05"));
}

function upcomingExpenses() {
  return (state.financeExpenses || [])
    .filter((expense) => expense.status !== "Pago" && expense.dueDate >= today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);
}

function activeServices() {
  return visibleServices().filter((service) => service.status === "Em andamento" || service.status === "Agendado");
}

function metric(label, value, sub = "") {
  const visibleValue = hideValues && String(value).includes("R$") ? "????" : value;
  return `<article class="metric"><span>${label}</span><strong>${visibleValue}</strong><small>${sub}</small></article>`;
}

function renderDashboard() {
  const scoped = filterByCompany(visibleServices(), "globalCompanyFilter");
  const todayServices = scoped.filter((service) => service.date === today);
  const pending = scoped.filter((service) => service.date < today && service.status !== "Finalizado" && service.status !== "Cancelado");
  const monthServices = scoped.filter((service) => service.date?.startsWith("2026-05"));
  const revenue = monthServices.reduce((sum, service) => sum + serviceTotal(service), 0);
  const expenses = monthlyExpenses().reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const profit = revenue - expenses;
  const available = state.providers.filter((provider) => provider.availability === "Disponível").length;
  byId("metrics").innerHTML = [
    metric("Agendamentos hoje", todayServices.length, "somente o dia atual"),
    metric("Pendências passadas", pending.length, "em aberto antes de hoje"),
    metric("Faturamento mes", money(revenue), "maio/2026"),
    metric("Lucro mes", money(profit), "receita - despesas")
  ].join("");

  byId("todayAvailability").textContent = `${available} prestadores disponíveis`;
  byId("dailySchedule").innerHTML = renderDashboardSchedule(todayServices);
  const dueExpenses = upcomingExpenses();
  const expenseAlerts = dueExpenses.map((expense) => `<div class="item"><div class="item-head"><strong>${expense.category}</strong><span class="status warn">${formatDate(expense.dueDate)}</span></div><span>${expense.type} · ${money(expense.amount)}</span></div>`).join("");
  byId("upcomingServices").innerHTML = `${pending.length ? pending.map(serviceCard).join("") : `<div class="item">Nenhuma pendência passada.</div>`}${expenseAlerts}`;
}

function renderDashboardSchedule(items) {
  return table(["Cliente", "Serviço", "Prestador", "Status", "Editar cliente"], items.map((service) => [
    clientName(service.clientId),
    `${service.serviceType}<br><span class="muted">${service.installationType}</span>`,
    providerName(service.providerId),
    statusSelect(service),
    clientSelect(service)
  ]));
}

function statusSelect(service) {
  return `<select data-dashboard-status="${service.id}">${["Agendado", "Em andamento", "Finalizado", "Cancelado"].map((status) => `<option value="${status}" ${service.status === status ? "selected" : ""}>${status}</option>`).join("")}</select>`;
}

function clientSelect(service) {
  return `<select data-dashboard-client="${service.id}">${visibleClients().map((client) => `<option value="${client.id}" ${String(client.id) === String(service.clientId) ? "selected" : ""}>${client.company}</option>`).join("")}</select>`;
}

function serviceCard(service) {
  return `<article class="item">
    <div class="item-head"><strong>${clientName(service.clientId)}</strong>${statusTag(service.status)}</div>
    <span class="muted">${service.serviceType} · ${service.installationType} · ${formatDate(service.date)} ${service.time || ""}</span>
    <span class="muted">${service.vehiclePlate || "Sem placa"} · ${service.vehicleModel || "Sem modelo"} · ${service.regionState}</span>
    <span>${providerName(service.providerId)}</span>
  </article>`;
}

function availabilityTag(value) {
  const cls = value === "Disponível" ? "good" : value === "Agenda cheia" ? "warn" : "";
  return `<span class="status ${cls}">${value}</span>`;
}

function statusTag(value) {
  const cls = value === "Finalizado" || value === "Pago" ? "good" : value === "Cancelado" || value === "Atrasado" ? "bad" : value === "Agendado" || value === "Pendente" ? "warn" : "";
  return `<span class="status ${cls}">${value}</span>`;
}

function renderClients() {
  const items = filterByCompany(visibleClients(), "globalCompanyFilter", "id").filter((client) => matchesText(client.company, client.responsible, client.status, client.address));
  byId("clientCount").textContent = `${items.length} clientes`;
  byId("clientsList").innerHTML = table(["Empresa", "Responsável", "Status", "Frota", "Instalados", "Pendente", "Contato", ""], items.map((client) => [
    `<strong>${client.company}</strong><br><span class="muted">${client.cnpj}</span>`,
    client.responsible,
    client.status,
    client.fleet,
    client.installedModules || 0,
    Math.max(0, Number(client.fleet || 0) - Number(client.installedModules || 0)),
    `${client.phone}<br><span class="muted">${client.email}</span>`,
    actions("client", client.id)
  ]));
}

function renderAccesses() {
  const accessSection = byId("access");
  if (!accessSection) return;
  accessSection.classList.toggle("admin-only-hidden", currentUser?.role !== "admin");
  if (currentUser?.role !== "admin") return;

  byId("accessCompanyChecks").innerHTML = state.clients.map((client) => `
    <label class="inline-check">
      <input type="checkbox" name="clients" value="${client.id}">
      <span>${client.company}</span>
    </label>
  `).join("");
  byId("accessViewChecks").innerHTML = menu.map(([id, label]) => `
    <label class="inline-check">
      <input type="checkbox" name="views" value="${id}">
      <span>${label}</span>
    </label>
  `).join("");

  byId("accessList").innerHTML = table(["Nome", "E-mail", "Perfil", "Status", "Empresas", "Abas", ""], state.accesses.map((access) => [
    access.name,
    access.email,
    roleLabels[access.role] || access.role,
    access.active === false ? statusTag("Cancelado") : statusTag("Finalizado"),
    access.clients.includes("all") ? "Todas" : access.clients.map(clientName).join(", "),
    access.views?.includes("all") ? "Todas" : (access.views || []).map(viewName).join(", "),
    `<div class="row-actions"><button class="mini" type="button" onclick="editAccess('${access.id}')">Editar</button><button class="mini delete" type="button" onclick="toggleAccess('${access.id}')">${access.active === false ? "Reativar" : "Inativar"}</button></div>`
  ]));
  if (!byId("accessForm").elements.id.value) renderAccessRoleDefaults();
}

async function saveAccess(event) {
  event.preventDefault();
  const form = byId("accessForm");
  const data = Object.fromEntries(new FormData(form).entries());
  data.email = normalizeEmail(data.email);
  const checkedClients = [...form.querySelectorAll('input[name="clients"]:checked')].map((input) => input.value);
  const checkedViews = [...form.querySelectorAll('input[name="views"]:checked')].map((input) => input.value);
  if (!isValidEmail(data.email)) {
    toast("Informe um e-mail valido para o acesso.");
    return;
  }
  const clients = data.role === "admin" ? ["all"] : checkedClients;
  const views = data.role === "admin" ? ["all"] : checkedViews;
  if (data.role !== "admin" && clients.length === 0) {
    toast("Selecione ao menos uma empresa para este acesso.");
    return;
  }
  if (data.role !== "admin" && views.length === 0) {
    toast("Selecione ao menos uma aba para este acesso.");
    return;
  }
  if (!data.id && !data.password) {
    toast("Informe uma senha para novo acesso.");
    return;
  }
  const duplicate = state.accesses.some((item) => normalizeEmail(item.email) === data.email && String(item.id) !== String(data.id || ""));
  if (duplicate) {
    toast("Já existe um acesso com este e-mail.");
    return;
  }
  const currentAccess = state.accesses.find((item) => String(item.id) === String(data.id));
  const payload = { id: data.id || "", name: data.name, email: data.email, password: data.password, role: data.role, clients, views, active: currentAccess?.active !== false };

  if (remoteEnabled) {
    const response = await fetch("/api/accesses", {
      method: "POST",
      headers: apiHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast(result.error || "Nao foi possivel salvar o acesso.");
      return;
    }
    state.accesses = await fetchAccesses();
    form.reset();
    renderAll();
    toast("Acesso salvo no Supabase.");
    return;
  }

  payload.id = payload.id || uid(state.accesses);
  const index = state.accesses.findIndex((item) => String(item.id) === String(payload.id));
  if (!payload.password && index >= 0) payload.password = state.accesses[index].password;
  if (index >= 0) state.accesses[index] = payload;
  else state.accesses.push(payload);
  localStorage.setItem("sarter-accesses", JSON.stringify(state.accesses));
  saveState();
  form.reset();
  renderAll();
  toast("Acesso salvo.");
}

window.editAccess = function(id) {
  const access = state.accesses.find((item) => String(item.id) === String(id));
  if (!access) return;
  const form = byId("accessForm");
  form.elements.id.value = access.id;
  form.elements.name.value = access.name;
  form.elements.email.value = access.email;
  form.elements.password.value = "";
  form.elements.role.value = access.role;
  renderAccesses();
  form.querySelectorAll('input[name="clients"]').forEach((input) => {
    input.checked = access.clients.includes("all") || access.clients.map(String).includes(input.value);
  });
  form.querySelectorAll('input[name="views"]').forEach((input) => {
    input.checked = access.views?.includes("all") || (access.views || []).includes(input.value);
  });
};

window.toggleAccess = async function(id) {
  const access = state.accesses.find((item) => String(item.id) === String(id));
  if (!access) return;
  const payload = { ...access, active: access.active === false };
  if (remoteEnabled) {
    const response = await fetch("/api/accesses", {
      method: "POST",
      headers: apiHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast(result.error || "Nao foi possivel alterar o acesso.");
      return;
    }
    state.accesses = await fetchAccesses();
  } else {
    access.active = payload.active;
    localStorage.setItem("sarter-accesses", JSON.stringify(state.accesses));
    saveState();
  }
  renderAll();
  toast(payload.active ? "Acesso reativado." : "Acesso inativado.");
};

async function fetchAccesses() {
  const response = await fetch("/api/accesses", { headers: apiHeaders({ "Accept": "application/json" }) });
  if (!response.ok) return state.accesses || [];
  return response.json();
}

function renderProviders() {
  const items = state.providers.filter((provider) => (providerFilter === "Todos" || provider.type === providerFilter) && matchesText(provider.name, provider.region, provider.city, provider.type));
  byId("providersList").innerHTML = table(["Nome", "Local", "Tipo", "Disponibilidade", "Contato", ""], items.map((provider) => [
    `<strong>${provider.name}</strong><br><span class="muted">${provider.agenda}</span>`,
    `${provider.city}/${provider.state}<br><span class="muted">${provider.region}</span>`,
    provider.type,
    availabilityTag(provider.availability),
    provider.contact,
    actions("provider", provider.id)
  ]));
}

function renderServices() {
  const items = filterByCompany(visibleServices(), "globalCompanyFilter").filter((service) => (serviceFilter === "Todos" || service.serviceType === serviceFilter) && matchesText(clientName(service.clientId), providerName(service.providerId), service.regionState, service.status, service.vehiclePlate, service.vehicleModel));
  byId("servicesList").innerHTML = table(["Cliente", "Prestador", "Quando", "Veículo", "Tipo", "Custos", "Resultado", "Status", ""], items.map((service) => [
    clientName(service.clientId),
    providerName(service.providerId),
    `${formatDate(service.date)}<br><span class="muted">${service.time || "Sem horário"}</span>`,
    `${service.vehiclePlate || "Sem placa"}<br><span class="muted">${service.vehicleModel || "Sem modelo"}</span>`,
    `${service.serviceType}<br><span class="muted">${service.installationType}</span>`,
    costDetails(service),
    `<strong>${money(serviceTotal(service))}</strong><br><span class="profit-highlight">Lucro ${money(serviceProfit(service))}</span>`,
    statusTag(service.status),
    actions("service", service.id)
  ]));
}

function costDetails(service) {
  return `KM ${service.km} x ${money(service.kmValue)}<br>Pedágio ${money(service.toll)}<br>Prestador ${money(service.providerPaid)}<br><span class="muted">${service.regionState}</span>`;
}

function renderFinance() {
  const services = filterByCompany(monthlyServices(), "globalCompanyFilter");
  const revenue = services.reduce((sum, service) => sum + serviceTotal(service), 0);
  const paid = services.reduce((sum, service) => sum + Number(service.providerPaid || 0), 0);
  const expenses = monthlyExpenses();
  const expenseTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const profit = revenue - expenseTotal;
  byId("financeCards").innerHTML = [
    metric("Receita mensal", money(revenue), "agendamentos"),
    metric("Pago aos prestadores", money(paid), "repasse dos atendimentos"),
    metric("Despesas do mês", money(expenseTotal), "fixas + variáveis"),
    metric("Lucro mensal", money(profit), "receita - despesa")
  ].join("");
  renderBars("clientTotals", groupTotals(services, "clientId", serviceTotal, clientName));
  renderBars("expenseTotals", groupTotals(state.financeExpenses || [], "type", (expense) => Number(expense.amount || 0)));
  const expenseItems = (state.financeExpenses || []).filter((expense) => matchesText(expense.type, expense.category, expense.status, expense.notes));
  byId("expenseCount").textContent = `${expenseItems.length} despesas`;
  byId("expensesList").innerHTML = table(["Tipo", "Categoria", "Valor", "Vencimento", "Status", "Observação", ""], expenseItems.map((expense) => [
    expense.type,
    expense.category,
    money(expense.amount),
    formatDate(expense.dueDate),
    statusTag(expense.status),
    expense.notes || "",
    actions("expense", expense.id)
  ]));
  const contracts = filterByCompany(visibleClients().filter((client) => client.status === "Contrato fechado"), "globalCompanyFilter", "id");
  byId("contractProfit").innerHTML = table(["Contrato", "Serviços", "Faturado", "Lucro"], contracts.map((client) => {
    const rows = services.filter((service) => String(service.clientId) === String(client.id));
    return [client.company, rows.length, money(rows.reduce((sum, row) => sum + serviceTotal(row), 0)), money(rows.reduce((sum, row) => sum + serviceProfit(row), 0))];
  }));
}

function renderReports() {
  const reportType = byId("reportServiceFilter")?.value || "Todos";
  const services = filterByCompany(monthlyServices(), "globalCompanyFilter").filter((service) => reportType === "Todos" || (reportType === "install" && service.serviceType.startsWith("Instala")) || (reportType === "maintenance" && service.serviceType.startsWith("Manuten")) || (reportType === "withdrawal" && service.serviceType === "Retirada"));
  const installs = services.filter((service) => service.serviceType === "Instalação").length;
  const maint = services.filter((service) => service.serviceType === "Manutenção").length;
  const withdrawals = services.filter((service) => service.serviceType === "Retirada").length;
  const revenue = services.reduce((sum, service) => sum + serviceTotal(service), 0);
  const paid = services.reduce((sum, service) => sum + Number(service.providerPaid || 0), 0);
  const expenses = monthlyExpenses().reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const profit = revenue - expenses;
  const activeClients = filterByCompany(visibleClients(), "globalCompanyFilter", "id").filter((client) => client.status !== "POC").length;
  const converted = state.convertedPocs.filter((item) => item.date?.startsWith("2026-05")).length;
  byId("reportSummary").innerHTML = [
    metric("Instalações", installs, "maio/2026"),
    metric("Manutenções", maint, "maio/2026"),
    metric("Retiradas", withdrawals, "maio/2026"),
    metric("Total faturado", money(revenue), "valor total"),
    metric("Total pago aos prestadores", money(paid), "repasse"),
    metric("Despesas", money(expenses), "fixas + variáveis"),
    metric("Lucro líquido", money(profit), "receita - despesas"),
    metric("Clientes ativos", activeClients, "ativos + contratos"),
    metric("POCs convertidos", converted, "contratos fechados")
  ].join("");
  byId("reportTable").innerHTML = table(["Data", "Cliente", "Serviço", "Prestador", "Faturado", "Pago", "Lucro"], services.map((service) => [
    formatDate(service.date), clientName(service.clientId), service.serviceType, providerName(service.providerId), money(serviceTotal(service)), money(service.providerPaid), money(serviceProfit(service))
  ]));
}

function renderPoc() {
  const allowedPocs = state.pocs.filter((poc) => filterByCompany(visibleClients(), "globalCompanyFilter", "id").some((client) => String(client.id) === String(poc.clientId)));
  byId("pocList").innerHTML = allowedPocs.map((poc) => {
    const client = state.clients.find((item) => String(item.id) === String(poc.clientId));
    const services = visibleServices().filter((service) => String(service.clientId) === String(poc.clientId));
    return `<article class="poc-card ${selectedPocId === poc.id ? "selected" : ""}" data-poc-id="${poc.id}">
      <div class="item-head"><strong>${client?.company || "Cliente"}</strong><span class="pill">${poc.modules} módulos</span></div>
      <span class="muted">${formatDate(poc.start)} até ${formatDate(poc.end)}</span>
      <span>Visitas/manutenções: ${services.length}</span>
      <div>${poc.visits.map((visit) => `<span class="event">${visit}</span>`).join("")}</div>
    </article>`;
  }).join("");
  document.querySelectorAll("[data-poc-id]").forEach((card) => card.addEventListener("click", () => {
    selectedPocId = Number(card.dataset.pocId);
    renderPoc();
  }));
}

function renderCalendars() {
  const dashboardCalendar = byId("calendar");
  if (dashboardCalendar) renderCalendar(dashboardCalendar, true);
  renderCalendarAvailability();
  renderCalendar(byId("dragCalendar"), false, true);
}

function renderCalendar(container, weekOnly = false, draggable = false) {
  const days = weekOnly ? [12, 13, 14, 15, 16, 17, 18] : Array.from({ length: 31 }, (_, index) => index + 1);
  container.innerHTML = days.map((day) => {
    const date = `2026-05-${String(day).padStart(2, "0")}`;
    const events = filterByCompany(visibleServices(), "globalCompanyFilter").filter((service) => service.date === date);
    return `<div class="day" data-date="${date}">
      <strong>${day}/05</strong>
      ${events.map((service) => `<span class="event ${service.serviceType === "Manutenção" ? "maintenance" : ""}" ${draggable ? `draggable="true" data-service-id="${service.id}"` : ""}>${service.serviceType}: ${clientName(service.clientId)}</span>`).join("")}
    </div>`;
  }).join("");
  if (draggable) bindDragCalendar();
}

function renderCalendarAvailability() {
  const container = byId("calendarAvailability");
  if (!container) return;
  const clientId = selectedFilterValue("globalCompanyFilter");
  const label = clientId === "all" ? "Agenda geral" : clientName(clientId);
  const busyDates = filterByCompany(visibleServices(), "globalCompanyFilter")
    .filter((service) => service.status !== "Cancelado")
    .map((service) => service.date);
  container.innerHTML = `
    <div class="availability-card"><strong>${label}</strong><span>${busyDates.length} datas ocupadas</span></div>
    <div class="availability-card"><strong>Prestadores disponíveis</strong><span>${state.providers.filter((provider) => provider.availability === "Disponível").length}</span></div>
  `;
}

function renderStock() {
  const moves = filterByCompany(state.stockMovements.filter((move) => visibleClients().some((client) => String(client.id) === String(move.clientId))), "globalCompanyFilter");
  byId("stockAvailable").textContent = `${stockAvailable(moves)} disponíveis`;
  byId("stockList").innerHTML = table(["Data", "Empresa", "Região", "Tipo", "Qtd.", "Responsável", "Observação"], moves.map((move) => [
    formatDate(move.date), clientName(move.clientId), move.region, move.type, move.quantity, move.responsible, move.notes
  ]));
}

async function saveClient(event) {
  event.preventDefault();
  if (await tryRemoteSave("/api/clients", formPayload("clientForm"))) {
    byId("clientForm").reset();
    await hydrateRemoteState();
    renderAll();
    toast("Cliente salvo no banco online.");
    return;
  }
  upsertFromForm("clientForm", "clients", ["fleet", "installedModules"]);
  fillSelects();
  renderAll();
  toast("Cliente salvo.");
}

async function saveProvider(event) {
  event.preventDefault();
  if (await tryRemoteSave("/api/providers", formPayload("providerForm"))) {
    byId("providerForm").reset();
    await hydrateRemoteState();
    renderAll();
    toast("Prestador salvo no banco online.");
    return;
  }
  upsertFromForm("providerForm", "providers");
  fillSelects();
  renderAll();
  toast("Prestador salvo.");
}

async function saveService(event) {
  event.preventDefault();
  if (hasScheduleConflict(formPayload("serviceForm"))) return;
  if (await tryRemoteSave("/api/services", formPayload("serviceForm"))) {
    event.target.reset();
    await hydrateRemoteState();
    renderAll();
    updateServicePreview();
    toast("Serviço salvo no banco online.");
    return;
  }
  upsertFromForm("serviceForm", "services", ["clientId", "providerId", "km", "kmValue", "toll", "installValue", "providerPaid"]);
  fillSelects();
  renderAll();
  event.target.reset();
  updateServicePreview();
  toast("Serviço salvo com cálculo financeiro atualizado.");
}

async function saveExpense(event) {
  event.preventDefault();
  if (await tryRemoteSave("/api/finance-expenses", formPayload("expenseForm"))) {
    event.target.reset();
    await hydrateRemoteState();
    renderAll();
    toast("Despesa salva no banco online.");
    return;
  }
  upsertFromForm("expenseForm", "financeExpenses", ["amount"]);
  renderAll();
  toast("Despesa salva no financeiro.");
}

async function saveStockMovement(event) {
  event.preventDefault();
  if (await tryRemoteSave("/api/stock-movements", formPayload("stockForm"))) {
    event.target.reset();
    await hydrateRemoteState();
    renderAll();
    toast("Movimentação salva no banco online.");
    return;
  }
  const data = Object.fromEntries(new FormData(event.target).entries());
  state.stockMovements.push({ id: uid(state.stockMovements), date: today, ...data, quantity: Number(data.quantity) });
  saveState();
  event.target.reset();
  renderAll();
  toast("Movimentação registrada.");
}

async function saveCalendarQuickService(event) {
  event.preventDefault();
  const payload = {
    ...formPayload("calendarQuickForm"),
    regionState: getClient(formPayload("calendarQuickForm").clientId)?.address?.split(",").pop()?.trim() || "MG",
    time: "",
    vehiclePlate: "",
    vehicleModel: "",
    installationType: "A definir",
    km: 0,
    kmValue: 0,
    toll: 0,
    installValue: 0,
    providerPaid: 0,
    notes: "Criado pelo calendário",
    status: "Agendado"
  };
  if (hasScheduleConflict(payload)) return;
  state.services.push({ ...payload, id: uid(state.services) });
  saveState();
  event.target.reset();
  renderAll();
  toast("Agendamento criado.");
}

function hasScheduleConflict(payload) {
  const conflict = state.services.find((service) => service.date === payload.date && service.status !== "Cancelado" && String(service.id) !== String(payload.id || ""));
  if (!conflict) return false;
  toast(`Horário indisponível: ${clientName(conflict.clientId)} já está agendada nesta data.`);
  return true;
}

function handleDashboardQuickEdit(event) {
  const statusSelectNode = event.target.closest("[data-dashboard-status]");
  const clientSelectNode = event.target.closest("[data-dashboard-client]");
  const serviceId = statusSelectNode?.dataset.dashboardStatus || clientSelectNode?.dataset.dashboardClient;
  if (!serviceId) return;
  const service = state.services.find((item) => String(item.id) === String(serviceId));
  if (!service) return;
  if (statusSelectNode) service.status = statusSelectNode.value;
  if (clientSelectNode) service.clientId = clientSelectNode.value;
  saveState();
  renderAll();
  toast("Agendamento atualizado.");
}

function formPayload(formId) {
  const data = Object.fromEntries(new FormData(byId(formId)).entries());
  if (data.email) data.email = normalizeEmail(data.email);
  return data;
}

async function tryRemoteSave(url, payload) {
  if (!remoteEnabled) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: apiHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    toast(data.error || "Nao foi possivel salvar no banco online.");
    return true;
  }

  return true;
}

function upsertFromForm(formId, collection, numericFields = []) {
  const form = byId(formId);
  const data = Object.fromEntries(new FormData(form).entries());
  if (data.email) data.email = normalizeEmail(data.email);
  form.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    data[input.name] = input.checked;
  });
  numericFields.forEach((field) => data[field] = Number(data[field]) || 0);
  if (data.id) {
    const index = state[collection].findIndex((item) => String(item.id) === String(data.id));
    state[collection][index] = { ...state[collection][index], ...data, id: data.id };
  } else {
    state[collection].push({ ...data, id: uid(state[collection]) });
  }
  saveState();
  form.reset();
}

function actions(type, id) {
  return `<div class="row-actions"><button class="mini" type="button" onclick="editItem('${type}', '${id}')">Editar</button><button class="mini delete" type="button" onclick="deleteItem('${type}', '${id}')">Excluir</button></div>`;
}

window.editItem = function(type, id) {
  const map = { client: ["clients", "clientForm"], provider: ["providers", "providerForm"], service: ["services", "serviceForm"], expense: ["financeExpenses", "expenseForm"] };
  const [collection, formId] = map[type];
  const item = state[collection].find((row) => String(row.id) === String(id));
  const form = byId(formId);
  Object.entries(item).forEach(([key, value]) => {
    if (!form.elements[key]) return;
    if (form.elements[key].type === "checkbox") form.elements[key].checked = Boolean(value);
    else form.elements[key].value = value;
  });
  updateServicePreview();
  toast("Registro carregado para edição.");
};

window.deleteItem = function(type, id) {
  if (!confirm("Excluir este registro?")) return;
  const map = { client: "clients", provider: "providers", service: "services", expense: "financeExpenses" };
  state[map[type]] = state[map[type]].filter((item) => String(item.id) !== String(id));
  saveState();
  renderAll();
  toast("Registro excluído.");
};

function updateServicePreview() {
  const data = Object.fromEntries(new FormData(byId("serviceForm")).entries());
  const total = serviceTotal(data);
  byId("serviceTotalPreview").textContent = money(total);
  byId("serviceProfitPreview").textContent = money(serviceProfit(data));
}

function fillSelects() {
  const clientOptions = visibleClients().map((client) => `<option value="${client.id}">${client.company}</option>`).join("");
  const allClientOptions = `${currentUser?.role === "admin" ? `<option value="all">Todas</option>` : ""}${visibleClients().map((client) => `<option value="${client.id}">${client.company}</option>`).join("")}`;
  const providerOptions = state.providers.map((provider) => `<option value="${provider.id}">${provider.name}</option>`).join("");
  document.querySelectorAll('[name="clientId"]').forEach((select) => select.innerHTML = clientOptions);
  document.querySelectorAll('[name="providerId"]').forEach((select) => select.innerHTML = providerOptions);
  ["globalCompanyFilter"].forEach((id) => {
    const node = byId(id);
    if (node) {
      const current = node.value;
      node.innerHTML = allClientOptions;
      if ([...node.options].some((option) => option.value === current)) node.value = current;
    }
  });
}

function convertPoc() {
  if (!selectedPocId) {
    toast("Selecione um POC primeiro.");
    return;
  }
  const poc = state.pocs.find((item) => item.id === selectedPocId);
  const client = state.clients.find((item) => String(item.id) === String(poc.clientId));
  client.status = "Contrato fechado";
  client.installedModules = Number(client.installedModules || 0) + Number(poc.modules || 0);
  client.notes = `${client.notes || ""}\nPOC convertido em ${formatDate(today)} com ${poc.modules} módulos já instalados.`.trim();
  state.convertedPocs.push({ id: uid(state.convertedPocs), client: client.company, date: today, modules: poc.modules });
  state.pocs = state.pocs.filter((item) => item.id !== selectedPocId);
  selectedPocId = null;
  saveState();
  renderAll();
  toast("POC convertido em contrato fechado.");
}

function bindDragCalendar() {
  document.querySelectorAll(".drag .event").forEach((event) => {
    event.addEventListener("dragstart", (drag) => drag.dataTransfer.setData("text/plain", event.dataset.serviceId));
  });
  document.querySelectorAll(".drag .day").forEach((day) => {
    day.addEventListener("dragover", (drag) => { drag.preventDefault(); day.classList.add("over"); });
    day.addEventListener("dragleave", () => day.classList.remove("over"));
    day.addEventListener("drop", (drop) => {
      drop.preventDefault();
      day.classList.remove("over");
      const service = state.services.find((item) => Number(item.id) === Number(drop.dataTransfer.getData("text/plain")));
      service.date = day.dataset.date;
      saveState();
      renderAll();
      toast("Serviço reagendado.");
    });
  });
}

function stockByRegion(movements = state.stockMovements) {
  return movements.reduce((acc, move) => {
    const sign = move.type === "Entrada" ? 1 : -1;
    acc[move.region] = (acc[move.region] || 0) + sign * Number(move.quantity);
    return acc;
  }, {});
}

function stockAvailable(movements = state.stockMovements) {
  return Object.values(stockByRegion(movements)).reduce((sum, amount) => sum + amount, 0);
}

function groupTotals(items, key, calc, labelFn = (value) => value) {
  return items.reduce((acc, item) => {
    const label = labelFn(item[key]);
    acc[label] = (acc[label] || 0) + calc(item);
    return acc;
  }, {});
}

function renderBars(id, totals) {
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...entries.map((entry) => entry[1]));
  byId(id).innerHTML = entries.map(([label, value]) => `<div class="bar">
    <div class="bar-label"><strong>${label}</strong><span>${money(value)}</span></div>
    <div class="bar-track"><div class="bar-fill" style="width:${Math.max(5, value / max * 100)}%"></div></div>
  </div>`).join("");
}

function table(headers, rows) {
  if (!rows.length) return `<div class="item">Nenhum registro encontrado.</div>`;
  return `<table><thead><tr>${headers.map((head) => `<th>${head}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function formatDate(date) {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function exportExcel() {
  const reportType = byId("reportServiceFilter")?.value || "Todos";
  const services = filterByCompany(monthlyServices(), "globalCompanyFilter").filter((service) => reportType === "Todos" || (reportType === "install" && service.serviceType.startsWith("Instala")) || (reportType === "maintenance" && service.serviceType.startsWith("Manuten")) || (reportType === "withdrawal" && service.serviceType === "Retirada"));
  const rows = [
    ["Data", "Cliente", "Serviço", "Região", "Prestador", "Valor total", "Pago prestador", "Lucro", "Status"],
    ...services.map((service) => [formatDate(service.date), clientName(service.clientId), service.serviceType, service.regionState, providerName(service.providerId), serviceTotal(service), service.providerPaid, serviceProfit(service), service.status])
  ];
  const html = `<table>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</table>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "fechamento-modulos-veiculares-maio-2026.xls";
  link.click();
  URL.revokeObjectURL(link.href);
  toast("Arquivo Excel gerado.");
}

function toast(message) {
  const node = byId("toast");
  node.textContent = message;
  node.classList.add("show");
  setTimeout(() => node.classList.remove("show"), 2600);
}
