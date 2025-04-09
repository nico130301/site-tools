import {products} from '../data/data_products.js';


document.addEventListener('DOMContentLoaded', function() {
  let productsHTML = '';

    products.forEach((product) => {
      productsHTML += `
        <div class="product">

          <div class="productFavoriteContainer">
            <img class="productFavoriteIcon" src="../images/product_heart.png" alt="favorite">
          </div>

          <div class="productImageContainer">
            <img class="productImage"
              src="${product.image}">
          </div>

          

          <div class="productName">
            ${product.name}
          </div>

          
          <div class="addToCartContainer">
            <div class="quantityContainer">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div class="addtoCartButtonContainer">
              <button class="addCartButton" data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    });
    
  document.querySelector('.productsPageGrid').innerHTML = productsHTML;

})