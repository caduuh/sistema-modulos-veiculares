const { seedData, adminUser } = require("../src/backend/data/seeds");
const { getBootstrapData } = require("../src/backend/repositories/opsRepository");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Metodo nao permitido." }));
    return;
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  const data = await getBootstrapData(seedData);
  res.end(JSON.stringify({
    app: "Sarter Service Provider",
    admin: { email: adminUser.email, role: adminUser.role },
    data
  }));
};
