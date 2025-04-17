document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.querySelector('.cartContainer');

  function renderCart() {
    container.innerHTML = '';

    if (cart.length === 0) {
      container.innerHTML = '<div class="emptyCart">Your cart is empty.</div>';
    } else {
      cart.forEach(item => {
        let itemDiv = ``;
        itemDiv= `
          <div class="cartItem">
            <img class"itemImage src="${item.image}" />
            <div class="itemDetails">
              <div class="itemName"> ${item.name}</div>
              <div class="itemQuantity"> Quantity: ${item.quantity}</div>
              <button class="deleteItem">Delete Item</button>
            </div>
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

    if (window.updateCartCount) {
      window.updateCartCount();
    }
  }
    renderCart();
  
});