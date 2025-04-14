import {products_categories} from '../data/data_products_categories.js';


document.addEventListener('DOMContentLoaded', function() {
  let categoriesHTML = '';

  products_categories.forEach((category) => {
    categoriesHTML += `
      <div class="category">

        <div class="categoryImageContainer">
          <img class="categoryImage"
            src="${category.image}">
        </div>

        

        <div class="categoryName">
          ${category.name}
        </div>

        
        
      </div>
    `;
  });
  
  document.querySelector('.categoriesGrid').innerHTML = categoriesHTML;

})