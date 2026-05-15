const { readAccesses, upsertAccess } = require("../src/backend/repositories/opsRepository");
const { requireSession } = require("../src/backend/auth/session");
const { sendJson, readJson, sendError } = require("../src/backend/http");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      requireSession(req, "access");
      sendJson(res, 200, await readAccesses());
      return;
    }

    if (req.method === "POST") {
      requireSession(req, "access");
      sendJson(res, 201, await upsertAccess(await readJson(req)));
      return;
    }

    sendJson(res, 405, { error: "Metodo nao permitido." });
  } catch (error) {
    sendError(res, error);
  }
};
