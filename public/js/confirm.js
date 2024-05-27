// script.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ciudad').textContent = localStorage.getItem('ciudad');
    document.getElementById('direccion').textContent = localStorage.getItem('direccion');
    document.getElementById('costo').textContent = `${localStorage.getItem('precioFinal')}`;

    const details = document.querySelector('.details');
    details.style.opacity = '0'; // Iniciar con detalles ocultos
  
    setTimeout(() => {
      details.style.opacity = '1'; // Hacer que aparezcan con fade
    }, 2000); // Después de 2 segundos
  });
  