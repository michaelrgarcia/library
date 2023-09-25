const myLibrary = [];
const bookHolder = document.querySelector(".books");
const dialogBox = document.querySelector("dialog");

window.addEventListener("click", function(event) {
    if (event.target.className === "new-book") openModal();
    else if (event.target.className === "modal-close") closeModal();
    else if (event.target.className === "submit-book") addBookToLibrary();
});

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
        clearInputs();   
    }
}

function displayBooks() {
    bookHolder.replaceChildren();
    myLibrary.forEach((book) => {
        let displayedBook = document.createElement("div");
        displayedBook.classList.add("book");
        bookHolder.appendChild(displayedBook);

        let removeButton = document.createElement("button");
        removeButton.setAttribute("data-booknum", `${myLibrary.indexOf(book)}`);
        removeButton.classList.add("remove-book");
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", deleteBook);

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        bookInfo.innerText = `Author: ${book.author}\n\nTitle: ${book.title}\n\nPages: ${book.pages}\n\nRead: ${book.read}`;

        displayedBook.appendChild(bookInfo);
        displayedBook.appendChild(removeButton);
    })
}

function deleteBook() {
    bookHolder.replaceChildren();

    let bookToRemove = this.dataset.booknum;
    myLibrary.splice(myLibrary[bookToRemove], 1);

    displayBooks();
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

function clearInputs() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        if (input.getAttribute("type") === "checkbox") input.checked = false;
        else input.value = "";
    })
}




