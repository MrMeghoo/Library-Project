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


// This fetchs book covers for the trendingcarousels 
function trending(elementID, index) {
  fetch("http://localhost:3000/library/trending")
  .then((response) => response.json())
  .then((data) => {
    let bookIMG = document.getElementById(elementID);
    let book = document.createElement('img');
    book.src = data[index].image;
    bookIMG.appendChild(book);   
  })   
}
// This fetchs book covers for the staff picks carousels 
function staffPicks(elementID, index) {
  fetch("http://localhost:3000/library/staffPick")
  .then((response) => response.json())
  .then((data) => {
    
    let bookIMG = document.getElementById(elementID);
    let book = document.createElement('img');
    book.src = data[index].image;
    bookIMG.appendChild(book);   
  })   
}

// pages.html to assign individual book 
function soloBook(elementID, index) {
  fetch("http://localhost:3000/library")
  .then((response) => response.json())
  .then((data) => {
    console.log(data[index].image)
    let cover = document.getElementById(elementID);
    let bookIMG = document.createElement('img');

    bookIMG.src = data[index].image;
    cover.appendChild(bookIMG); 
    
    
    let book = document.getElementById('bookTitle');
    let author = document.getElementById('bookAuthor');
    let year = document.getElementById('year')
    let availability = document.getElementById('availability')

    let bookTitle = data[index].name;
    let bookAuthor = "By: " + data[index].author;
    let bookYear = "Published: " + data[index].yearpublished;
    let available = "In Stock";
    let notAvailable = "Checked Out";

        book.innerText = bookTitle;
        author.innerText = bookAuthor;
        year.innerText = bookYear;
        console.log(data[index].checkedout)


    if(data[index].checkedout == false) {
        availability.innerText = available;
        availability.style.color = 'green';
        console.log("test false")
    } else {
      availability.innerText = notAvailable;
      availability.style.color = 'red';
      console.log("test true")
    }
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

function displaySelect(){
  //add event listner to listen for which book is clicked 
  //then navigate to pages.html
  //display the clicked book details on this page.
  //page should be blank until a book is clicked
  const displayedBook = document.querySelector('#displayBook');

  displayedBook.addEventListener('click', function() {
    window.location.href = "/Users/gabrielestrada/Code/Library-Project/Library-frontend/pages.html"
  })
}

//onclick="location.href='login.html';"


