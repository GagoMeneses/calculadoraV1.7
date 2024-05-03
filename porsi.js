// Asumiendo que exchangeRates.json está accesible públicamente en la carpeta 'public'
const loadExchangeRates = async () => {
  try {
    const response = await fetch('./public/exchangeRates.json'); // Ajusta la ruta según sea necesario
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const exchangeRates = await response.json();

    const exchangeSources = {
      BCV: exchangeRates.BCV,

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

    console.log(exchangeSources); // Verifica que la actualización es correcta
  } catch (error) {
    console.error('Failed to load exchange rates:', error);
  }
};

loadExchangeRates();
