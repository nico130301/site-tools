import { productsList } from '../../data/data_products_List.js';
import { products_categories } from '../data/data_products_categories.js';
import { productClicked} from './productsList.js';

const observer = new MutationObserver(() => {

  const categoriesGrid = document.querySelector('.productsListCategoriesGrid');

  if (!categoriesGrid) return;
  observer.disconnect();

  // Categories List

  let categoriesListHTML = '';
  products_categories.forEach((categoryList) => {
    categoriesListHTML += `
      <div class="category" onclick="location.href='../../html/productsList/${categoryList.id}.html'">
        <div class="categoryName">
          > ${categoryList.name} (${categoryList.count})
        </div>
      </div>
    `;
  });

  categoriesGrid.innerHTML = categoriesListHTML;
  //searched items

  const grid = document.querySelector('.searchedProductsContent');
  const searchedNumber = document.querySelector('.searchedProductsNumber');
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search').toLowerCase();
  let numberOfProudcts = 0;
  let productsListHTML = '';
  productsList.forEach((productList) => {
    if (productList.name.toLowerCase().includes(search)) {
      numberOfProudcts++;
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


  // NUMBER OF SEARCHED BUTTONS

  if (numberOfProudcts === 0 )
    searchedNumber.innerHTML = `nu au fost gasite rezultate pentru : `;
  if (numberOfProudcts === 1 )
    searchedNumber.innerHTML = `${numberOfProudcts} rezultat gasit pentru : `;
  if (numberOfProudcts > 1 )
    searchedNumber.innerHTML = `${numberOfProudcts} rezultate gasite pentru : `;

  grid.addEventListener('click', (event) => {
    const productElement = event.target.closest('.product');
    if (productElement) {
        const productId = productElement.getAttribute('id');
        console.log('Product clicked:', productId);
        productClicked.id = productId;
        localStorage.setItem('productClicked', JSON.stringify(productClicked));
    }
  });

    // FAVORITE BUTTON

    const favoriteIcons = document.querySelectorAll('.relatedProductFavoriteIcon');

    favoriteIcons.forEach(icon => {
      icon.addEventListener('click', function () {
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
    button.addEventListener('click', function () {

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