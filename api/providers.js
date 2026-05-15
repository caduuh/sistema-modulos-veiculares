const { createProvider } = require("../src/backend/repositories/opsRepository");
const { requireSession } = require("../src/backend/auth/session");
const { sendJson, readJson, sendError } = require("../src/backend/http");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Metodo nao permitido." });
    return;
  }

  try {
    const session = requireSession(req, "providers");
    sendJson(res, 201, await createProvider(await readJson(req), session));
  } catch (error) {
    sendError(res, error);
  }
};
