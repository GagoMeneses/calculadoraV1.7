//este upDateExchangeRate genera el archivo exchangeRates.json de la carpeta public (el otro no)

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Tu API key de Open Exchange Rates
const apiKey = '51cbe7593ef048d3b050d79f48f00f5d';

// URL para obtener las últimas tasas de cambio
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        const VEF = rates['VEF'] || rates['VES']; // Confirma el código correcto para Bolívares
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
            Paralelo: {}, // Otras entradas no modificadas
            DolarToday: {}
        };

        // Escribir el objeto exchangeSources en un archivo JSON en la carpeta public
        const filePath = path.join(process.cwd(), 'public', 'exchangeRates.json'); // Define la ruta del archivo
        fs.promises.writeFile(filePath, JSON.stringify(exchangeSources, null, 2))
            .then(() => console.log('Archivo de tasas de cambio guardado en:', filePath))
            .catch(err => console.error('Error al escribir el archivo:', err));
    })
    .catch(error => console.error('Error al obtener los datos de la API:', error));
