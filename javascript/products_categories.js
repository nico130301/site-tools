import {products_categories} from '../data/data_products_categories.js';


document.addEventListener('DOMContentLoaded', function() {
  let categoriesHTML = '';

  products_categories.forEach((category) => {
    categoriesHTML += `
      <div class="category" onclick="location.href='../../html/productsList/${category.id}.html'">

        <div class="categoryImageContainer">
          <img class="categoryImage"
            src="${category.image}">
        </div>

        
        <div class="categoryDescription">
          <div class="categoryName">
            ${category.name}
            <span class="categoryIcon">></span>
          </div>

          <div class="categoryCount">
            ${category.count} products
          </div>
        </div>
      </div>
    `;
  });
  
  document.querySelector('.categoriesGrid').innerHTML = categoriesHTML;

})