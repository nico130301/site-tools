fetch('../../html/utils/productsPageContent.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.productPage').innerHTML = data;
});
