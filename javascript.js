const myLibrary = [];
const addButton = document.querySelector("#add");
const bookHolder = document.querySelector(".books");
const dialogBox = document.querySelector("dialog");

addButton.addEventListener("click", addBookToLibrary);

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    dialogBox.showModal();
    // let newBook = new Book(prompt("Author?"), prompt("Title?"), prompt("Pages?"), prompt("Read or not?"));
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    bookHolder.replaceChildren();
    myLibrary.forEach((book) => {
        let displayedBook = document.createElement("div");
        displayedBook.classList.add("book");
        bookHolder.appendChild(displayedBook);

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        bookInfo.innerText = `Author: ${book.author}\nTitle: ${book.title}\nPages: ${book.pages}\nRead: ${book.read}`;
        displayedBook.appendChild(bookInfo);
    })
}


