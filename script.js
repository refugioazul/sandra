const btn = document.getElementById('consultar');

btn.addEventListener('click', () => {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;

  let texto = 'Olá! Quero consultar a disponibilidade do Refúgio Azul.';
  if (checkin) texto += ` Check-in: ${formatDate(checkin)}.`;
  if (checkout) texto += ` Check-out: ${formatDate(checkout)}.`;

  const url = 'https://wa.me/5512997000486?text=' + encodeURIComponent(texto);
  window.open(url, '_blank');
});

function formatDate(value){
  const [y,m,d] = value.split('-');
  return `${d}/${m}/${y}`;
}

// Impede seleção de check-out anterior ao check-in
document.getElementById('checkin').addEventListener('change', (e) => {
  document.getElementById('checkout').min = e.target.value;
});

// ===== GALERIAS DAS SUÍTES =====

const galeriasSuites = {

  1: [
    "assets/suite1.jpg",
    "assets/suite1-1.jpg",
    "assets/suite1-2.jpg",
    "assets/suite1-3.jpg"
  ],

  2: [
    "assets/suite2.jpg",
    "assets/suite2-1.jpg",
    "assets/suite2-2.jpg",
    "assets/suite2-3.jpg"
  ],

  3: [
    "assets/suite3.jpg",
    "assets/suite3-1.jpg",
    "assets/suite3-2.jpg",
    "assets/suite3-3.jpg"
  ],

  4: [
    "assets/suite4.jpg",
    "assets/suite4-1.jpg",
    "assets/suite4-2.jpg",
    "assets/suite4-3.jpg"
  ]

};

let fotosGaleria = [];
let fotoAtual = 0;

function abrirGaleria(suite) {

  fotosGaleria = galeriasSuites[suite];
  fotoAtual = 0;

  atualizarFotoGaleria();

  document
    .getElementById("galeriaModal")
    .classList.add("ativa");

  document.body.style.overflow = "hidden";

}

function fecharGaleria() {

  document
    .getElementById("galeriaModal")
    .classList.remove("ativa");

  document.body.style.overflow = "";

}

function proximaFoto() {

  fotoAtual++;

  if (fotoAtual >= fotosGaleria.length) {
    fotoAtual = 0;
  }

  atualizarFotoGaleria();

}

function fotoAnterior() {

  fotoAtual--;

  if (fotoAtual < 0) {
    fotoAtual = fotosGaleria.length - 1;
  }

  atualizarFotoGaleria();

}

function atualizarFotoGaleria() {

  document.getElementById("fotoGaleria").src =
    fotosGaleria[fotoAtual];

  document.getElementById("contadorGaleria").textContent =
    (fotoAtual + 1) + " / " + fotosGaleria.length;

}


// Fecha clicando no fundo preto

document
  .getElementById("galeriaModal")
  .addEventListener("click", function(event) {

    if (event.target === this) {
      fecharGaleria();
    }

  });


// Controles pelo teclado

document.addEventListener("keydown", function(event) {

  const modal =
    document.getElementById("galeriaModal");

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
