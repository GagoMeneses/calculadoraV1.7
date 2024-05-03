import fetch from 'node-fetch';

const apiKey = '51cbe7593ef048d3b050d79f48f00f5d';
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const rates = data.rates;
    const VEF = rates['VEF'] || rates['VES'];  // Asegúrate de verificar el código correcto para el bolívar
    const EUR = rates['EUR'];
    const COP = rates['COP'];

    const exchangeSources = {
      BCV: {
        "USD": {"EUR": EUR, "Bs": VEF, "COP": COP, "USD": 1},
        "EUR": {"USD": 1 / EUR, "Bs": VEF / EUR, "COP": COP / EUR, "EUR": 1},
        "Bs": {"USD": 1 / VEF, "EUR": 1 / (VEF / EUR), "COP": COP / VEF, "Bs": 1},
        "COP": {"USD": 1 / COP, "EUR": 1 / (COP / EUR), "Bs": VEF / COP, "COP": 1}
      }
    };

    console.log('Tasas de cambio actualizadas para BCV:', exchangeSources.BCV);
  })
  .catch(error => console.error('Error al obtener los datos de la API:', error));
