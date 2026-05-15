const adminUser = {
  email: "admin@sarter.local",
  password: "Sarter@123",
  role: "ADMIN"
};

const seedData = {
  clients: [
    { id: 1, company: "Facss", status: "Contrato fechado", fleet: 86, installedModules: 40, companyType: "Facss", region: "MG" },
    { id: 2, company: "Frota Minas Alimentos", status: "Cliente ativo", fleet: 42, installedModules: 18, companyType: "Padrao", region: "MG" },
    { id: 3, company: "Expresso Centro-Oeste", status: "POC", fleet: 24, installedModules: 8, companyType: "Padrao", region: "GO" },
    { id: 4, company: "Rota Sul Distribuição", status: "POC", fleet: 18, installedModules: 5, companyType: "Padrao", region: "RS" }
  ],
  providers: [
    { name: "Equipe BH Norte", type: "Equipe própria", availability: "Disponível", region: "MG" },
    { name: "TecCar Contagem", type: "Terceirizado", availability: "Disponível", region: "MG" },
    { name: "SulTrack Serviços", type: "Terceirizado", availability: "Agenda cheia", region: "RS" },
    { name: "Equipe Centro-Oeste", type: "Equipe própria", availability: "Em deslocamento", region: "GO" }
  ],
  services: [
    { client: "Transvale Logística", type: "Instalação", status: "Em andamento", total: 761.6, profit: 581.6 },
    { client: "Frota Minas Alimentos", type: "Manutenção", status: "Agendado", total: 577.2, profit: 432.2 },
    { client: "Expresso Centro-Oeste", type: "Instalação", status: "Em andamento", total: 968.4, profit: 778.4 }
  ]
};

module.exports = { adminUser, seedData };
