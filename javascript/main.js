

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


  // NEW PRODUCTS SETUP


  let newproductsHTML = '';

  newproducts.forEach((newproduct) => {
    newproductsHTML += `
      <div class="product">

        <div class="productFavoriteContainer">
          <img class="productFavoriteIcon" src="../images/product_heart.png" alt="favorite">
        </div>

        <div class="productImageContainer">
          <img class="productImage"
            src="${newproduct.image}">
        </div>

        

        <div class="productName">
          ${newproduct.name}
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
            <button class="addCartButton" data-product-id="${newproduct.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.newProductsGrid').innerHTML = newproductsHTML;

    
})
  


