import { productsList } from '../../data/data_products_List.js';
import { products_categories } from '../data/data_products_categories.js';

const observer = new MutationObserver(() => {
  const categoriesGrid = document.querySelector('.productsListCategoriesGrid');
  const text = document.querySelector('.productsListText');

  if (!categoriesGrid || !text) return;

  observer.disconnect();

  const path = window.location.pathname;
  

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

  // Favorite Icon

  const favoriteIcons = document.querySelectorAll('.productFavoriteIcon');

  favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      this.classList.toggle('fa-regular');
      this.classList.toggle('fa-solid');

    this.style.color = this.classList.contains('fa-solid') ? 'red' : 'black';
    });
  });

});

observer.observe(document.body, { childList: true, subtree: true });