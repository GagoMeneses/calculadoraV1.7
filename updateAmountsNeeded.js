///////////funcion de calculo dinamico para calcular lo que falta para pagar el monto total


let rates = {};  // Variable para almacenar las tasas de cambio actuales según la fuente seleccionada

// Actualiza las tasas de cambio cuando el usuario selecciona una fuente diferente
document.getElementById('exchangeSource').addEventListener('change', function() {
    const source = document.getElementById('exchangeSource').value;
    rates = exchangeSources[source];  // Asume que exchangeSources es accesible globalmente y contiene todas las fuentes
    updateAmountsNeeded();  // Recalcular los montos necesarios cada vez que cambia la fuente
});

function updateAmountsNeeded() {
  const totalAmountToPay = parseFloat(document.getElementById('totalAmountToPay').value) || 0;
  const currencyToPay = document.getElementById('currencyToPay').value;

  let totalPaid = {
    "USD": parseFloat(document.getElementById('amountUSD').value) || 0,
    "EUR": parseFloat(document.getElementById('amountEUR').value) || 0,
    "Bs": parseFloat(document.getElementById('amountBs').value) || 0,
    "COP": parseFloat(document.getElementById('amountCOP').value) || 0
  };

  let totalPaidInCurrencyToPay = Object.keys(totalPaid).reduce((acc, currency) => 
    acc + (totalPaid[currency] * (rates[currency][currencyToPay] || 0)), 0);
  
  let difference = totalAmountToPay - totalPaidInCurrencyToPay;
  calculateAndDisplayAmountsNeeded(difference, currencyToPay);
}

function calculateAndDisplayAmountsNeeded(difference, currencyToPay) {
  Object.keys(rates).forEach(currency => {
    let resultElement = document.getElementById(`result${currency}`);
    let amountNeeded = difference * (rates[currencyToPay][currency] || 1);
    resultElement.textContent = difference > 0 
      ? `Faltan ${amountNeeded.toFixed(2)} ${currency} para completar el pago.` 
      : " "; //No se debe nada o hay un excedente.
  });
}

document.querySelectorAll('input[type="number"], select').forEach(element => {
  element.addEventListener('input', updateAmountsNeeded);
});

// Inicializa las tasas y actualiza montos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('exchangeSource').dispatchEvent(new Event('change'));
});


updateAmountsNeeded();


window.updateAmountsNeeded = updateAmountsNeeded;
