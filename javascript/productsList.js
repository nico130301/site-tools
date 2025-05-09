import { productsList } from '../../data/data_products_List.js';
import { products_categories } from '../data/data_products_categories.js';
export let productClicked = {
  id: "",
  image: "",
  name: "",
  favorite: false,
  count: 0,
  keywords: []
};

window.productClicked = productClicked;

const observer = new MutationObserver(() => {
  const grid = document.querySelector('.productsListGrid');
  const categoriesGrid = document.querySelector('.productsListCategoriesGrid');
  const text = document.querySelector('.productsListText');

  if (!grid || !categoriesGrid || !text) return;

  observer.disconnect();

  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1).split('.')[0];

 

  let productsListHTML = '';
  productsList.forEach((productList) => {
    if (productList.type === fileName) {
      productsListHTML += `
        <div class="product" id="${productList.id}" onclick="location.href='../../html/productPage/product1.html'">
          <div class="productFavoriteContainer">
            <i class="productFavoriteIcon fa-regular fa-heart"></i>
          </div>

          <div class="productImageContainer">
            <img class="productImage" src="${productList.image}">
          </div>

          <div class="productName">${productList.name}</div>

          <div class="addToCartContainer">
            <div class="addtoCartButtonContainer">
              <button class="addCartButton" data-product-id="${productList.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    }
  });
  grid.innerHTML = productsListHTML;

  grid.addEventListener('click', (event) => {
    const productElement = event.target.closest('.product');
    if (productElement) {
        const productId = productElement.getAttribute('id');
        console.log('Product clicked:', productId);
        productClicked.id = productId;
        localStorage.setItem('productClicked', JSON.stringify(productClicked));
    }
  });


  // Categories List
  let d = '';
  let categoriesListHTML = '';
  products_categories.forEach((categoryList) => {
    categoriesListHTML += `
      <div class="category" onclick="location.href='../../html/productsList/${categoryList.id}.html'">
        <div class="categoryName">
          > ${categoryList.name} (${categoryList.count})
        </div>
      </div>
    `;
    if (categoryList.id === fileName) {
      d = categoryList.name;
    }
  });

  categoriesGrid.innerHTML = categoriesListHTML;
  text.innerHTML = d;

  // FAVORITE BUTTON

  const favoriteIcons = document.querySelectorAll('.productFavoriteIcon');
  
  favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function (event) {
      event.stopPropagation();
      this.classList.toggle('fa-regular');
      this.classList.toggle('fa-solid');

    this.style.color = this.classList.contains('fa-solid') ? 'red' : 'black';
    });
  });

  // ADD TO CART BUTTON

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cartQuantity').textContent = totalQuantity;
  }

  const buttons = document.querySelectorAll('.addCartButton');
  buttons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const name = button.dataset.name;
      const image = button.dataset.image;
      
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, image, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log(cart);

      updateCartCount();

      button.textContent = 'Added to Cart!';
      button.disabled = true;
      button.classList.add('addedCartButton');

      setTimeout(() => {
        button.disabled = false;
        button.classList.remove('addedCartButton');
        button.textContent = 'Add to Cart';
      }, 1000);

    });
  });

});

observer.observe(document.body, { childList: true, subtree: true });