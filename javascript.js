const myLibrary = [];
const addButton = document.querySelector("#add");

addButton.addEventListener("click", addBookToLibrary);

function Book(author, title, pages, genre, year, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.genre = genre;
    this.year = year;
    this.read = read;
}

function addBookToLibrary() {
    let newBook = new Book(prompt("Author?"), prompt("Title?"), prompt("Pages?"), prompt("Genre?"), prompt("Release Date?"), prompt("Read or not?"))
    myLibrary.push(newBook);
}


