function submitBooks(){
  console.log("inside submit books")
  //  document.addEventListener('DOMContentLoaded', function () {
  //   document.getElementById("bookForm").addEventListener('submit',function(event){
  //   event.preventDefault();

    const formData = {
      name: document.getElementById("name"),
      author: document.getElementById("author"),
      yearpublished: document.getElementById("yearpublished"),
      genre: document.getElementById("genre")
    }

    console.log("formData: ", formData)

    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(function(response){
      if(response.ok){
        throw new Error("Network was not ok")
      }
      return response.json()
    })
    .then(function(data){
      console.log(data)
      //sends an alert to the page for success
          alert('Book added successfully!');
    })
    .catch(function(error){
      console.error('There was a problem with your fetch operation:', error);
      //sends an alert to the page for error
      alert('Failed to add book. Please try again.');
    })
//   })

//   })
  }





// var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 5,
//     centeredSlides: false,
//     spaceBetween: 30,
//     slidesPerGroup: 5,
    
//     pagination: {
//       el: ".swiper-pagination",
//       type: "fraction",
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
// })


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

//Form js code for Request Book page

// document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById('bookForm').addEventListener('submit', function(event) {
//      //preventDefault basically prevents default form functionality otherwise a new page would have been needed
//     event.preventDefault(); 
      
      
//       var formData = {
//           name: document.getElementById('name').value,
//           author: document.getElementById('author').value,
//           yearPublished: document.getElementById('yearPublished').value,
//           genre: document.getElementById('genre').value,
//           checkedOut: document.getElementById('checkedOut').value,
//           image: document.getElementById('image').value
//       };

//       console.log(formData)
      
//       //uses the books post to post from to bookInventory Database
//       fetch('/books', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData)
//       })
//       .then(function(response) {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .then(function(data) {
          
//           console.log(data);
//           //sends an alert to the page for success
//           alert('Book added successfully!');
//       })
//       .catch(function(error) {
          
//           console.error('There was a problem with your fetch operation:', error);
//           //sends an alert to the page for error
//           alert('Failed to add book. Please try again.');
//       });
//   });
// });




function getBooks(){
  fetch("http://localhost:3000/books")
  .then((response)=> response.json())
  .then((data)=>{
    console.log(data)
    for(let i=0; i < data.length; i++){
      let book = data[i]
      let detailedContainer = document.createElement("div");
      detailedContainer.classList.add("card")

      let bookImage = document.createElement("img");
      bookImage.src = book.image
      bookImage.alt = book.name

      let authortag = document.createElement("p");
      authortag.innerText = book.author

      let booktag = document.createElement("p")
      booktag.innerText = book.name

      let publishedtag = document.createElement("p")
      publishedtag.innerText = book.yearpublished

      let genretag = document.createElement("p")
      //join() method basically takes all the genre from the resonse. and joins them into a string
      genretag.innerText = book.genre.join(", ")

      detailedContainer.appendChild(bookImage);
      detailedContainer.appendChild(authortag);
      detailedContainer.appendChild(booktag)
      detailedContainer.appendChild(publishedtag)
      detailedContainer.appendChild(genretag)
      document.getElementById("theBooks").appendChild(detailedContainer)
    }
  })
  .catch(error => {
    console.error("Error fetching book data", error)
  })
}


