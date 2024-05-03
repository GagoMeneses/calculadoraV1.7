// http://localhost:3000/api/exchange-rates
// nodemon server.js

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

async function getExchangeRates() {
  const openExchangeUrl = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_KEY}&symbols=EUR,VES,COP`;
  const parallelRateUrl = 'https://www.parallelrate.org/api/currentprice?currency=USDPVEF';

  try {
    // Realizar ambas peticiones en paralelo
    const [openExchangeResponse, parallelRateResponse] = await Promise.all([
      axios.get(openExchangeUrl),
      axios.get(parallelRateUrl)
    ]);

    const openRates = openExchangeResponse.data.rates;
    const parallelRate = parallelRateResponse.data.USDPVEF; // Asegúrate de que la propiedad accedida es correcta

    // Calcular tasas inversas y cruzadas usando los datos de openExchangeRates
    const conversions = {
      USD: { EUR: openRates.EUR, Bs: openRates.VES, COP: openRates.COP, USD: 1 },
      EUR: { USD: 1 / openRates.EUR, Bs: openRates.VES / openRates.EUR, COP: openRates.COP / openRates.EUR, EUR: 1 },
      Bs: { USD: 1 / openRates.VES, EUR: openRates.EUR / openRates.VES, COP: openRates.COP / openRates.VES, Bs: 1 },
      COP: { USD: 1 / openRates.COP, EUR: openRates.EUR / openRates.COP, Bs: openRates.VES / openRates.COP, COP: 1 }
    };

    return {
      BCV: conversions,
      Paralelo: {
        USD: { ...conversions.USD, Bs: parallelRate },
        EUR: { ...conversions.EUR, Bs: parallelRate / openRates.EUR },
        Bs: { USD: 1 / parallelRate, EUR: openRates.EUR / parallelRate, COP: openRates.COP / parallelRate, Bs: 1 },
        COP: { ...conversions.COP, Bs: parallelRate / openRates.COP }
      }
    };
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
}

app.get('/api/exchange-rates', async (req, res) => {
  const exchangeRates = await getExchangeRates();
  if (exchangeRates) {
    res.json(exchangeRates);
  } else {
    res.status(500).send("Error obtaining exchange rates");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






// import dotenv from 'dotenv';
// import express from 'express';
// import axios from 'axios';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Función para obtener datos de Open Exchange Rates para múltiples monedas
// async function getExchangeRates() {
//   try {
//     // Asegúrate de incluir EUR y COP en la lista de símbolos a solicitar
//     const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_KEY}&symbols=VES,EUR,COP`);
//     const rates = response.data.rates;
//     console.log("Exchange rates fetched:", rates);
//     return {
//       Bs: rates.VES,  // Mapeando "VES" a "Bs"
//       EUR: rates.EUR,
//       COP: rates.COP,
//       USD: 1  // Asumiendo que la base es USD y su tasa es 1
//     };
//   } catch (error) {
//     console.error("Error fetching exchange rates:", error);
//     return null;
//   }
// }

// // Ruta para obtener las tasas de cambio necesarias
// app.get('/api/exchange-rates', async (req, res) => {
//   const exchangeRates = await getExchangeRates();
//   if (exchangeRates) {
//     res.json({
//       BCV: exchangeRates
//     });
//   } else {
//     res.status(500).send("Error obtaining exchange rates");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
