////function para resetear todos los valores 
function clearElementsById(ids) {
  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.innerHTML = element.value = '';
  });
}

function applyToAllSelectors(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}

function resetCalculator() {
  // Limpiar campos de entrada y resultados
  clearElementsById(['totalAmountToPay', 'result', 'result2', 'resultUSD', 'resultEUR', 'resultBs', 'resultCOP']);

  // Restablecer campos de entrada numéricos, checkboxes y radios
  applyToAllSelectors('input[type="number"], input[type="checkbox"]', input => {
    if (input.type === 'number') input.value = '';
    else input.checked = false;
  });

  // Restablecer selección de moneda a la primera opción
  document.getElementById('currencyToPay').selectedIndex = 0;
}

// Agregar event listener al botón de reinicio después de cargar el contenido
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('resetButton').addEventListener('click', resetCalculator);
});

// Hacer resetCalculator disponible globalmente
window.resetCalculator = resetCalculator;


