fetch('../../html/utils/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header').innerHTML = data;

    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (document.querySelector('.cartQuantity'))
        document.querySelector('.cartQuantity').textContent = totalQuantity;
    }

    window.updateCartCount = updateCartCount;
    
    // Call updateCartCount immediately after inserting the header
    updateCartCount();

    // Ensure it also updates when DOMContentLoaded fires
    document.addEventListener('DOMContentLoaded', updateCartCount);
  });