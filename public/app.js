// app.js

const slides = document.querySelector(".carousel-inner");
const indicators = document.querySelector(".carousel-indicators");

(async function () {
  for (let i = 0; ; i++) {
    try {
      const response = await fetch("http://localhost:3000/" + i);
      if (!response.ok) break; // para se a resposta for erro (ex: 404)

      const receita = await response.json();

      // Verifica se a receita realmente tem os dados esperados
      if (!receita || !receita.imagem || !receita.nome) break;

      slides.innerHTML += `
      <div class="carousel-item${i == 0 ? " active" : ""}">
        <a href="http://localhost:3000/${i}">
          <img src="${receita.imagem}" class="d-block w-100">
          <div class="carousel-caption d-none d-md-block">
            <h5>${receita.nome}</h5>
            <p>${receita.descricao}</p>
          </div>
        </a>
      </div>`;

      indicators.innerHTML += `
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${i}"
        ${i == 0 ? `class="active"` : ""} aria-current="true" aria-label="Slide ${i + 1}"></button>`;

    } catch (error) {
      // Se ocorrer qualquer erro (ex: fetch falhou, JSON inválido), encerra o loop
      break;
    }
  }
})();

async function mostrarDetalhesReceita() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const receita = await fetch("http://localhost:3000/" + (id-1)).then((resp)=>resp.json());

  if (receita) {
    document.getElementById("titulo").textContent = receita.nome;
    document.getElementById("imagem").src = receita.imagem;
    document.getElementById("imagem").alt = receita.nome;
    document.getElementById("descricao").textContent = receita.descricao;
  } else {
    document.getElementById("titulo").textContent = "Receita não encontrada";
    document.getElementById("descricao").textContent = "Verifique se o link está correto.";
  }
}