

document.addEventListener('DOMContentLoaded', function() {
  const calculateButton = document.getElementById('calculateChange');
  if(calculateButton) {
      calculateButton.addEventListener('click', calculateChange);
  }
});

function calculateChange() {
  const totalAmountToPay = parseFloat(document.getElementById('totalAmountToPay').value);
  const currencyToPay = document.getElementById('currencyToPay').value;

  let totalPaidInCurrencyToPay = 0;

  document.querySelectorAll('input[name="paymentCurrency"]:checked').forEach(input => {
      const currency = input.value;
      const amount = parseFloat(document.getElementById(`amount${currency}`).value) || 0;
      if (amount > 0) {
          totalPaidInCurrencyToPay += amount * (exchangeRates[currency][currencyToPay] || 0);
      }
  });

  let changeDue = totalPaidInCurrencyToPay - totalAmountToPay;
  
  let changeCurrencies = [];
  document.querySelectorAll('input[name="changeCurrency"]:checked').forEach(input => {
      changeCurrencies.push(input.value);
  });

  if (changeDue > 0 && changeCurrencies.length > 0) {
      let currencyForChange = changeCurrencies[0];
      let changeInSelectedCurrency = changeDue * (exchangeRates[currencyToPay][currencyForChange] || 1);
      showResults(changeInSelectedCurrency, currencyForChange, true);
  } else if (changeDue < 0) {
      showResults(Math.abs(changeDue), currencyToPay, false);
  } else {
      showResults(0, currencyToPay, true);
  }
}

function showResults(changeDue, currency, isExactPayment) {
  const resultDiv = document.getElementById('result');
  if (isExactPayment) {
      if (changeDue > 0) {
          resultDiv.innerHTML = `Cambio debido en ${currency}: ${changeDue.toFixed(2)}`;
          // Almacenar el cambio debido para su uso posterior
          localStorage.setItem('changeDue', changeDue);
          localStorage.setItem('changeCurrency', currency);
      } else {
          resultDiv.innerHTML = 'Pago exacto, no se debe cambio.';
          localStorage.removeItem('changeDue');
          localStorage.removeItem('changeCurrency');
      }
  } else {
      resultDiv.innerHTML = `Falta pagar en ${currency}: ${changeDue.toFixed(2)}`;
      localStorage.removeItem('changeDue');
      localStorage.removeItem('changeCurrency');
  }
}


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

  



