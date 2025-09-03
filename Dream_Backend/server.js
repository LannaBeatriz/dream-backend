const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const User = require("./User");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexão com o MongoDB
mongoose.connect("mongodb+srv://delmondeslanna0_db_user:15x9KBdvcqnBvu09@cluster0.ejzisw1.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado ao MongoDB"))
.catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// 🌐 Rota principal
app.get("/", (req, res) => {
  res.send("API de Finanças rodando 🚀");
});


// 📝 Rota de cadastro
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos." });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ sucesso: false, mensagem: "E-mail já cadastrado." });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ sucesso: false, mensagem: "Erro ao cadastrar usuário." });
  }
});

// 🛡️ Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== senha) {
      return res.status(401).json({ sucesso: false, mensagem: "Credenciais inválidas." });
    }
    return res.json({ sucesso: true, mensagem: "Login realizado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ sucesso: false, mensagem: "Erro ao fazer login." });
  }
});

// �🚀 Inicialização do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
