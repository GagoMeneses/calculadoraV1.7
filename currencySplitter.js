import { exchangeSources } from './exchangeSources.js';

document.addEventListener('DOMContentLoaded', function() {
  const multiCurrencyButton = document.getElementById('calculateMultiCurrencyChange');
  if (multiCurrencyButton) {
    multiCurrencyButton.addEventListener('click', function() {
      handleMultiCurrencyChange();
    });
  }
});

function handleMultiCurrencyChange() {
  const changeDue = parseFloat(localStorage.getItem('changeDue'));
  if (!isNaN(changeDue)) {
    let firstCurrencyAmount = parseFloat(document.getElementById('firstCurrencyAmount').value);
    let firstCurrency = document.getElementById('firstCurrency').value;
    const changeCurrency = localStorage.getItem('changeCurrency'); // Assuming 'changeDue' is in this currency

    let firstCurrencyAmountInChangeCurrency = convertCurrency(firstCurrencyAmount, firstCurrency, changeCurrency, exchangeSources);

    if (firstCurrencyAmountInChangeCurrency > changeDue) {
      alert("El monto en la primera moneda, convertido al cambio debido, no puede ser mayor que el cambio debido.");
      return;
    }

    let secondCurrency = document.getElementById('secondCurrency').value;
    let remainingChange = changeDue - firstCurrencyAmountInChangeCurrency;
    let secondCurrencyAmount = convertCurrency(remainingChange, changeCurrency, secondCurrency, exchangeSources);
    showMultiCurrencyChange(firstCurrencyAmount, firstCurrency, secondCurrencyAmount, secondCurrency);
  } else {
    console.error("No hay cambio debido almacenado para ser dividido en dos monedas.");
  }
}

function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  const rate = rates[fromCurrency][toCurrency];
  return amount * (rate || 0); // Provide default fallback rate of 0 if not found
}

function showMultiCurrencyChange(firstAmount, firstCurrency, secondAmount, secondCurrency) {
  const resultDiv = document.getElementById('result2');
  resultDiv.innerHTML = `Cambio en ${firstCurrency}: ${firstAmount.toFixed(2)}<br>Cambio en ${secondCurrency}: ${secondAmount.toFixed(2)}`;
}

export { handleMultiCurrencyChange };
