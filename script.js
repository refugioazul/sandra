// =====================================
// REFÚGIO AZUL
// =====================================


// ===== CONSULTAR DISPONIBILIDADE =====

const btn = document.getElementById("consultar");

if (btn) {
  btn.addEventListener("click", () => {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    let texto =
      "Olá! Quero consultar a disponibilidade do Refúgio Azul.";

    if (checkin) {
      texto += ` Check-in: ${formatDate(checkin)}.`;
    }

    if (checkout) {
      texto += ` Check-out: ${formatDate(checkout)}.`;
    }

    const url =
      "https://wa.me/5512997000486?text=" +
      encodeURIComponent(texto);

    window.open(url, "_blank");
  });
}


function formatDate(value) {
  const [y, m, d] = value.split("-");
  return `${d}/${m}/${y}`;
}


// Impede check-out anterior ao check-in

const checkinInput = document.getElementById("checkin");

if (checkinInput) {

  checkinInput.addEventListener("change", (e) => {

    document.getElementById("checkout").min =
      e.target.value;

  });

}



// =====================================
// GALERIAS DAS SUÍTES
// =====================================

const galeriasSuites = [

  // SUÍTE 1
  [
    "assets/suite1.jpg",
    "assets/suite1-1.jpg",
    "assets/suite1-2.jpg",
    "assets/suite1-3.jpg"
  ],

  // SUÍTE 2
  [
    "assets/suite2.jpg",
    "assets/suite2-1.jpg",
    "assets/suite2-2.jpg"
  ],

  // SUÍTE 3
  [
    "assets/suite3.jpg"
  ],

  // SUÍTE 4
  [
    "assets/suite4.jpg"
  ]

];



// =====================================
// CRIA A GALERIA AUTOMATICAMENTE
// =====================================

// Remove galeria antiga caso exista

const galeriaAntiga =
  document.getElementById("galeriaModal");

if (galeriaAntiga) {
  galeriaAntiga.remove();
}


// Cria o fundo da galeria

const modal = document.createElement("div");

modal.id = "galeriaModal";

modal.innerHTML = `

  <button
    class="galeria-fechar"
    aria-label="Fechar galeria">
    ×
  </button>

  <button
    class="galeria-seta galeria-anterior"
    aria-label="Foto anterior">
    ❮
  </button>

  <img
    id="fotoGaleria"
    src=""
    alt="Foto da suíte">

  <button
    class="galeria-seta galeria-proxima"
    aria-label="Próxima foto">
    ❯
  </button>

  <div id="contadorGaleria"></div>

`;

document.body.appendChild(modal);



// =====================================
// ESTILO DA GALERIA E ZOOM
// =====================================

const estilo = document.createElement("style");

estilo.textContent = `

/* FOTO CRESCE AO PASSAR O MOUSE */

.photo-card {
  overflow: hidden;
  cursor: pointer;
}

.photo-card img {
  transition: transform 0.35s ease;
}

.photo-card:hover img {
  transform: scale(1.08);
}


/* GALERIA */

#galeriaModal {
  display: none;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.94);
  z-index: 999999;
  align-items: center;
  justify-content: center;
}

#galeriaModal.ativa {
  display: flex;
}

#fotoGaleria {
  max-width: 88%;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,.5);
}

.galeria-fechar {
  position: absolute;
  top: 15px;
  right: 25px;
  border: 0;
  background: transparent;
  color: white;
  font-size: 50px;
  cursor: pointer;
  z-index: 1000000;
}

.galeria-seta {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  border: 0;
  background: rgba(0,0,0,.55);
  color: white;

  font-size: 35px;

  padding: 14px 18px;

  cursor: pointer;

  border-radius: 10px;

  z-index: 1000000;
}

.galeria-anterior {
  left: 20px;
}

.galeria-proxima {
  right: 20px;
}

#contadorGaleria {
  position: absolute;
  bottom: 22px;

  background: rgba(0,0,0,.55);

  padding: 7px 14px;

  border-radius: 20px;

  color: white;

  font-family: Arial, sans-serif;

  font-size: 15px;
}


@media (max-width: 700px) {

  #fotoGaleria {
    max-width: 94%;
    max-height: 80vh;
  }

  .galeria-seta {
    font-size: 25px;
    padding: 10px 12px;
  }

  .galeria-anterior {
    left: 4px;
  }

  .galeria-proxima {
    right: 4px;
  }

}

`;

document.head.appendChild(estilo);



// =====================================
// FUNCIONAMENTO
// =====================================

let suiteAtual = 0;
let fotoAtual = 0;


function abrirGaleria(numeroSuite) {

  suiteAtual = numeroSuite;
  fotoAtual = 0;

  atualizarGaleria();

  modal.classList.add("ativa");

  document.body.style.overflow = "hidden";

}


function fecharGaleria() {

  modal.classList.remove("ativa");

  document.body.style.overflow = "";

}


function proximaFoto() {

  const fotos = galeriasSuites[suiteAtual];

  fotoAtual++;

  if (fotoAtual >= fotos.length) {
    fotoAtual = 0;
  }

  atualizarGaleria();

}


function fotoAnterior() {

  const fotos = galeriasSuites[suiteAtual];

  fotoAtual--;

  if (fotoAtual < 0) {
    fotoAtual = fotos.length - 1;
  }

  atualizarGaleria();

}


function atualizarGaleria() {

  const fotos =
    galeriasSuites[suiteAtual];

  const imagem =
    document.getElementById("fotoGaleria");

  const contador =
    document.getElementById("contadorGaleria");

  imagem.src = fotos[fotoAtual];

  contador.textContent =
    `${fotoAtual + 1} / ${fotos.length}`;

}



// =====================================
// FAZ AS 4 SUÍTES SEREM CLICÁVEIS
// =====================================

const cards =
  document.querySelectorAll(".gallery .photo-card");

cards.forEach((card, index) => {

  card.addEventListener("click", () => {

    if (galeriasSuites[index]) {
      abrirGaleria(index);
    }

  });

});



// BOTÕES

document
  .querySelector(".galeria-fechar")
  .addEventListener("click", fecharGaleria);


document
  .querySelector(".galeria-proxima")
  .addEventListener("click", (event) => {

    event.stopPropagation();
    proximaFoto();

  });


document
  .querySelector(".galeria-anterior")
  .addEventListener("click", (event) => {

    event.stopPropagation();
    fotoAnterior();

  });



// CLICAR FORA DA FOTO FECHA

modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    fecharGaleria();
  }

});



// TECLADO

document.addEventListener("keydown", (event) => {

  if (!modal.classList.contains("ativa")) {
    return;
  }

  if (event.key === "Escape") {
    fecharGaleria();
  }

  if (event.key === "ArrowRight") {
    proximaFoto();
  }

  if (event.key === "ArrowLeft") {
    fotoAnterior();
  }

});
