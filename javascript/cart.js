document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.querySelector('.cartContainer');

  function renderCart() {
    container.innerHTML = '';

    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach(item => {
        let itemDiv = ``;
        itemDiv= `
          <div class="cartItem">
            <img src="${item.image}" width="100"/>
            <p><strong>${item.name}</strong></p>
            <p>Quantity: ${item.quantity}</p>
            <button class="deleteItem">Delete Item</button>
          </div>
        `;
        container.innerHTML += itemDiv;
      });
    }

    document.querySelectorAll('.deleteItem').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }
    renderCart();
  
});