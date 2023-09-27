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
    const titleInput = document.querySelector("#book-title");
    const authorInput = document.querySelector("#book-author");
    const pageInput = document.querySelector("#pages-number");

    if (titleInput.value !== "" &&
        authorInput.value !== "" &&
        pageInput.value !== "") {
        let newBook = new Book(authorInput.value, titleInput.value, pageInput.value, initialReadOption());
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
        displayedBook.setAttribute("data-booknum", `${myLibrary.indexOf(book)}`);
        bookHolder.appendChild(displayedBook);

        let removeButton = document.createElement("button");

        removeButton.setAttribute("type", "button");
        removeButton.classList.add("remove-book");
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", deleteBook);

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        bookInfo.innerText = `Author: ${book.author}\n\nTitle: ${book.title}\n\nPages: ${book.pages}\n`;

        let readOrNot = document.createElement("div");
        readOrNot.classList.add("read-user-ctrl")
        let checkboxLabel = document.createElement("label");
        checkboxLabel.innerText = "Read:";
        checkboxLabel.setAttribute("for", "read-toggle")
        let toggleCheckbox = document.createElement("input");
        toggleCheckbox.setAttribute("type", "checkbox");
        toggleCheckbox.setAttribute("name", "read-toggle");
        toggleCheckbox.setAttribute("id", "read-toggle");
        toggleCheckbox.setAttribute("data-read", "no");
        toggleCheckbox.addEventListener("click", readToggle);

        if (document.querySelector("#read").checked === true && book.read === "yes") toggleCheckbox.setAttribute("checked", "");

        readOrNot.appendChild(checkboxLabel);
        readOrNot.appendChild(toggleCheckbox);

        bookInfo.appendChild(readOrNot)
        displayedBook.appendChild(bookInfo);
        displayedBook.appendChild(removeButton);
    })
}

function deleteBook() {
    bookHolder.replaceChildren();

    let bookToRemove = this.parentNode.dataset.booknum;
    myLibrary.splice(myLibrary[bookToRemove], 1);

    displayBooks();
}

function readToggle() {
    let toggle = this.checked;
    let bookToUpdate = this.parentNode.parentNode.parentNode.dataset.booknum;

    if (toggle) myLibrary[bookToUpdate].read = "yes";
    else myLibrary[bookToUpdate].read = "no";
   
}

function initialReadOption() {
    const readOrNot = document.querySelector("#read");

    if (readOrNot.checked === true) return "yes";
    else return "no";
}

function openModal() {
    dialogBox.showModal();
}

function closeModal() {
    dialogBox.close();
}

function clearInputs() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        if (input.getAttribute("type") === "checkbox") input.checked = false;
        else input.value = "";
    })
}




