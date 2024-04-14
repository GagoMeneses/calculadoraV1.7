// Es importante mantener tu API key segura y no exponerla en el frontend directamente.
// En este ejemplo, la key está incluida sólo para demostración.
const apiKey = '51cbe7593ef048d3b050d79f48f00f5d';

fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí tendrás el objeto de datos con las tasas de cambio
    // Puedes actualizar tu variable `exchangeRates` con los nuevos datos aquí
    // Por ejemplo:
    window.exchangeRates = data.rates;
    console.log('Tasas de cambio actualizadas:', window.exchangeRates);
  })
  .catch(error => console.error('Error al obtener los datos de la API:', error));
