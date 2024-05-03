

document.addEventListener('DOMContentLoaded', function() {
  const calculateButton = document.getElementById('calculateChange');
  if(calculateButton) {
      calculateButton.addEventListener('click', calculateChange);
  }
});

document.getElementById('toggleSwitch').addEventListener('change', function() {
    var changeOptions = document.getElementById('changeOptions');
    if (this.checked) {
        changeOptions.style.display = 'block';  // Mostrar cuando el interruptor está activado
    } else {
        changeOptions.style.display = 'none';  // Ocultar cuando el interruptor está desactivado
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const paymentInputs = document.querySelectorAll('.payment-section input[type="number"]');

    paymentInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Obtiene el checkbox asociado usando el atributo 'id' del input para buscar el checkbox correspondiente
            const checkbox = document.getElementById(`payWith${input.id.slice(6)}`); // asume que los IDs están formateados correctamente, como 'amountUSD' para el input y 'payWithUSD' para el checkbox
            if (parseFloat(input.value) > 0) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    });
});

//desta es la funcion que actualiza window.exchangeSources con los datos recibidos del servidor.

function fetchExchangeRates() {
    fetch('/api/exchange-rates')
        .then(response => response.json())
        .then(data => {
            window.exchangeSources = data;
            console.log('Tasas de cambio actualizadas:', window.exchangeSources);
        })
        .catch(error => console.error('Error al obtener los datos de la API:', error));
}


// hasta aqui

function calculateChange() {
  const source = document.getElementById('exchangeSource').value;
  const rates = exchangeSources[source];

  const totalAmountToPay = parseFloat(document.getElementById('totalAmountToPay').value);
  const currencyToPay = document.getElementById('currencyToPay').value;

  let totalPaidInCurrencyToPay = 0;

  document.querySelectorAll('input[name="paymentCurrency"]:checked').forEach(input => {
      const currency = input.value;
      const amount = parseFloat(document.getElementById(`amount${currency}`).value) || 0;
      if (amount > 0) {
          totalPaidInCurrencyToPay += amount * (rates[currency][currencyToPay] || 0);
      }
  });

  let changeDue = totalPaidInCurrencyToPay - totalAmountToPay;
  
  let changeCurrencies = [];
  document.querySelectorAll('input[name="changeCurrency"]:checked').forEach(input => {
      changeCurrencies.push(input.value);
  });

  if (changeDue > 0 && changeCurrencies.length > 0) {
      let currencyForChange = changeCurrencies[0];
      let changeInSelectedCurrency = changeDue * (rates[currencyToPay][currencyForChange] || 1);
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








  



