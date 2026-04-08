function addMsg(texto, tipo) {
  const chat = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.classList.add("msg", tipo);

  div.innerText = texto;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  return div;
}

async function enviar() {
  const input = document.getElementById("input");
  const mensagem = input.value;

  if (!mensagem) return;

  addMsg(mensagem, "user");
  input.value = "";

  const loading = addMsg("Digitando...", "bot");
let dots= 0;
const interval = setInterval(() => {
  dots = (dots + 1) % 4;
  loading.innerText = "Digitando" + ".".repeat(dots);
}, 400);

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mensagem }),
    });

    const data = await res.json();
    clearInterval(interval);
    

    loading.innerText = data.resposta;

  } catch {
    loading.innerText = "Erro ao responder.";
  }
}