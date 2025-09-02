const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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

// �️ Rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  // Aqui você pode adicionar a lógica de autenticação com o banco de dados
  if (email === "admin@teste.com" && senha === "123456") {
    return res.json({ sucesso: true, mensagem: "Login realizado com sucesso!" });
  } else {
    return res.status(401).json({ sucesso: false, mensagem: "Credenciais inválidas." });
  }
});

// �🚀 Inicialização do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
