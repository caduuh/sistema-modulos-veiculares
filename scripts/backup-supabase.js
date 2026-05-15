const fs = require("fs");
const path = require("path");
const { getSupabaseClient } = require("../src/backend/db/supabase");

const tables = [
  "clients",
  "providers",
  "services",
  "poc_controls",
  "poc_visits",
  "stock_movements",
  "app_accesses",
  "app_access_clients"
];

async function main() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error("Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY antes do backup.");
  }

  const backup = {};
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw new Error(`Falha no backup de ${table}: ${error.message}`);
    backup[table] = data || [];
  }

  const dir = path.resolve(__dirname, "..", "backups");
  fs.mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(dir, `supabase-backup-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify({ createdAt: new Date().toISOString(), tables: backup }, null, 2));
  console.log(`Backup criado em ${file}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
