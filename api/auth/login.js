const crypto = require("crypto");
const { adminUser } = require("../../src/backend/data/seeds");
const { signSession } = require("../../src/backend/auth/session");
const { verifyAccessLogin } = require("../../src/backend/repositories/opsRepository");

const LOGIN_TIMEOUT_MS = 7000;

function sameValue(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => {
      const error = new Error("Tempo limite ao consultar o banco de acessos.");
      error.statusCode = 504;
      reject(error);
    }, ms))
  ]);
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ error: "Metodo nao permitido." }));
      return;
    }

    let raw = "";
    let body = {};
    try {
      for await (const chunk of req) {
        raw += chunk.toString("utf8");
      }
      body = raw ? JSON.parse(raw) : {};
    } catch {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ error: "JSON invalido." }));
      return;
    }

    body.email = normalizeEmail(body.email);
    const fallbackAccess = { id: "local-admin", email: adminUser.email, role: "admin", name: "Administrador", clients: ["all"], views: ["all"] };
    const access = await withTimeout(verifyAccessLogin(body), LOGIN_TIMEOUT_MS).catch((error) => {
      if (sameValue(body.email, adminUser.email) && sameValue(body.password, adminUser.password)) return null;
      throw error;
    });
    const resolvedAccess = access || (sameValue(body.email, adminUser.email) && sameValue(body.password, adminUser.password) ? fallbackAccess : null);
    const ok = Boolean(resolvedAccess);
    res.statusCode = ok ? 200 : 401;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify(ok ? { ok: true, token: signSession(resolvedAccess), access: resolvedAccess, role: resolvedAccess.role } : { error: "Credenciais invalidas." }));
  } catch (error) {
    res.statusCode = error.statusCode || 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ error: error.message || "Erro interno ao entrar." }));
  }
};
