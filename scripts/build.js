const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const staticFiles = ["index.html", "app.js", "styles.css"];

fs.mkdirSync(publicDir, { recursive: true });

for (const file of staticFiles) {
  fs.copyFileSync(path.join(root, file), path.join(publicDir, file));
}

console.log("Build concluido em public/");
