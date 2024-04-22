// Importar fetch utilizando ES Modules
import fetch from 'node-fetch';

const apiKey = '51cbe7593ef048d3b050d79f48f00f5d';

fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí tendrás el objeto de datos con las tasas de cambio
    console.log('Tasas de cambio actualizadas:', data.rates);
  })
  .catch(error => console.error('Error al obtener los datos de la API:', error));
