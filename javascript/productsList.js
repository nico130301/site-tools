import { productsList } from '../../data/data_products_List.js';
import { products_categories } from '../data/data_products_categories.js';

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
        <div class="product">
          <div class="productFavoriteContainer">
            <img class="productFavoriteIcon" src="../../images/product_heart.png" alt="favorite">
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
});

observer.observe(document.body, { childList: true, subtree: true });