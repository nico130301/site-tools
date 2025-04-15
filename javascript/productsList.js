import {productsList} from '../../data/data_products_List.js';
import {products_categories} from '../data/data_products_categories.js';

document.addEventListener('DOMContentLoaded', function() {

  let productsListHTML = '';
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1).split('.')[0]; 

  productsList.forEach((productList) => {
    if(productList.type === fileName) {
      productsListHTML += `
        <div class="product">
          <div class="productFavoriteContainer">
            <img class="productFavoriteIcon" src="../../images/product_heart.png" alt="favorite">
          </div>

          <div class="productImageContainer">
            <img class="productImage"
              src="${productList.image}">
          </div>

          

          <div class="productName">
            ${productList.name}
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
              <button class="addCartButton" data-product-id="${productList.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    }
  });

  document.querySelector('.productsListGrid').innerHTML = productsListHTML;
  
  
  let categoriesHTML = '';

  products_categories.forEach((category) => {
    categoriesHTML += `
      <div class="category" onclick="location.href='../../html/productsList/${category.id}.html'">
        
          <div class="categoryName">
            ${category.name}
          </div>
      </div>
    `;
  });
  
  document.querySelector('.productsListCategoriesGrid').innerHTML = categoriesHTML;
    
})
    