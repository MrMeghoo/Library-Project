var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    centeredSlides: false,
    spaceBetween: 30,
    slidesPerGroup: 5,
    
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
})


// This fetchs book covers for the carousels 
function bookCover(elementID, index) {
  fetch("http://localhost:3000/library")
  .then((response) => response.json())
  .then((data) => {

    let bookIMG = document.getElementById(elementID);
    let book = document.createElement('img');

    book.src = data[index].image;

    bookIMG.appendChild(book);
      
  })
    
}

// This loads a random quote for the quotes section on main page
function loadQuotes() {
  fetch("http://localhost:3000/quotes")
  .then((response) => response.json())
  .then((data) => {

    let index = Math.floor(Math.random() * data.length);
    let quoteContainer = document.getElementById('quotes');
    let quote;
    let author;
    
    quote = data[index].quote;
    author = data[index].author;

    quoteContainer.innerText = quote + "  - " + author;
  }
)}





