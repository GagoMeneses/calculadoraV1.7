const exchangeSources = {

  // Cambio al Banco Central de Venezuela
  BCV: {
    "USD": { 
      "EUR": 0.92363395,
      "Bs": 36.2274,
      "COP": 3766.10037694894,
      "USD": 1 
    },
    "EUR": { 
      "USD": 1.08268000,
      "Bs": 39.22268143,
      "COP": 4077.48155591,
      "EUR": 1 
    },
    "Bs": { 
      "USD": 0.0276034161987888,
      "EUR": 0.02549545, 
      "COP": 103.957236151337,
      "Bs": 1 
    },
    "COP": { 
      "USD": 0.000265526645577657,
      "EUR": 0.00024525,
      "Bs": 0.00961934,
      "COP": 1 
    }
  },

//Cambio al paralelo

  Paralelo: {
    "USD": { 
      "EUR": 0.92363395,
      "Bs": 38.86,
      "COP": 3768.10,
      "USD": 1 
    },
    "EUR": { 
      "USD": 1.0826800, 
      "Bs": 42.07294480,
      "COP": 4079.64650800, 
      "EUR": 1 
    },
    "Bs": { 
      "USD": 0.0257334019557385, 
      "EUR": 0.02376824, 
      "COP": 96.9660317712306, 
      "Bs": 1 
    },
    "COP": { 
      "USD": 0.00026539, 
      "EUR": 0.00024512, 
      "Bs": 0.0103128898,
      "COP": 1 
    }
  },

  // Cambio tomando como referencia la página de dolar today
  DolarToday: {
    "USD": { 
      "EUR": 0.92363395,
      "Bs": 38.86,
      "COP": 3768.10,
      "USD": 1 
    },
    "EUR": { 
      "USD": 1.0826800, 
      "Bs": 42.07294480,
      "COP": 4079.64650800, 
      "EUR": 1 
    },
    "Bs": { 
      "USD": 0.0257334019557385, 
      "EUR": 0.02376824, 
      "COP": 96.9660317712306, 
      "Bs": 1 
    },
    "COP": { 
      "USD": 0.00026539, 
      "EUR": 0.00024512, 
      "Bs": 0.0103128898,
      "COP": 1 
    }
  }
};

window.exchangeSources = exchangeSources;
