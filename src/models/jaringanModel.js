const supabase = require("../config/supabase");

const TABLE = "layanan_jaringan";

module.exports = {
  getAll: async () =>
    await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false }),
  getById: async (id) =>
    await supabase.from(TABLE).select("*").eq("id", id).single(),
  create: async (data) => await supabase.from(TABLE).insert(data).select(),
  update: async (id, data) =>
    await supabase.from(TABLE).update(data).eq("id", id).select(),
  delete: async (id) => await supabase.from(TABLE).delete().eq("id", id),
};
