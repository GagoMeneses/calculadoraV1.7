import('node-fetch').then(({ default: fetch }) => {
  // La URL para la API de ParallelRate
  const url = 'https://www.parallelrate.org/api/currentprice?currency=USDPVEF';

  fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log('Datos recibidos de ParallelRate:', data);

          // Aquí puedes manejar los datos recibidos, por ejemplo, actualizar una variable global
          // o guardar los datos en el estado de tu aplicación para ser usados donde sea necesario.
      })
      .catch(error => console.error('Error al obtener los datos de ParallelRate:', error));
});

