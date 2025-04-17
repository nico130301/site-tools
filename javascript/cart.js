document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.querySelector('.cartContainer');
  const form = document.querySelector(".form");

  function renderCart() {
    container.innerHTML = '';
    if (cart.length === 0) {
      container.innerHTML = '<div class="emptyCart">Your cart is empty.</div>';
    } else {
      cart.forEach((item,index) => {
        let itemDiv = ``;
        itemDiv= `
          <div class="cartItem">
            <div class="itemImageContainer">
              <img class="itemImage" src="${item.image}" />
            </div>

            <div class="itemName"> ${item.name}</div>
            <div class="quantityContainer">
              <div class="removeQuantity" data-index=${index}>&ndash;</div>
              <div class="itemQuantity">${item.quantity}</div>
              <div class="addQuantity" data-index=${index}>+</div>
            </div>
            <div class="deleteItem">
              <button class="deleteButton">x</button>
            </div>

          </div>
        `;
        container.innerHTML += itemDiv;
      });
    }

    function collectCartInfoForForm() {

      let cartData = "";

      cart.forEach(item => {
        cartData += `${item.name} - Quantity: ${item.quantity}\n`;
      });
      document.querySelector(".cartDetails").value = cartData;
    }

    form.addEventListener("submit", function (e) {
      collectCartInfoForForm();
    });


    document.querySelectorAll('.deleteItem').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.addQuantity').forEach(add => {
      add.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.removeQuantity').forEach(remove => {
      remove.addEventListener('click', () => {
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) 
          cart[index].quantity--; 
        else
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