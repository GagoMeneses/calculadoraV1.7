// Tasas de cambio fijas para simplificar. Deberías actualizar estas tasas según sean necesarias.
const exchangeRates = {
  "USD": { 
    "EUR": 0.9236339454418581, // Actualizado
    "Bs": 36.22740000, // Actualizado
    "COP": 3766.1003769489384, // Actualizado
    "USD": 1 
  },
  "EUR": { 
    "USD": 1.0826799999447931, // Actualizado
    "Bs": 39.22268143, // Actualizado
    "COP": 4077.481555907162, // Actualizado
    "EUR": 1 
  },
  "Bs": { 
    "USD": 0.02760341619878876, // Actualizado
    "EUR": 0.02549545221136096, // Actualizado
    "COP": 103.95723615133679, // Actualizado
    "Bs": 1 
  },
  "COP": { 
    "USD": 0.0002655266455776567, // Actualizado
    "EUR": 0.00024524942327483294, // Actualizado
    "Bs": 0.00961934, // Actualizado
    "COP": 1 
  }
};



window.exchangeRates = exchangeRates;
