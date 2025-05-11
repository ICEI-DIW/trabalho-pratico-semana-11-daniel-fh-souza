// app.js

const slides = document.querySelector(".carousel-inner");
const indicators = document.querySelector(".carousel-indicators");

for(let i=0; i<receitasRecentes.length; i++){
  const receita=receitasRecentes[i];
  slides.innerHTML+=`
  <div class="carousel-item`+(i==0? " active": "")+`">
      <a href="receita`+i+`.html">
          <img src="`+receita.imagem+`" class="d-block w-100">
          <div class="carousel-caption d-none d-md-block">
              <h5>`+receita.nome+`</h5>
              <p>`+receita.descricao+`</p>
          </div>
      </a>
  </div>`;
  indicators.innerHTML+=
  `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="`+i+`"`
    +(i==0? `class="active" `: "")+`aria-current="true" aria-label="Slide `+(i+1)+`"></button>`;
}

function mostrarDetalhesReceita() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const receita = receitasRecentes.find(r => r.id === id);

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