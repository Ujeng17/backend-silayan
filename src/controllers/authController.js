const supabase = require("../config/supabase");

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan Password wajib diisi!" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    res.json({
      message: "Login Berhasil!",
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role, // default 'authenticated'
      },
      token: data.session.access_token, // Token ini nanti disimpan di frontend
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// REGISTER
exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan Password wajib diisi!" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;

    res.status(201).json({
      message:
        "Registrasi Berhasil! Silakan cek email untuk verifikasi (jika aktif) atau langsung login.",
      user: data.user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  const { error } = await supabase.auth.signOut();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Logout Berhasil" });
};
