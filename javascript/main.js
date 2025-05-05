import {newproducts} from '../data/data_newProducts.js';
import { productClicked} from './productsList.js';

document.addEventListener('DOMContentLoaded', function() {

  // SLIDESHOW
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let slideIndex = 0;
  showSlide(slideIndex);
  
  prev.addEventListener("click", function() {
    plusSlides(-1);
  });

  next.addEventListener("click", function() {
    plusSlides(1);
  });

  function showSlide(index) {
    const slides = document.getElementsByClassName("slide");
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
  
    for (let slide of slides) {
      slide.style.display = "none";
    }
  
    slides[slideIndex].style.display = "block";
  }
  
  function plusSlides(n) {
    slideIndex += n;
    showSlide(slideIndex);
  }

  setInterval(() => {
    plusSlides(1);
  }, 3000);


  // NEW PRODUCTS SETUP


  let newproductsHTML = '';

  newproducts.forEach((newproduct) => {
    newproductsHTML += `
      <div class="product" id= "${newproduct.id}" onclick="location.href='../../html/productPage/product1.html'">
          <div class="productFavoriteContainer">
            <i class="productFavoriteIcon fa-regular fa-heart"></i>
          </div>

          <div class="productImageContainer">
            <img class="productImage" src="${newproduct.image}">
          </div>

          <div class="productName">${newproduct.name}</div>

          <div class="addToCartContainer">
            <div class="addtoCartButtonContainer">
              <button class="addCartButton" data-name="${newproduct.name}" data-image="${newproduct.image}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    `;
  });

  document.querySelector('.newProductsGrid').innerHTML = newproductsHTML;

  document.querySelector('.newProductsGrid').addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
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
})
  


