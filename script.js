// Retrieve Elements
var bookname = document.getElementById("bookname");
var author = document.getElementById("author");
var pages = document.getElementById("page-num");
var rating = document.getElementById("rating");
var tbody = document.getElementById("tbody-one");
var dialog = document.getElementById("dialog");
var newBook = document.getElementById("new");
var close = document.getElementById("close");


// Array to store Objects
const myLibrary = [];

// Book Object Constructor Function
function Book(name, author, pagenum, status, rating) {
  this.title = name;
  this.author = author;
  this.pages = pagenum;
  this.status = status;
  this.rating = rating;
}

// This function adds a row  to the table when the add button is clicked
// The function calls the addContent function which retrieves the values of the form input elements and assigns them to the rows' td textContent attribute
function addRow() { 
  var row = tbody.insertRow();

  for (let i = 0; i <= 5; i++) {
    row.insertCell();
    row.cells[i].classList.add("td");
  }
  addContent();
}

// This function adds content to the td tags of the dynamically created row elements
// The values added are that of the form input tags that were retrieved
function addContent() {
  var tars = tbody.children;
  var counter = 0;
  for (let i = 0; i < tars.length; i++) {
    var tds = tars[i].children;
    for (let j = 0; j < (tds.length - 1); j++) {
      var valArr = Object.values(myLibrary[counter]);
      tds[j].textContent = valArr[j];
    }
    counter++;
  }
}

// Function to create a new book Object and add it to the myLibrary Array
function addBookToList(bname, auth, pagenum, status, rate) {
  var book = new Book(
    bname.value,
    auth.value,
    pagenum.value,
    status.value,
    rate.value
  );
  myLibrary.push(book);
}

// Function to dynamically create a delete button
function addButton() {
  var btn = document.createElement("button");
  btn.textContent = "DELETE";
  btn.classList.add("btn");
  var rws = tbody.rows;
  var size = rws.length;
  for(let i = 0; i < size; i++){
    var cel = rws[i].cells[rws[i].cells.length - 1];
    cel.appendChild(btn);
  }
}

// Function to delete a row
function del(){
  var dbtns = document.getElementsByClassName("btn");
  Array.from(dbtns).forEach(function(button, index){
      button.addEventListener("click", function(){
        var rem = button.parentNode.parentNode;
        tbody.removeChild(rem);
        myLibrary.splice(index, 1);
      });
  });
}

// Event listener to open up the modal
newBook.addEventListener("click", function () {
  dialog.classList.add("effect");
  dialog.showModal();
});

// Handler to close modal
close.addEventListener("click", function () {
  dialog.close();
});

// Handler for the 'ADD' button which adds the data to the current book object and also add a new row containing that data
submit.addEventListener("click", function() {
  var rstatus = document.querySelector('input[name="read"]:checked');
  addBookToList(bookname, author, pages, rating, rstatus);
  addRow();
  addButton();
  del();
  dialog.close();
});

