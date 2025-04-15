fetch('../../html/utils/productsListContent.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.productsList').innerHTML = data;
});
