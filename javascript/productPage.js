import { productsList } from '../data/data_products_List.js';
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


  // Product Page
  
  let pageContent = document.querySelector('.productPageDetails');
  let pageSpecs = document.querySelector('.productPageSpecs');
  let relatedProducts = document.querySelector('.relatedProducts');
  const storedProductClicked = JSON.parse(localStorage.getItem('productClicked')) || {};
  Object.assign(productClicked, storedProductClicked);
  productsList.forEach((product) => {
    if (product.id === productClicked.id){
      pageContent.innerHTML = `
        <div class="history">
            <a class = "historyStep"  onclick="location.href='/html/products_categories.html'">Categories</a>/
            <a class = "historyStep"  onclick="location.href='/html/productsList/${product.type}.html'">${product.type}</a>/
            <a class = "historyProduct">${product.name}</a>
        </div>
        <div class="productPageMainDetails">
          <div class="productImageContainer">
            <img class="productImage" src="${product.image}">
          </div>
          <div class="productInfoContainer">
            <div class="productId">${product.idNumber}</div>
            <div class="productName">${product.name}</div>
            <div class="productDescription">${product.description}</div>
            <div class="addToCartContainerProduct">
              <div class="addtoCartButtonContainer">
                <button class="addCartButton" data-name="${product.name}" data-image="${product.image}">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>  
        </div>
      `;

      pageSpecs.innerHTML = `
        <div class="specsTitle">Specificatii</div>
        <table class="specsTable">
          <tr class="specContainer"  style="background-color:rgb(235, 235, 235)">
            <th class="specTitle">${product.spec1Title}</th>
            <td class="spec">${product.spec1}</td>
          </tr>
          <tr class="specContainer">
            <th class="specTitle">${product.spec2Title}</th>
            <td class="spec">${product.spec2}</td>
          </tr> 
          <tr class="specContainer" style="background-color:rgb(235, 235, 235)">
            <th class="specTitle">${product.spec3Title}</th>
            <td class="spec">${product.spec3}</td>
          </tr>
          <tr class="specContainer">
            <th class="specTitle">${product.spec4Title}</th>
            <td class="spec">${product.spec4}</td>
          </tr>
          <tr class="specContainer" style="background-color:rgb(235, 235, 235)">
            <th class="specTitle">${product.spec5Title}</th>
            <td class="spec">${product.spec5}</td>
          </tr>
        </table>
      `;

      product.related.forEach((relatedId) => {
        productsList.forEach((relatedCheck) => {
          if (relatedCheck.id === relatedId) {
            relatedProducts.innerHTML += `
              <div class="relatedProduct" id="${relatedCheck.id}"onclick="location.href='../../html/productPage/product1.html'">
                  <div class="relatedProductFavoriteContainer">
                    <i class="relatedProductFavoriteIcon fa-regular fa-heart"></i>
                  </div>
        
                  <div class="relatedProductImageContainer">
                    <img class="relatedProductImage" src="${relatedCheck.image}">
                  </div>
        
                  <div class="relatedProductName">${relatedCheck.name}</div>
        
                  <div class="addToCartContainer">
                    <div class="addtoCartButtonContainer">
                      <button class="addCartButton" data-name="${relatedCheck.name}" data-image="${relatedCheck.image}">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
            `;
          }
          });
      });
    } 
  });

  relatedProducts.addEventListener('click', (event) => {
    const productElement = event.target.closest('.relatedProduct');
    if (productElement) {
        const productId = productElement.getAttribute('id');
        console.log('Product clicked:', productId);
        productClicked.id = productId;
        localStorage.setItem('productClicked', JSON.stringify(productClicked));
    }
  });

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