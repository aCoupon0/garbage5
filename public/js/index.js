document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const categories = document.querySelectorAll('.category');
    const productDuos = document.querySelectorAll('.product-duos');
    const productPijama = document.querySelectorAll('.product-pijama');
    const categoryTitles = document.querySelectorAll('.category-title');

    // Función para cambiar la visualización de las secciones
    function updateDisplay(selectedCategory) {
        if (selectedCategory === 'ropa-intima') {
            productDuos.forEach(duo => duo.style.display = 'flex');
            productPijama.forEach(pijama => pijama.style.display = 'none');
            categoryTitles.forEach(title => title.style.display = 'flex'); // Muestra los títulos de categorías
        } else if (selectedCategory === 'pijamas') {
            productDuos.forEach(duo => duo.style.display = 'none');
            productPijama.forEach(pijama => pijama.style.display = 'flex');
            categoryTitles.forEach(title => title.style.display = 'none'); // Oculta los títulos de categorías
        }
    }

    // Eventos para seleccionar categoría
    categories.forEach(category => {
        category.addEventListener('click', function () {
            // Quitar selección actual
            categories.forEach(c => c.classList.remove('selected'));
            // Marcar categoría seleccionada
            this.classList.add('selected');
            // Actualizar la visualización de secciones
            updateDisplay(this.getAttribute('data-category'));
        });
    });

    // Carga inicial de productos
    updateDisplay('ropa-intima'); // Establece la categoría inicial predeterminada y su visualización

    // Restaurar la posición de desplazamiento al cargar la página
    if (localStorage.getItem('scrollPosition') !== null) {
        window.scrollTo(0, parseInt(localStorage.getItem('scrollPosition')));
    }
});

// Guardar la posición de desplazamiento antes de abandonar la página
window.onbeforeunload = function() {
    localStorage.setItem('scrollPosition', window.scrollY);
};
