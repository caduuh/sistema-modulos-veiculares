const { seedData, adminUser } = require("../src/backend/data/seeds");
const { requireSession } = require("../src/backend/auth/session");
const { getBootstrapData } = require("../src/backend/repositories/opsRepository");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Metodo nao permitido." }));
    return;
  }

  try {
    const session = requireSession(req);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    const data = await getBootstrapData(seedData, session);
    res.end(JSON.stringify({
      app: "Instalacoes Sarter",
      admin: { email: adminUser.email, role: adminUser.role },
      data
    }));
  } catch (error) {
    res.statusCode = error.statusCode || 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: error.message || "Erro interno." }));
  }
};
