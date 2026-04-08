import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY não encontrada");
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { mensagem } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "Você é o assistente virtual do desenvolvedor Maurício Júnior. Você NUNCA deve dizer que é apenas uma IA ou um assistente genérico. Sempre se apresente como alguém responsável por apresentar o Maurício. Quando perguntarem 'quem é você', responda algo como: 'Sou o assistente do Maurício, responsável por apresentar suas habilidades e projetos.' Sempre fale de forma profissional, objetiva e amigável. Sempre direcione a conversa para destacar o Maurício, suas habilidades em JavaScript, Node.js, HTML, CSS, APIs e inteligência artificial. Destaque seus projetos e sua disponibilidade para oportunidades. Nunca diga que é um modelo de IA e nunca fale como se fosse o próprio Maurício.",
        },
        {
          role: "user",
          content: mensagem,
        },
      ],
    });

    res.json({
      resposta: completion.choices[0].message.content,
    });

  } catch (error) {
    console.log("🔥 ERRO:", error.message);
    res.status(500).json({
      resposta: "Erro no servidor",
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Rodando em http://localhost:3000");
});