const myLibrary = [];
const cardsContainer = document.querySelector('.cards-container');
const dialog = document.querySelector('dialog');
const addBookButton = document.querySelector(".add-book-button");
const closeDialogButton = document.querySelector(".close-dialog");
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageNumberInput = document.getElementById('pages');
const readInput = document.getElementById('read');
const submitButton = document.querySelector('input[type=submit]');
const read = false;

function Book(title, author, number, read) {
    this.title = title;
    this.author = author;
    this.number = number;
    this.read = read;
}

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
}

Book.prototype.displaybook = function () {
    let card = document.createElement('div');
    let title = document.createElement('div');
    let author = document.createElement('div');
    let number = document.createElement('div');
    let buttonsContainer = document.createElement('div');
    let readButton = document.createElement('button');
    card.classList.add('card');
    title.classList.add('title');
    author.classList.add('author');
    number.classList.add('page-number');
    readButton.classList.add('read');
    buttonsContainer.classList.add('buttons-container');
    title.textContent = this.title;
    author.textContent = this.author;
    number.textContent = this.number + ' pages';

    if (this.read === 'true') {
        readButton.textContent = 'read';
    } else {
        readButton.textContent = 'not read';
    }
    
    buttonsContainer.appendChild(readButton);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(number);
    card.appendChild(buttonsContainer);
    cardsContainer.appendChild(card);
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement('div');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let number = document.createElement('div');
        let buttonsContainer = document.createElement('div');
        let read = document.createElement('button');
        card.classList.add('card');
        title.classList.add('title');
        author.classList.add('author');
        number.classList.add('page-number');
        read.classList.add('read');
        buttonsContainer.classList.add('buttons-container');
        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        number.textContent = myLibrary[i].number + ' pages';
        read.textContent = myLibrary[i].read;
        buttonsContainer.appendChild(read);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(number);
        card.appendChild(buttonsContainer);
        cardsContainer.appendChild(card);
    }
}

let bookOne = new Book('Apple', 'Hugo', '123', 'read');
let bookTwo = new Book('Orange', 'Mac', '23', 'not read');

bookOne.addBookToLibrary();
bookTwo.addBookToLibrary();
displayBooks();

addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
});

submitButton.addEventListener("click", showResult, false);
readInput.addEventListener("change", function () {
    this.value = this.checked ? !read : read;
})

function showResult(event) {
    event.preventDefault();
    dialog.close();
    readInput.value = readInput.checked ? !read : read;
    let book = new Book(titleInput.value, authorInput.value, pageNumberInput.value, readInput.value);
    book.addBookToLibrary();
    book.displaybook();
    console.log(myLibrary);
}