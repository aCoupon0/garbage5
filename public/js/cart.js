document.addEventListener('DOMContentLoaded', () => {
    function capitalizeWords(sentence) {
        if (!sentence) return sentence; // Retorna la cadena original si es falsy (vacía, null, undefined, etc.)
        return sentence.split(' ').map(word =>
            word[0].toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    const cartContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    function displayCart() {
        let total = 0;
        cartContainer.innerHTML = ''; // Limpia el contenedor antes de añadir elementos actualizados
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
    <div class="title-zona">
        <p class="title">${item.name} - ${capitalizeWords(item.color)}</p>
    </div>
    <div class="talla-zona">
        ${item.size.bra !== '0' ? `<p class="talla">${item.size.bra}</p><p class="concepto">Brasier</p>` : ''}
        ${item.size.panties !== '0' ? `<p class="talla">${item.size.panties}</p><p class="concepto">${item.name.startsWith('Pijama') ? 'Pijama' : 'Panty'}</p>` : ''}
    </div>
    <div class="quantity-control">
        <p class="price">${item.price.toLocaleString('de-DE')}</p>
        <div class="quantity-zona">
            <button onclick="updateQuantity(${index}, ${item.quantity - 1})">
                ${item.quantity > 1 ? '-' : '<i class="fa fa-trash"></i>'}
            </button>
            <div class="quantity">${item.quantity}</div>
            <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
        </div>
    </div>
`;
            cartContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = total.toLocaleString('de-DE');
        document.getElementById('confirmButton').style.opacity = cart.length > 0 ? '1' : '0.2';
    }

    window.updateQuantity = function (index, newQuantity) {
        if (newQuantity < 1) {
            cart.splice(index, 1); // Elimina el producto si la cantidad es menor que 1
        } else {
            cart[index].quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); // Actualiza la visualización del carrito
    }

    const confirmButton = document.getElementById('confirmButton');

    confirmButton.addEventListener('click', function () {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            // Guarda el total del precio en localStorage
            localStorage.setItem('totalPrice', totalPriceElement.textContent);
            window.location.href = '/formulario'; // Redirecciona a la página de formulario
        } else {
            alert('Por favor, añade al menos un producto antes de continuar.');
        }
    });

    displayCart();
});