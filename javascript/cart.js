document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.querySelector('.cartContainer');

  function renderCart() {
    container.innerHTML = ''; // Clear previous render

    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
          <img src="${item.image}" width="100" alt="${item.name}" />
          <p><strong>${item.name}</strong></p>
          <p>Quantity: ${item.quantity}</p>
          <button class="deleteItem">Delete Item</button>
          <hr>
        `;
        container.appendChild(itemDiv);
      });
    }

    document.querySelectorAll('.deleteItem').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        cart.splice(index, 1); // Remove item at index
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Re-render cart
      });
    });
  }
    renderCart();
  
});