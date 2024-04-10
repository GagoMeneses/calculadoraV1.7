///////////funcion de calculo dinamico para calcular lo que falta para pagar el monto total


function updateAmountsNeeded() {
  const totalAmountToPay = parseFloat(document.getElementById('totalAmountToPay').value) || 0;
  const currencyToPay = document.getElementById('currencyToPay').value;

  let totalPaid = {
    "USD": parseFloat(document.getElementById('amountUSD').value) || 0,
    "EUR": parseFloat(document.getElementById('amountEUR').value) || 0,
    "Bs": parseFloat(document.getElementById('amountBs').value) || 0,
    "COP": parseFloat(document.getElementById('amountCOP').value) || 0
  };

  // Convert each paid amount to the currency to pay and sum them up
  let totalPaidInCurrencyToPay = Object.keys(totalPaid).reduce((acc, currency) => 
    acc + (totalPaid[currency] * exchangeRates[currency][currencyToPay]), 0);
  
  let difference = totalAmountToPay - totalPaidInCurrencyToPay;

  // Apply corrections to calculation method
  calculateAndDisplayAmountsNeeded(difference, currencyToPay);
}

// New method to calculate and display amounts needed in each currency accurately
function calculateAndDisplayAmountsNeeded(difference, currencyToPay) {
  Object.keys(exchangeRates).forEach(currency => {
    let resultElement = document.getElementById(`result${currency}`);
    let amountNeeded = difference * exchangeRates[currencyToPay][currency];
    resultElement.textContent = difference > 0 
      ? `Faltan ${amountNeeded.toFixed(2)} ${currency} para completar el pago.` 
      : "No se debe nada o hay un excedente.";
  });
}

document.querySelectorAll('input[type="number"], select').forEach(element => {
  element.addEventListener('input', updateAmountsNeeded);
});

updateAmountsNeeded();


window.updateAmountsNeeded = updateAmountsNeeded;
