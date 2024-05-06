fetch('./public/parallelExchangeRate.json')
        .then(response => response.json())
        .then(data => {
    const usdPvef = data.USDPVEF;
    const usdPvefRound = usdPvef.toFixed(2);
    document.getElementById('paralelRate').innerHTML = `Paralelo<br>${usdPvefRound} Bs`;

})

        .catch(error => console.error('Error al cargar los datos:', error));


        // document.getElementById('paralelRate').textContent = `Paralelo ${usdPvefRound}`;