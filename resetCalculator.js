////function para resetear todos los valores 


function resetCalculator() {
  // Restablecer campos de entrada de monto
  document.getElementById('totalAmountToPay').value = '';
  document.querySelectorAll('input[type="number"]').forEach(input => {
      input.value = '';
  });

  // Desmarcar todas las selecciones de moneda
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
  });
 // Desmarcar todas las selecciones de moneda para recibir cambio 
 document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.checked = false;
});


  document.getElementById('currencyToPay').selectedIndex = 0; // Restablecer a la primera opción

  // Limpiar resultados
  document.getElementById('result').innerHTML = '';
  document.getElementById('result2').innerHTML = '';
  document.getElementById("resultUSD").innerHTML = '';
  document.getElementById("resultEUR").innerHTML = '';
  document.getElementById("resultBs").innerHTML = '';
  document.getElementById("resultCOP").innerHTML = '';

  // Aquí puedes agregar cualquier otro campo o elemento que necesites restablecer
}

// Asegúrate de llamar a esta función cuando el botón de reinicio sea clickeado
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('resetButton').addEventListener('click', resetCalculator);
});


window.resetCalculator = resetCalculator;

