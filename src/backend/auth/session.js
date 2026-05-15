const crypto = require("crypto");

const DEFAULT_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret && process.env.VERCEL) {
    throw new Error("SESSION_SECRET nao configurado.");
  }
  return secret || "local-dev-session-secret";
}

function signSession(access) {
  const payload = {
    sub: access.id || access.email || "admin",
    role: access.role,
    name: access.name,
    email: access.email,
    clients: access.clients || [],
    views: access.views || [],
    exp: Math.floor(Date.now() / 1000) + DEFAULT_TTL_SECONDS
  };
  const body = base64url(JSON.stringify(payload));
  const signature = sign(body);
  return `${body}.${signature}`;
}

function readSession(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature || !timingEqual(signature, sign(body))) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

function requireSession(req, viewId) {
  const session = readSession(req);
  if (!session) {
    const error = new Error("Sessao invalida ou expirada.");
    error.statusCode = 401;
    throw error;
  }
  if (viewId && !canAccessView(session, viewId)) {
    const error = new Error("Acesso negado para esta area.");
    error.statusCode = 403;
    throw error;
  }
  return session;
}

function canAccessView(session, viewId) {
  return session.role === "admin" || session.views?.includes("all") || session.views?.includes(viewId);
}

function canAccessClient(session, clientId) {
  return session.role === "admin" || session.clients?.includes("all") || session.clients?.map(String).includes(String(clientId));
}

function assertClientAccess(session, clientId) {
  if (canAccessClient(session, clientId)) return;
  const error = new Error("Empresa nao liberada para este acesso.");
  error.statusCode = 403;
  throw error;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function timingEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

module.exports = {
  assertClientAccess,
  canAccessClient,
  canAccessView,
  readSession,
  requireSession,
  signSession
};
