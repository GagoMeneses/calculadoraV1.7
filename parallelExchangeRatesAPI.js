import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// La URL para la API de ParallelRate
const url = 'https://www.parallelrate.org/api/currentprice?currency=USDPVEF';

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('Datos recibidos de ParallelRate:', data);
        
        // Especifica la ruta del archivo donde se guardarán los datos
        const filePath = path.join(process.cwd(), 'public', 'parallelExchangeRate.json');
        
        // Convertir los datos a formato JSON
        const dataString = JSON.stringify(data, null, 2);
        
        // Escribir los datos en un archivo en la carpeta 'public'
        fs.writeFile(filePath, dataString, (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
            } else {
                console.log('Datos guardados en:', filePath);
            }
        });
    })
    .catch(error => console.error('Error al obtener los datos de ParallelRate:', error));
