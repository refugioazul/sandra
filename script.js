// ==========================================
// REFÚGIO AZUL - SCRIPT COMPLETO
// ==========================================


// ==========================================
// CONSULTA DE DISPONIBILIDADE
// ==========================================

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

const checkinInput =
  document.getElementById("checkin");

if (checkinInput) {

  checkinInput.addEventListener("change", (e) => {

    const checkout =
      document.getElementById("checkout");

    if (checkout) {
      checkout.min = e.target.value;
    }

  });

}



// ==========================================
// FOTOS DAS SUÍTES
// ==========================================

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



// ==========================================
// ÁREA GOURMET / PISCINA / CHURRASQUEIRA
// ==========================================

const galeriasAreas = [

  // ÁREA GOURMET
  [
    "assets/gourmet.jpg"
  ],

  // PISCINA
  [
    "assets/pool.jpg"
  ],

  // CHURRASQUEIRA
  [
    "assets/bbq.jpg"
  ]

];



// ==========================================
// CRIA A GALERIA
// ==========================================

// Remove uma galeria antiga caso exista

const galeriaAntiga =
  document.getElementById("galeriaModal");

if (galeriaAntiga) {
  galeriaAntiga.remove();
}


// Cria a galeria

const modal =
  document.createElement("div");

modal.id = "galeriaModal";

modal.innerHTML = `

  <button
    class="galeria-fechar"
    aria-label="Fechar">
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
    alt="Foto ampliada">

  <button
    class="galeria-seta galeria-proxima"
    aria-label="Próxima foto">
    ❯
  </button>

  <div id="contadorGaleria"></div>

`;

document.body.appendChild(modal);



// ==========================================
// ESTILOS EXTRAS
// ==========================================

const estilo =
  document.createElement("style");

estilo.textContent = `


/* ==========================================
   SUÍTES
========================================== */

.photo-card {
  cursor: pointer;
}


/* ==========================================
   ÁREA GOURMET / PISCINA / CHURRASQUEIRA
========================================== */

.showcase-grid > div {

  cursor: pointer;

  transition:
    transform 0.30s ease,
    box-shadow 0.30s ease;

}


/* O CARD INTEIRO AUMENTA */

.showcase-grid > div:hover {

  transform:
    translateY(-7px)
    scale(1.035);

  box-shadow:
    0 16px 35px
    rgba(0, 0, 0, 0.20);

}


/* FOTO TAMBÉM DÁ UMA LEVE APROXIMADA */

.showcase-grid > div img {

  transition:
    transform 0.40s ease;

}


.showcase-grid > div:hover img {

  transform:
    scale(1.07);

}



/* ==========================================
   GALERIA EM TELA CHEIA
========================================== */

#galeriaModal {

  display: none;

  position: fixed;

  inset: 0;

  width: 100%;
  height: 100%;

  background:
    rgba(0, 0, 0, 0.94);

  z-index: 999999;

  align-items: center;
  justify-content: center;

}


#galeriaModal.ativa {

  display: flex;

}


#fotoGaleria {

  max-width: 88%;
  max-height: 84vh;

  object-fit: contain;

  border-radius: 10px;

  box-shadow:
    0 15px 50px
    rgba(0, 0, 0, 0.5);

}


/* X */

.galeria-fechar {

  position: absolute;

  top: 15px;
  right: 25px;

  border: none;

  background: transparent;

  color: white;

  font-size: 50px;

  cursor: pointer;

  z-index: 1000000;

  transition:
    transform 0.2s ease;

}


.galeria-fechar:hover {

  transform:
    scale(1.15);

}



/* SETAS */

.galeria-seta {

  position: absolute;

  top: 50%;

  transform:
    translateY(-50%);

  border: none;

  background:
    rgba(0, 0, 0, 0.50);

  color: white;

  font-size: 36px;

  padding:
    14px 18px;

  border-radius: 9px;

  cursor: pointer;

  z-index: 1000000;

  transition:
    background 0.2s ease,
    transform 0.2s ease;

}


.galeria-seta:hover {

  background:
    rgba(255, 255, 255, 0.16);

}


.galeria-anterior {

  left: 20px;

}


.galeria-proxima {

  right: 20px;

}



/* CONTADOR */

#contadorGaleria {

  position: absolute;

  bottom: 20px;

  padding:
    7px 15px;

  border-radius: 30px;

  background:
    rgba(0, 0, 0, 0.55);

  color: white;

  font-family:
    Arial,
    sans-serif;

  font-size: 14px;

}



/* ==========================================
   CELULAR
========================================== */

@media (max-width: 700px) {

  #fotoGaleria {

    max-width: 94%;
    max-height: 80vh;

  }


  .galeria-seta {

    padding:
      10px 12px;

    font-size: 25px;

  }


  .galeria-anterior {

    left: 4px;

  }


  .galeria-proxima {

    right: 4px;

  }


  .galeria-fechar {

    top: 8px;
    right: 15px;

    font-size: 45px;

  }


  /* No celular não precisa subir tanto */

  .showcase-grid > div:hover {

    transform:
      scale(1.015);

  }

}

`;

document.head.appendChild(estilo);



// ==========================================
// FUNCIONAMENTO DA GALERIA
// ==========================================

let fotosAtuais = [];
let fotoAtual = 0;


function abrirGaleriaFotos(fotos) {

  fotosAtuais = fotos;

  fotoAtual = 0;

  atualizarGaleria();

  modal.classList.add("ativa");

  document.body.style.overflow =
    "hidden";

}


function fecharGaleria() {

  modal.classList.remove("ativa");

  document.body.style.overflow =
    "";

}


function proximaFoto() {

  if (fotosAtuais.length <= 1) {
    return;
  }

  fotoAtual++;

  if (
    fotoAtual >=
    fotosAtuais.length
  ) {

    fotoAtual = 0;

  }

  atualizarGaleria();

}


function fotoAnterior() {

  if (fotosAtuais.length <= 1) {
    return;
  }

  fotoAtual--;

  if (fotoAtual < 0) {

    fotoAtual =
      fotosAtuais.length - 1;

  }

  atualizarGaleria();

}


function atualizarGaleria() {

  const imagem =
    document.getElementById(
      "fotoGaleria"
    );

  const contador =
    document.getElementById(
      "contadorGaleria"
    );


  imagem.src =
    fotosAtuais[fotoAtual];


  contador.textContent =
    `${fotoAtual + 1} / ${fotosAtuais.length}`;



  // Se só tiver uma foto,
  // esconde as setas

  const setaAnterior =
    document.querySelector(
      ".galeria-anterior"
    );

  const setaProxima =
    document.querySelector(
      ".galeria-proxima"
    );


  if (fotosAtuais.length <= 1) {

    setaAnterior.style.display =
      "none";

    setaProxima.style.display =
      "none";

  } else {

    setaAnterior.style.display =
      "block";

    setaProxima.style.display =
      "block";

  }

}



// ==========================================
// CLIQUE NAS SUÍTES
// ==========================================

const cardsSuites =
  document.querySelectorAll(
    ".gallery .photo-card"
  );


cardsSuites.forEach(
  (card, index) => {

    // Isso substitui qualquer onclick antigo

    card.onclick = () => {

      if (
        galeriasSuites[index]
      ) {

        abrirGaleriaFotos(
          galeriasSuites[index]
        );

      }

    };

  }
);



// ==========================================
// CLIQUE NAS ÁREAS
// ==========================================

const cardsAreas =
  document.querySelectorAll(
    ".showcase-grid > div"
  );


cardsAreas.forEach(
  (card, index) => {

    card.onclick = () => {

      if (
        galeriasAreas[index]
      ) {

        abrirGaleriaFotos(
          galeriasAreas[index]
        );

      }

    };

  }
);



// ==========================================
// BOTÕES DA GALERIA
// ==========================================

document
  .querySelector(
    ".galeria-fechar"
  )
  .addEventListener(
    "click",
    fecharGaleria
  );


document
  .querySelector(
    ".galeria-proxima"
  )
  .addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      proximaFoto();

    }
  );


document
  .querySelector(
    ".galeria-anterior"
  )
  .addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      fotoAnterior();

    }
  );



// ==========================================
// CLICAR NO FUNDO PRETO FECHA
// ==========================================

modal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === modal
    ) {

      fecharGaleria();

    }

  }
);



// ==========================================
// TECLADO
// ==========================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !modal.classList.contains(
        "ativa"
      )
    ) {

      return;

    }


    if (
      event.key === "Escape"
    ) {

      fecharGaleria();

    }


    if (
      event.key === "ArrowRight"
    ) {

      proximaFoto();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      fotoAnterior();

    }

  }
);
