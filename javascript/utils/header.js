fetch('../../html/utils/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header').innerHTML = data;
});


document.addEventListener('DOMContentLoaded', () => {

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cartQuantity').textContent = totalQuantity;
  }

  // Initialize cart count on page load
  updateCartCount();
  
});