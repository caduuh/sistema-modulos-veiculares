const { createStockMovement } = require("../src/backend/repositories/opsRepository");
const { sendJson, readJson, sendError } = require("../src/backend/http");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Metodo nao permitido." });
    return;
  }

  try {
    sendJson(res, 201, await createStockMovement(await readJson(req)));
  } catch (error) {
    sendError(res, error);
  }
};
