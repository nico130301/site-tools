let slideIndex = 0;

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