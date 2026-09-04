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
