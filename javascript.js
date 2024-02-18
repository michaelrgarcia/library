const myLibrary = [];
const bookHolder = document.querySelector(".books");
const dialogBox = document.querySelector("dialog");
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

window.addEventListener("click", function(event) {
    if (event.target.className === "new-book") openModal();
    if (event.target.className === "modal-close") closeModal();
    if (event.target.className === "submit-book") addBookToLibrary();
    if (event.target.className === "remove-book") deleteBook();
    if (event.target.className === "read-toggle") readToggle();
});

inputs.forEach((input) => {
    if (input.type === "text" || input.type === "number") {
        input.addEventListener("input", function(event) {
            let nearestErrorMessage = event.target.parentNode.parentNode.querySelector(".error-message > .error");

            if (input.validity.valid) {
                nearestErrorMessage.textContent = "";
            } else {
                showError();
            }
        });
    }
});

form.addEventListener("submit", function(event) {
    inputs.forEach((input) => {
        if (input.type === "text" || input.type === "number") {
            if (!input.validity.valid) {
                showError();
                event.preventDefault();
            }
        }
    });
});

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

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        bookInfo.innerText = `Title: ${book.title}\n\nAuthor: ${book.author}\n\nPages: ${book.pages}\n`;

        let readOrNot = document.createElement("div");
        readOrNot.classList.add("read-user-ctrl")

        let checkboxLabel = document.createElement("label");
        checkboxLabel.innerText = "Read:";
        checkboxLabel.setAttribute("for", "read-toggle")

        let toggleCheckbox = document.createElement("input");
        toggleCheckbox.setAttribute("type", "checkbox");
        toggleCheckbox.setAttribute("name", "read-toggle");
        toggleCheckbox.classList.add("read-toggle");
        toggleCheckbox.setAttribute("data-read", "no");

        readOrNot.appendChild(checkboxLabel);
        readOrNot.appendChild(toggleCheckbox);

        bookInfo.appendChild(readOrNot)
        displayedBook.appendChild(bookInfo);
        displayedBook.appendChild(removeButton);
    })
    checkboxToggle();
}

function deleteBook() {
    bookHolder.replaceChildren();

    let bookToRemove = event.target.parentNode.dataset.booknum;
    myLibrary.splice(bookToRemove, 1);

    displayBooks();
}

function readToggle() {
    let toggle = event.target.checked;
    let bookToUpdate = event.target.parentNode.parentNode.parentNode.dataset.booknum;

    if (toggle) myLibrary[bookToUpdate].read = "yes";
    else myLibrary[bookToUpdate].read = "no";
}

function checkboxToggle() {
    const readBoxes = document.querySelectorAll(".read-toggle");

    readBoxes.forEach((box) => {
        let bookToUpdate = box.parentNode.parentNode.parentNode.dataset.booknum;

        if (myLibrary[bookToUpdate].read === "yes") box.checked = true;
    })
}

function initialReadOption() {
    const readOrNot = document.querySelector("#read");

    if (readOrNot.checked === true) return "yes";
    else return "no";
}

function openModal() {
    dialogBox.showModal();

    inputs.forEach((input) => {
        if (input.type !== "checkbox") input.setAttribute("required", "");
    })
}

function closeModal() {
    dialogBox.close();
}

function clearInputs() {
    inputs.forEach((input) => {
        input.removeAttribute("required");

        let nearestErrorMessage = input.parentNode.parentNode.querySelector(".error-message > .error");
        nearestErrorMessage.textContent = "";
    })

    form.reset();
}

function showError() {
    inputs.forEach((input) => {
        let nearestErrorMessage = input.parentNode.parentNode.querySelector(".error-message > .error");

        if (input.validity.valueMissing) {
            nearestErrorMessage.textContent = "You need to enter something.";
        } else if (input.validity.rangeUnderflow) {
            nearestErrorMessage.textContent = "Value needs to be greater than 0.";
        } 
    });
}