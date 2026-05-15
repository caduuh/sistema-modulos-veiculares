const crypto = require("crypto");
const { adminUser } = require("../../src/backend/data/seeds");

function sameValue(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Metodo nao permitido." }));
    return;
  }

  let body = {};
  try {
    for await (const chunk of req) {
      body = JSON.parse(chunk.toString("utf8"));
    }
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "JSON invalido." }));
    return;
  }

  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL || adminUser.email);
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || adminUser.password;
  const ok = sameValue(normalizeEmail(body.email), adminEmail) && sameValue(body.password, adminPassword);
  res.statusCode = ok ? 200 : 401;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(ok ? { ok: true, role: adminUser.role } : { error: "Credenciais invalidas." }));
};
