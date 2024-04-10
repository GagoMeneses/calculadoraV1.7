



// Tasas de cambio fijas para simplificar. Deberías actualizar estas tasas según sean necesarias.
const exchangeRates = {
  "USD": { 
    "EUR": 0.9811848461734046, 
    "Bs": 38.59, 
    "COP": 4009.1151008218685, 
    "USD": 1 
  },
  "EUR": { 
    "USD": 1.0191759523192536, 
    "Bs": 39.33, 
    "COP": 4085.9937008376282, 
    "EUR": 1 
  },
  "Bs": { 
    "USD": 0.025913449080072554, 
    "EUR": 0.025425883549453344,
    "COP": 103.89000002129744, 
    "Bs": 1 
  },
  "COP": { 
    "USD": 0.00024943160145115314, 
    "EUR": 0.0002447385075006357,
    "Bs": 0.0096255655, 
    "COP": 1 
  }
};


window.exchangeRates = exchangeRates;
