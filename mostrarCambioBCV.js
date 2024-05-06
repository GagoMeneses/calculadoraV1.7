fetch('./public/exchangeRates.json')
        .then(response => response.json())
        .then(data => {
            const bcvBsRate = data.BCV.USD.Bs;
            const bcvBsRateRound = bcvBsRate.toFixed(2);
            document.getElementById('exchangeRate').innerHTML = ` BCV<br> ${bcvBsRateRound} Bs`;
        })
        .catch(error => console.error('Error al cargar los datos:', error));


        // document.getElementById('exchangeRate').textContent = ` BCV ${bcvBsRateRound}`;