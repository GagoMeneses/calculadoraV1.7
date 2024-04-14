// Importar node-fetch para realizar solicitudes HTTP en Node.js de manera dinámica
import('node-fetch').then(({ default: fetch }) => {
  // Tu API key de Open Exchange Rates
  const apiKey = '51cbe7593ef048d3b050d79f48f00f5d';

  // URL para obtener las últimas tasas de cambio
  const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const rates = data.rates;

          // Suponiendo que 'VEF' es el código de la API para Bolívares, aunque deberías confirmarlo
          const VEF = rates['VEF'] || rates['VES']; // Asegúrate del código correcto
          const EUR = rates['EUR'];
          const COP = rates['COP'];

          // Actualización del objeto exchangeSources para el Banco Central de Venezuela (BCV)
          const exchangeSources = {
              BCV: {
                  "USD": {
                      "EUR": EUR,
                      "Bs": VEF,
                      "COP": COP,
                      "USD": 1
                  },
                  "EUR": {
                      "USD": 1 / EUR,
                      "Bs": VEF / EUR,
                      "COP": COP / EUR,
                      "EUR": 1
                  },
                  "Bs": {
                      "USD": 1 / VEF,
                      "EUR": 1 / (VEF / EUR),
                      "COP": COP / VEF,
                      "Bs": 1
                  },
                  "COP": {
                      "USD": 1 / COP,
                      "EUR": 1 / (COP / EUR),
                      "Bs": VEF / COP,
                      "COP": 1
                  }
              },
              // Asumiendo que hay otras entradas que no quieres sobrescribir
              Paralelo: {}, // No modificado
              DolarToday: {} // No modificado
          };

          console.log('Tasas de cambio actualizadas para BCV:', exchangeSources.BCV);
      })
      .catch(error => console.error('Error al obtener los datos de la API:', error));
});
