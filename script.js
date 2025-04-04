const baseUrl = "http://127.0.0.1:5000/";
const aleatorio = "/charadas";

let respostaOriginal = "";
let respostaNormalizada = "";

async function getCharada() {
  try {
    const charada = await fetch(baseUrl + aleatorio);
    const charadaJson = await charada.json();

    document.getElementById("charada-pergunta").innerText = `${charadaJson.pergunta}`;
    respostaOriginal = charadaJson.resposta;
    respostaNormalizada = normalizarTexto(charadaJson.resposta);

    document.getElementById("resposta-container").innerHTML = `<p class="text-gray-500">💭 Aguarde sua resposta...</p>`;
    document.getElementById("input-resposta").value = "";

  } catch (error) {
    console.log("Erro ao chamar a API: " + error);
  }
}

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "");
}

function verificarResposta() {
  const respostaUsuario = document.getElementById("input-resposta").value;
  const respostaUsuarioFormatada = normalizarTexto(respostaUsuario);

  const respostaContainer = document.getElementById("resposta-container");

  if (respostaUsuarioFormatada === respostaNormalizada) {
    respostaContainer.innerHTML = `<p class="text-green-600 font-bold">✅ Resposta correta!</p>`;
  } else {
    respostaContainer.innerHTML = `<p class="text-red-600 font-bold">❌ Resposta errada!</p>`;
  }
}

function verResposta() {
  document.getElementById("resposta-container").innerHTML =
    `<p class="text-gray-700">🔍 A resposta correta é: <strong>${respostaOriginal}</strong></p>`;
}

getCharada();
