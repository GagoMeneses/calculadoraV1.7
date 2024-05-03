document.addEventListener('DOMContentLoaded', function() {
    registerEventListeners();
    setupPaymentInputs();
    setupAutoCalculate();
});

function registerEventListeners() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    toggleSwitch.addEventListener('change', function() {
        const changeOptions = document.getElementById('changeOptions');
        changeOptions.style.display = this.checked ? 'block' : 'none';
    });
}

function setupPaymentInputs() {
    const paymentInputs = document.querySelectorAll('.payment-section input[type="number"]');
    paymentInputs.forEach(input => {
        input.addEventListener('input', function() {
            const checkbox = document.getElementById(`payWith${input.id.slice(6)}`);
            checkbox.checked = parseFloat(input.value) > 0;
            calculateChange(); // Trigger calculation on input change
        });
    });
}

function setupAutoCalculate() {
    document.getElementById('totalAmountToPay').addEventListener('input', calculateChange);
    document.getElementById('exchangeSource').addEventListener('change', calculateChange);
    document.getElementById('currencyToPay').addEventListener('change', calculateChange);
    document.querySelectorAll('input[name="paymentCurrency"]').forEach(input => {
        input.addEventListener('change', calculateChange);
    });
    document.querySelectorAll('input[name="changeCurrency"]').forEach(input => {
        input.addEventListener('change', calculateChange);
    });
}

// Resto de las funciones (fetchExchangeRates, calculateChange, showResults) permanecen sin cambios


function fetchExchangeRates() {
    fetch('/api/exchange-rates')
        .then(response => response.json())
        .then(data => {
            window.exchangeSources = data;
            console.log('Tasas de cambio actualizadas:', window.exchangeSources);
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
        });
}

function calculateChange() {
    const source = document.getElementById('exchangeSource').value;
    const rates = window.exchangeSources[source];
    const totalAmountToPay = parseFloat(document.getElementById('totalAmountToPay').value);
    const currencyToPay = document.getElementById('currencyToPay').value;

    let totalPaidInCurrencyToPay = Array.from(document.querySelectorAll('input[name="paymentCurrency"]:checked'))
        .reduce((sum, input) => {
            const currency = input.value;
            const amount = parseFloat(document.getElementById(`amount${currency}`).value) || 0;
            return sum + (amount * (rates[currency][currencyToPay] || 0));
        }, 0);

    let changeDue = totalPaidInCurrencyToPay - totalAmountToPay;
    let changeCurrencies = Array.from(document.querySelectorAll('input[name="changeCurrency"]:checked'), input => input.value);

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
    const message = isExactPayment
        ? (changeDue > 0 ? `Tú cambio en ${currency} son: ${changeDue.toFixed(2)}` : '')
        : '';
    resultDiv.innerHTML = message;

    if (isExactPayment && changeDue > 0) {
        localStorage.setItem('changeDue', changeDue);
        localStorage.setItem('changeCurrency', currency);
    } else {
        localStorage.removeItem('changeDue');
        localStorage.removeItem('changeCurrency');
    }
}

// function showResults(changeDue, currency, isExactPayment) {
//     const resultDiv = document.getElementById('result');
//     const message = isExactPayment
//         ? (changeDue > 0 ? `Tú cambio en ${currency} son: ${changeDue.toFixed(2)}` : 'Pago exacto, no se debe cambio.')
//         : `Faltan ${currency}: ${changeDue.toFixed(2)}`;
//     resultDiv.innerHTML = message;

//     if (isExactPayment && changeDue > 0) {
//         localStorage.setItem('changeDue', changeDue);
//         localStorage.setItem('changeCurrency', currency);
//     } else {
//         localStorage.removeItem('changeDue');
//         localStorage.removeItem('changeCurrency');
//     }
// }
