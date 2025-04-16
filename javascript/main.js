import {newproducts} from '../data/data_newProducts.js';

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
      <div class="product">
          <div class="productFavoriteContainer">
            <i class="productFavoriteIcon fa-regular fa-heart"></i>
          </div>

          <div class="productImageContainer">
            <img class="productImage" src="${newproduct.image}">
          </div>

          <div class="productName">${newproduct.name}</div>

          <div class="addToCartContainer">
            <div class="addtoCartButtonContainer">
              <button class="addCartButton" data-product-id="${newproduct.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    `;
  });

  document.querySelector('.newProductsGrid').innerHTML = newproductsHTML;

  // FAVORITE BUTTON

  const favoriteIcons = document.querySelectorAll('.productFavoriteIcon');

  favoriteIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      this.classList.toggle('fa-regular');
      this.classList.toggle('fa-solid');

    this.style.color = this.classList.contains('fa-solid') ? 'red' : 'black';
    });
  });
    
  // ADD TO CART BUTTON

  
})
  


