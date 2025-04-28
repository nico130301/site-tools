import { productsList } from '../data/data_products_List.js';
import { products_categories } from '../data/data_products_categories.js';

const observer = new MutationObserver(() => {
  const categoriesGrid = document.querySelector('.productsListCategoriesGrid');
  const text = document.querySelector('.productPageText');

  if (!categoriesGrid || !text) return;

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

});

observer.observe(document.body, { childList: true, subtree: true });