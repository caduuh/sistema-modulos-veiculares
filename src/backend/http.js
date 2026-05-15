async function readJson(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }

  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function sendError(res, error) {
  sendJson(res, error.statusCode || 500, {
    error: error.message || "Erro interno."
  });
}

module.exports = { readJson, sendJson, sendError };
