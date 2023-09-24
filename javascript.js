const myLibrary = [];
const addButton = document.querySelector(".add-book");
const bookHolder = document.querySelector(".books");
const dialogBox = document.querySelector("dialog");
const closeButton = document.querySelector(".modal-close");
const submitButton = document.querySelector("#submit-book");

addButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
submitButton.addEventListener("click", addBookToLibrary);

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pageInput = document.querySelector("#pages");

    if (titleInput.value !== "" && authorInput.value !== "" && pageInput.value !== "") {
        let newBook = new Book(authorInput.value, titleInput.value, pageInput.value, read());
        myLibrary.push(newBook);
        displayBooks(); 
        closeModal();   
    }
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

function read() {
    const readOrNot = document.querySelector("#read");

    if (readOrNot.checked === true) return "Yes";
    else return "No";
}

function openModal(event) {
    dialogBox.showModal();
}

function closeModal(event) {
    dialogBox.close();
}




