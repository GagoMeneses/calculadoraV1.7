// Archivo: usdPvefRate.js
import fs from 'fs/promises';

async function loadUSDPVEF() {
    const rawData = await fs.readFile('./public/parallelExchangeRate.json', 'utf8');
    const exchangeRate = JSON.parse(rawData);
    return exchangeRate.USDPVEF;
}

let usdPvefRate = await loadUSDPVEF(); // Carga la tasa y guarda en una variable.

export { usdPvefRate };

console.log(usdPvefRate);
