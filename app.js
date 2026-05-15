const STORAGE_KEY = "sarter-service-provider-v2";
const LEGACY_STORAGE_KEY = "instalacoes-sarter-v1";

const menu = [
  ["dashboard", "Dashboard", "▦"],
  ["clients", "Clientes", "□"],
  ["providers", "Prestadores", "◇"],
  ["services", "Agendamentos", "▤"],
  ["finance", "Financeiro", "$"],
  ["reports", "Fechamento", "⇩"],
  ["poc", "POC", "◌"],
  ["calendarView", "Calendário", "◷"],
  ["stock", "Estoque", "▣"],
  ["access", "Acessos", "◎"]
];

const demo = {
  clients: [
    { id: 1, company: "Transvale Logística", responsible: "Marina Rocha", phone: "(31) 98810-4420", email: "marina@transvale.com.br", cnpj: "12.345.678/0001-90", address: "Contagem, MG", status: "Contrato fechado", fleet: 86, notes: "Contrato nacional em fase de expansão." },
    { id: 2, company: "Frota Minas Alimentos", responsible: "Rafael Dias", phone: "(31) 99722-8810", email: "rafael@frotaminas.com.br", cnpj: "31.554.010/0001-12", address: "Betim, MG", status: "Cliente ativo", fleet: 42, notes: "Prioridade para manutenção preventiva." },
    { id: 3, company: "Expresso Centro-Oeste", responsible: "Camila Torres", phone: "(62) 99180-1100", email: "camila@ecoeste.com.br", cnpj: "08.117.222/0001-40", address: "Goiânia, GO", status: "POC", fleet: 24, notes: "POC com 8 módulos plug and play." },
    { id: 4, company: "Rota Sul Distribuição", responsible: "Henrique Prado", phone: "(51) 98822-4415", email: "henrique@rotasul.com.br", cnpj: "45.070.889/0001-55", address: "Porto Alegre, RS", status: "POC", fleet: 18, notes: "Teste com Izzycan em veículos leves." }
  ],
  providers: [
    { id: 1, name: "Equipe BH Norte", region: "Belo Horizonte", state: "MG", city: "Belo Horizonte", type: "Equipe própria", availability: "Disponível", contact: "(31) 99910-2010", agenda: "Seg-Sex 08:00-18:00" },
    { id: 2, name: "TecCar Contagem", region: "Metropolitana BH", state: "MG", city: "Contagem", type: "Terceirizado", availability: "Disponível", contact: "(31) 98831-9022", agenda: "Seg-Sáb 07:30-17:00" },
    { id: 3, name: "SulTrack Serviços", region: "Sul", state: "RS", city: "Porto Alegre", type: "Terceirizado", availability: "Agenda cheia", contact: "(51) 99610-7720", agenda: "Ter-Sáb 08:00-18:00" },
    { id: 4, name: "Equipe Centro-Oeste", region: "Centro-Oeste", state: "GO", city: "Goiânia", type: "Equipe própria", availability: "Em deslocamento", contact: "(62) 99120-4210", agenda: "Seg-Sex 09:00-18:00" }
  ],
  services: [
    { id: 1, clientId: 1, providerId: 1, regionState: "Contagem, MG", date: "2026-05-13", time: "09:00", vehiclePlate: "RTV4A86", vehicleModel: "Sprinter", serviceType: "Instalação", installationType: "Plug and Play", km: 34, kmValue: 2.4, toll: 0, installValue: 680, providerPaid: 180, notes: "Instalar 4 módulos em vans.", status: "Em andamento" },
    { id: 2, clientId: 2, providerId: 2, regionState: "Betim, MG", date: "2026-05-14", time: "14:00", vehiclePlate: "FMG2B42", vehicleModel: "Fiorino", serviceType: "Manutenção", installationType: "Izzycan", km: 58, kmValue: 2.4, toll: 18, installValue: 420, providerPaid: 145, notes: "Revisar falha de leitura CAN.", status: "Agendado" },
    { id: 3, clientId: 3, providerId: 4, regionState: "Goiânia, GO", date: "2026-05-15", time: "10:30", vehiclePlate: "ECO8C24", vehicleModel: "HR", serviceType: "Instalação", installationType: "Plug and Play", km: 22, kmValue: 2.2, toll: 0, installValue: 920, providerPaid: 190, notes: "POC inicial com 8 módulos.", status: "Em andamento" },
    { id: 4, clientId: 4, providerId: 3, regionState: "Porto Alegre, RS", date: "2026-05-18", time: "08:30", vehiclePlate: "ROT1S18", vehicleModel: "Master", serviceType: "Retirada", installationType: "Híbrido OBD + chicote", km: 41, kmValue: 2.6, toll: 12, installValue: 760, providerPaid: 260, notes: "Validar compatibilidade antes de finalizar.", status: "Agendado" },
    { id: 5, clientId: 1, providerId: 1, regionState: "Contagem, MG", date: "2026-05-10", time: "11:00", vehiclePlate: "TVL0M86", vehicleModel: "Daily", serviceType: "Manutenção", installationType: "Plug and Play", km: 26, kmValue: 2.4, toll: 0, installValue: 360, providerPaid: 120, notes: "Troca de módulo com mau contato.", status: "Finalizado" }
  ],
  financeExpenses: [
    { id: 1, type: "Despesa fixa", category: "Salário colaborador", amount: 2200, dueDate: "2026-05-20", status: "Pendente", notes: "Pagamento mensal" },
    { id: 2, type: "Despesa variável", category: "Gasolina", amount: 320, dueDate: "2026-05-16", status: "Pendente", notes: "Deslocamentos da semana" }
  ],
  accessUsers: [
    { id: 1, name: "Administrador", email: "admin@sarter.local", password: "Sarter@123", role: "Administrador", permissions: ["dashboard", "clients", "providers", "services", "finance", "reports", "poc", "calendarView", "stock", "access"] }
  ],
  pocs: [
    { id: 1, clientId: 3, start: "2026-05-06", end: "2026-06-05", modules: 8, visits: ["Instalação inicial em 15/05", "Checklist remoto pendente"], selected: false },
    { id: 2, clientId: 4, start: "2026-05-09", end: "2026-06-08", modules: 5, visits: ["Visita técnica agendada", "Validação Izzycan"], selected: false }
  ],
  convertedPocs: [
    { id: 1, client: "Cliente piloto convertido", date: "2026-05-03", modules: 6 }
  ],
  stockMovements: [
    { id: 1, date: "2026-05-01", region: "MG", type: "Entrada", quantity: 80, responsible: "Matriz", notes: "Lote maio" },
    { id: 2, date: "2026-05-06", region: "GO", type: "Entregue", quantity: 8, responsible: "Equipe Centro-Oeste", notes: "POC Expresso Centro-Oeste" },
    { id: 3, date: "2026-05-09", region: "RS", type: "Retirado na matriz", quantity: 5, responsible: "SulTrack Serviços", notes: "POC Rota Sul" },
    { id: 4, date: "2026-05-10", region: "MG", type: "Saída", quantity: 4, responsible: "Equipe BH Norte", notes: "Troca em manutenção" }
  ]
};

let state = loadState();
let currentView = "dashboard";
let providerFilter = "Todos";
let serviceFilter = "Todos";
let selectedPocId = null;
let remoteEnabled = false;
let currentUser = null;

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const ADMIN_DEFAULT = { email: "admin@sarter.local", password: "Sarter@123" };
const byId = (id) => document.getElementById(id);
const money = (value) => brl.format(Number(value) || 0);
const uid = (items) => Math.max(0, ...items.map((item) => Number(item.id) || 0)) + 1;
const today = "2026-05-12";

boot();

async function boot() {
  bindEvents();
  await hydrateRemoteState();
  restoreSession();
  updateAuthView();
  renderNav();
  fillSelects();
  renderAll();
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  const data = saved ? JSON.parse(saved) : structuredClone(demo);
  applyStateDefaults(data);
  return data;
}

function applyStateDefaults(data) {
  data.convertedPocs = data.convertedPocs || [];
  data.pocs = data.pocs || [];
  data.stockMovements = data.stockMovements || [];
  data.financeExpenses = data.financeExpenses?.length ? data.financeExpenses : structuredClone(demo.financeExpenses);
  data.accessUsers = data.accessUsers?.length ? data.accessUsers : structuredClone(demo.accessUsers);
  data.services = (data.services || []).map((service) => ({
    time: "",
    vehiclePlate: "",
    vehicleModel: "",
    ...service,
    installationType: service.installationType === "Outro" ? service.customInstallation || "Outro" : service.installationType
  }));
  data.providers = (data.providers || []).map((provider) => {
    const { installValue, maintenanceValue, ...rest } = provider;
    return rest;
  });
}

function saveState() {
  if (remoteEnabled) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

async function hydrateRemoteState() {
  try {
    const response = await fetch("/api/bootstrap", { headers: { "Accept": "application/json" } });
    if (!response.ok) return;

    const payload = await response.json();
    if (!payload.data?.remote) return;

    state = {
      ...state,
      ...payload.data,
      convertedPocs: state.convertedPocs || []
    };
    applyStateDefaults(state);
    remoteEnabled = true;
    toast("Banco online conectado.");
  } catch {
    remoteEnabled = false;
  }
}

function renderNav() {
  byId("nav").innerHTML = allowedMenu().map(([id, label, icon]) => (
    `<button class="${id === currentView ? "active" : ""}" data-view="${id}" type="button"><span>${icon}</span>${label}</button>`
  )).join("");
}

function bindEvents() {
  byId("loginForm").addEventListener("submit", login);
  byId("logout").addEventListener("click", logout);
  byId("nav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    currentView = button.dataset.view;
    document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === currentView));
    byId("pageTitle").textContent = menu.find(([id]) => id === currentView)[1];
    renderNav();
    renderAll();
  });
  byId("globalSearch").addEventListener("input", renderAll);
  byId("calendarMode").addEventListener("change", () => renderCalendars());
  byId("clientForm").addEventListener("submit", saveClient);
  byId("providerForm").addEventListener("submit", saveProvider);
  byId("serviceForm").addEventListener("submit", saveService);
  byId("serviceForm").addEventListener("input", updateServicePreview);
  byId("expenseForm").addEventListener("submit", saveExpense);
  byId("accessForm").addEventListener("submit", saveAccess);
  byId("stockForm").addEventListener("submit", saveStockMovement);
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
  byId("printReport").addEventListener("click", () => { currentView = "reports"; byId("nav").querySelector('[data-view="reports"]').click(); window.print(); });
  byId("reportPrint").addEventListener("click", () => window.print());
  byId("exportExcel").addEventListener("click", exportExcel);
  byId("reportExcel").addEventListener("click", exportExcel);
  byId("resetData").addEventListener("click", () => {
    if (!confirm("Restaurar dados de demonstração e apagar alterações locais?")) return;
    state = structuredClone(demo);
    saveState();
    fillSelects();
    renderAll();
    toast("Dados demo restaurados.");
  });
  byId("convertSelectedPoc").addEventListener("click", convertPoc);
}

function allowedMenu() {
  if (!currentUser) return [];
  const permissions = currentUser.permissions || [];
  return menu.filter(([id]) => permissions.includes(id));
}

function updateAuthView() {
  const signedIn = Boolean(currentUser);
  byId("loginScreen").classList.toggle("hidden", signedIn);
  document.querySelector(".sidebar").classList.toggle("hidden", !signedIn);
  document.querySelector(".app").classList.toggle("hidden", !signedIn);

  if (!signedIn) return;
  if (!allowedMenu().some(([id]) => id === currentView)) {
    currentView = allowedMenu()[0]?.[0] || "dashboard";
  }
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === currentView));
  byId("pageTitle").textContent = menu.find(([id]) => id === currentView)?.[1] || "Dashboard";
}

function restoreSession() {
  const email = normalizeEmail(sessionStorage.getItem("sarter-current-user"));
  currentUser = state.accessUsers.find((user) => normalizeEmail(user.email) === email) || null;
}

function login(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  const email = normalizeEmail(data.email);
  const user = state.accessUsers.find((item) => normalizeEmail(item.email) === email && String(item.password || "") === String(data.password || ""));

  if (!user) {
    toast("E-mail ou senha inválidos.");
    return;
  }

  currentUser = user;
  sessionStorage.setItem("sarter-current-user", normalizeEmail(user.email));
  event.target.reset();
  updateAuthView();
  renderNav();
  renderAll();
  toast("Acesso liberado.");
}

function logout() {
  currentUser = null;
  sessionStorage.removeItem("sarter-current-user");
  updateAuthView();
}

function renderAll() {
  fillSelects();
  renderDashboard();
  renderClients();
  renderProviders();
  renderServices();
  renderFinance();
  renderAccess();
  renderReports();
  renderPoc();
  renderCalendars();
  renderStock();
}

function query() {
  return byId("globalSearch").value.trim().toLowerCase();
}

function matchesText(...values) {
  const q = query();
  return !q || values.join(" ").toLowerCase().includes(q);
}

function clientName(id) {
  return state.clients.find((item) => Number(item.id) === Number(id))?.company || "Cliente removido";
}

function providerName(id) {
  return state.providers.find((item) => Number(item.id) === Number(id))?.name || "Prestador removido";
}

function serviceTotal(service) {
  // Receita do atendimento: deslocamento por KM + valor lançado + pedágio.
  return (Number(service.km) * Number(service.kmValue)) + Number(service.installValue) + Number(service.toll);
}

function serviceProfit(service) {
  // Lucro operacional antes de impostos e despesas fixas.
  return serviceTotal(service) - Number(service.providerPaid);
}

function monthlyServices() {
  return state.services.filter((service) => service.date?.startsWith("2026-05"));
}

function monthlyExpenses() {
  return state.financeExpenses.filter((expense) => expense.dueDate?.startsWith("2026-05"));
}

function upcomingExpenses() {
  return state.financeExpenses
    .filter((expense) => expense.status !== "Pago" && expense.dueDate >= today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);
}

function activeServices() {
  return state.services.filter((service) => service.status === "Em andamento" || service.status === "Agendado");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function permissionLabel(id) {
  return menu.find(([viewId]) => viewId === id)?.[1] || id;
}

function metric(label, value, sub = "") {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${sub}</small></article>`;
}

function renderDashboard() {
  const services = monthlyServices();
  const installing = state.services.filter((service) => service.serviceType === "Instalação" && service.status === "Em andamento").length;
  const maintenance = state.services.filter((service) => service.serviceType === "Manutenção" && service.status !== "Cancelado").length;
  const pocOpen = state.pocs.length;
  const contracts = state.clients.filter((client) => client.status === "Contrato fechado").length;
  const revenue = services.reduce((sum, service) => sum + serviceTotal(service), 0);
  const expenses = monthlyExpenses().reduce((sum, expense) => sum + Number(expense.amount), 0);
  const profit = revenue - expenses;
  const available = state.providers.filter((provider) => provider.availability === "Disponível").length;
  const stock = stockAvailable();
  byId("metrics").innerHTML = [
    metric("Instalações em andamento", installing, "execução operacional"),
    metric("Manutenções", maintenance, "mês atual"),
    metric("Atendimentos POC em andamento", pocOpen, "testes ativos"),
    metric("Contratos fechados", contracts, "base comercial"),
    metric("Faturamento mensal", money(revenue), "maio/2026"),
    metric("Lucro total", money(profit), "receita - despesas"),
    metric("Prestadores disponíveis hoje", available, "equipes prontas"),
    metric("Estoque disponível", stock, "módulos")
  ].join("");

  byId("todayAvailability").textContent = `${available} disponíveis hoje`;
  byId("upcomingServices").innerHTML = activeServices().slice(0, 6).map(serviceCard).join("");
  const due = upcomingExpenses();
  const dueHtml = due.length ? due.map((expense) => `<div class="item"><div class="item-head"><strong>${expense.category}</strong><span class="status warn">${formatDate(expense.dueDate)}</span></div><span>${expense.type} · ${money(expense.amount)}</span></div>`).join("") : "";
  byId("upcomingServices").innerHTML += dueHtml;
  renderBars("regionTotals", groupTotals(state.services, "regionState", serviceTotal));
  byId("providerHighlights").innerHTML = state.providers.map((provider) => `<div class="item"><div class="item-head"><strong>${provider.name}</strong>${availabilityTag(provider.availability)}</div><span class="muted">${provider.city}/${provider.state} · ${provider.type}</span></div>`).join("");
  byId("stockHighlights").innerHTML = Object.entries(stockByRegion()).map(([region, amount]) => `<div class="item"><div class="item-head"><strong>${region}</strong><span class="pill">${amount} módulos</span></div></div>`).join("");
}

function serviceCard(service) {
  return `<article class="item">
    <div class="item-head"><strong>${clientName(service.clientId)}</strong>${statusTag(service.status)}</div>
    <span class="muted">${service.serviceType} · ${service.installationType} · ${formatDate(service.date)} ${service.time || ""}</span>
    <span class="muted">${service.vehiclePlate || "Sem placa"} · ${service.vehicleModel || "Sem modelo"} · ${service.regionState}</span>
    <span>${providerName(service.providerId)} · ${money(serviceTotal(service))} · lucro ${money(serviceProfit(service))}</span>
  </article>`;
}

function availabilityTag(value) {
  const cls = value === "Disponível" ? "good" : value === "Agenda cheia" ? "warn" : "";
  return `<span class="status ${cls}">${value}</span>`;
}

function statusTag(value) {
  const cls = value === "Finalizado" || value === "Pago" ? "good" : value === "Cancelado" ? "bad" : value === "Agendado" || value === "Pendente" ? "warn" : "";
  return `<span class="status ${cls}">${value}</span>`;
}

function renderClients() {
  const items = state.clients.filter((client) => matchesText(client.company, client.responsible, client.status, client.address));
  byId("clientCount").textContent = `${items.length} clientes`;
  byId("clientsList").innerHTML = table(["Empresa", "Responsável", "Status", "Frota", "Contato", ""], items.map((client) => [
    `<strong>${client.company}</strong><br><span class="muted">${client.cnpj}</span>`,
    client.responsible,
    client.status,
    client.fleet,
    `${client.phone}<br><span class="muted">${client.email}</span>`,
    actions("client", client.id)
  ]));
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
  const items = state.services.filter((service) => (serviceFilter === "Todos" || service.serviceType === serviceFilter) && matchesText(clientName(service.clientId), providerName(service.providerId), service.regionState, service.status, service.vehiclePlate, service.vehicleModel));
  byId("servicesList").innerHTML = table(["Cliente", "Prestador", "Quando", "Veículo", "Tipo", "Custos", "Resultado", "Status", ""], items.map((service) => [
    clientName(service.clientId),
    providerName(service.providerId),
    `${formatDate(service.date)}<br><span class="muted">${service.time || "Sem horário"}</span>`,
    `${service.vehiclePlate || "Sem placa"}<br><span class="muted">${service.vehicleModel || "Sem modelo"}</span>`,
    `${service.serviceType}<br><span class="muted">${service.installationType}</span>`,
    `KM ${service.km} x ${money(service.kmValue)}<br>Pedágio ${money(service.toll)}<br>Prestador ${money(service.providerPaid)}<br><span class="muted">${service.regionState}</span>`,
    `<strong>${money(serviceTotal(service))}</strong><br><span class="muted">Lucro ${money(serviceProfit(service))}</span>`,
    statusTag(service.status),
    actions("service", service.id)
  ]));
}

function renderFinance() {
  const services = monthlyServices();
  const revenue = services.reduce((sum, service) => sum + serviceTotal(service), 0);
  const paid = services.reduce((sum, service) => sum + Number(service.providerPaid), 0);
  const expenses = monthlyExpenses();
  const expenseTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const profit = revenue - expenseTotal;
  byId("financeCards").innerHTML = [
    metric("Receita mensal", money(revenue), "agendamentos"),
    metric("Despesas do mês", money(expenseTotal), "fixas + variáveis"),
    metric("Lucro mensal", money(profit), "receita - despesa"),
    metric("Ticket médio", money(revenue / Math.max(1, services.length)), "por serviço")
  ].join("");
  renderBars("clientTotals", groupTotals(state.services, "clientId", serviceTotal, clientName));
  renderBars("expenseTotals", groupTotals(state.financeExpenses, "type", (expense) => Number(expense.amount)));
  const expenseItems = state.financeExpenses.filter((expense) => matchesText(expense.type, expense.category, expense.status, expense.notes));
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
  const contracts = state.clients.filter((client) => client.status === "Contrato fechado");
  byId("contractProfit").innerHTML = table(["Contrato", "Agendamentos", "Faturado", "Lucro"], contracts.map((client) => {
    const rows = state.services.filter((service) => Number(service.clientId) === Number(client.id));
    return [client.company, rows.length, money(rows.reduce((sum, row) => sum + serviceTotal(row), 0)), money(rows.reduce((sum, row) => sum + serviceProfit(row), 0))];
  }));
}

function renderReports() {
  const services = monthlyServices();
  const installs = services.filter((service) => service.serviceType === "Instalação").length;
  const maint = services.filter((service) => service.serviceType === "Manutenção").length;
  const revenue = services.reduce((sum, service) => sum + serviceTotal(service), 0);
  const paid = services.reduce((sum, service) => sum + Number(service.providerPaid), 0);
  const expenses = monthlyExpenses().reduce((sum, expense) => sum + Number(expense.amount), 0);
  const profit = revenue - expenses;
  const activeClients = state.clients.filter((client) => client.status !== "POC").length;
  const converted = state.convertedPocs.filter((item) => item.date?.startsWith("2026-05")).length;
  byId("reportSummary").innerHTML = [
    metric("Instalações", installs, "maio/2026"),
    metric("Manutenções", maint, "maio/2026"),
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
  byId("pocList").innerHTML = state.pocs.map((poc) => {
    const client = state.clients.find((item) => Number(item.id) === Number(poc.clientId));
    const services = state.services.filter((service) => Number(service.clientId) === Number(poc.clientId));
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
  renderCalendar(byId("calendar"), byId("calendarMode").value === "week");
  renderCalendar(byId("dragCalendar"), false, true);
}

function renderCalendar(container, weekOnly = false, draggable = false) {
  const days = weekOnly ? [12, 13, 14, 15, 16, 17, 18] : Array.from({ length: 31 }, (_, index) => index + 1);
  container.innerHTML = days.map((day) => {
    const date = `2026-05-${String(day).padStart(2, "0")}`;
    const events = state.services.filter((service) => service.date === date);
    return `<div class="day" data-date="${date}">
      <strong>${day}/05</strong>
      ${events.map((service) => `<span class="event ${service.serviceType === "Manutenção" ? "maintenance" : ""}" ${draggable ? `draggable="true" data-service-id="${service.id}"` : ""}>${service.serviceType}: ${clientName(service.clientId)}</span>`).join("")}
    </div>`;
  }).join("");
  if (draggable) bindDragCalendar();
}

function renderStock() {
  byId("stockAvailable").textContent = `${stockAvailable()} disponíveis`;
  byId("stockList").innerHTML = table(["Data", "Região", "Tipo", "Qtd.", "Responsável", "Observação"], state.stockMovements.map((move) => [
    formatDate(move.date), move.region, move.type, move.quantity, move.responsible, move.notes
  ]));
}

function renderAccess() {
  const items = state.accessUsers.filter((user) => matchesText(user.name, user.email, user.role));
  byId("accessCount").textContent = `${items.length} acessos`;
  byId("accessList").innerHTML = table(["Nome", "E-mail", "Perfil", "Abas liberadas", ""], items.map((user) => [
    user.name,
    user.email,
    user.role,
    (user.permissions || []).map(permissionLabel).join(", "),
    actions("access", user.id)
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
  upsertFromForm("clientForm", "clients", ["fleet"]);
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

function saveExpense(event) {
  event.preventDefault();
  upsertFromForm("expenseForm", "financeExpenses", ["amount"]);
  renderAll();
  toast("Despesa salva no financeiro.");
}

function saveAccess(event) {
  event.preventDefault();
  const form = byId("accessForm");
  const data = Object.fromEntries(new FormData(form).entries());
  data.email = normalizeEmail(data.email);

  if (!isValidEmail(data.email)) {
    toast("Informe um e-mail válido para criar o acesso.");
    return;
  }

  const permissions = new FormData(form).getAll("permissions");
  if (!permissions.length) {
    toast("Selecione pelo menos uma aba para este acesso.");
    return;
  }

  const duplicate = state.accessUsers.some((user) => normalizeEmail(user.email) === data.email && String(user.id) !== String(data.id || ""));
  if (duplicate) {
    toast("Já existe um acesso com este e-mail.");
    return;
  }

  const payload = { ...data, permissions };
  if (payload.id) {
    const index = state.accessUsers.findIndex((user) => Number(user.id) === Number(payload.id));
    state.accessUsers[index] = { ...state.accessUsers[index], ...payload, id: Number(payload.id) };
  } else {
    state.accessUsers.push({ ...payload, id: uid(state.accessUsers) });
  }

  saveState();
  form.reset();
  renderAll();
  toast("Acesso salvo com permissões.");
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

function formPayload(formId) {
  const data = Object.fromEntries(new FormData(byId(formId)).entries());
  if (data.email) data.email = normalizeEmail(data.email);
  return data;
}

async function tryRemoteSave(url, payload) {
  if (!remoteEnabled) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  numericFields.forEach((field) => data[field] = Number(data[field]) || 0);
  if (data.id) {
    const index = state[collection].findIndex((item) => Number(item.id) === Number(data.id));
    state[collection][index] = { ...state[collection][index], ...data, id: Number(data.id) };
  } else {
    state[collection].push({ ...data, id: uid(state[collection]) });
  }
  saveState();
  form.reset();
}

function actions(type, id) {
  return `<div class="row-actions"><button class="mini" type="button" onclick="editItem('${type}', ${id})">Editar</button><button class="mini delete" type="button" onclick="deleteItem('${type}', ${id})">Excluir</button></div>`;
}

window.editItem = function(type, id) {
  const map = { client: ["clients", "clientForm"], provider: ["providers", "providerForm"], service: ["services", "serviceForm"], expense: ["financeExpenses", "expenseForm"], access: ["accessUsers", "accessForm"] };
  const [collection, formId] = map[type];
  const item = state[collection].find((row) => Number(row.id) === Number(id));
  const form = byId(formId);
  if (type === "access") {
    form.querySelectorAll('[name="permissions"]').forEach((checkbox) => {
      checkbox.checked = (item.permissions || []).includes(checkbox.value);
    });
  }
  Object.entries(item).forEach(([key, value]) => {
    if (key === "permissions") return;
    if (form.elements[key]) form.elements[key].value = value;
  });
  updateServicePreview();
  toast("Registro carregado para edição.");
};

window.deleteItem = function(type, id) {
  if (!confirm("Excluir este registro?")) return;
  const map = { client: "clients", provider: "providers", service: "services", expense: "financeExpenses", access: "accessUsers" };
  state[map[type]] = state[map[type]].filter((item) => Number(item.id) !== Number(id));
  saveState();
  renderAll();
  toast("Registro excluído.");
};

function updateServicePreview() {
  const data = Object.fromEntries(new FormData(byId("serviceForm")).entries());
  const total = serviceTotal(data);
  byId("serviceTotalPreview").textContent = money(total);
  byId("serviceProfitPreview").textContent = money(total - Number(data.providerPaid || 0));
}

function fillSelects() {
  const clientOptions = state.clients.map((client) => `<option value="${client.id}">${client.company}</option>`).join("");
  const providerOptions = state.providers.map((provider) => `<option value="${provider.id}">${provider.name}</option>`).join("");
  document.querySelectorAll('[name="clientId"]').forEach((select) => select.innerHTML = clientOptions);
  document.querySelectorAll('[name="providerId"]').forEach((select) => select.innerHTML = providerOptions);
}

function convertPoc() {
  if (!selectedPocId) {
    toast("Selecione um POC primeiro.");
    return;
  }
  const poc = state.pocs.find((item) => item.id === selectedPocId);
  const client = state.clients.find((item) => Number(item.id) === Number(poc.clientId));
  client.status = "Contrato fechado";
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

function stockByRegion() {
  return state.stockMovements.reduce((acc, move) => {
    const sign = move.type === "Entrada" ? 1 : -1;
    acc[move.region] = (acc[move.region] || 0) + sign * Number(move.quantity);
    return acc;
  }, {});
}

function stockAvailable() {
  return Object.values(stockByRegion()).reduce((sum, amount) => sum + amount, 0);
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
  const services = monthlyServices();
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
