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

function addBookToLibrary (obj) {
    myLibrary.push(obj);
    displaybook(obj);
}

function displaybook (obj) {
    let card = document.createElement('div');
    card.dataset.number = myLibrary.length - 1;
    let title = document.createElement('div');
    let author = document.createElement('div');
    let number = document.createElement('div');
    let buttonsContainer = document.createElement('div');
    let readButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    card.classList.add('card');
    title.classList.add('title');
    author.classList.add('author');
    number.classList.add('page-number');
    readButton.classList.add('read-button');
    deleteButton.classList.add('delete-button')
    buttonsContainer.classList.add('buttons-container');
    title.textContent = obj.title;
    author.textContent = obj.author;
    number.textContent = obj.number + ' pages';
    if (obj.read === 'true') {
        readButton.textContent = 'Read';
    } else {
        readButton.textContent = 'Not read';
    }
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function (e) {
        e.target.parentElement.parentElement.remove();
        let x = e.target.parentElement.parentElement.dataset.number;
        myLibrary.splice(x,1);
        let cards = document.querySelectorAll('.card');
        let arr = Array.from(cards);
        for (let card of cards) {
            card.dataset.number = arr.indexOf(card)
        }; 
        console.log(myLibrary);
    }
    buttonsContainer.appendChild(readButton);
    buttonsContainer.appendChild(deleteButton);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(number);
    card.appendChild(buttonsContainer);
    cardsContainer.appendChild(card);
}

// function displayBooks() {
//     for (let i = 0; i < myLibrary.length; i++) {
//         let card = document.createElement('div');
//         let title = document.createElement('div');
//         let author = document.createElement('div');
//         let number = document.createElement('div');
//         let buttonsContainer = document.createElement('div');
//         let readButton = document.createElement('button');
//         let deleteButton = document.createElement('button');
//         card.classList.add('card');
//         title.classList.add('title');
//         author.classList.add('author');
//         number.classList.add('page-number');
//         readButton.classList.add('read-button');
//         buttonsContainer.classList.add('buttons-container');
//         title.textContent = myLibrary[i].title;
//         author.textContent = myLibrary[i].author;
//         number.textContent = myLibrary[i].number + ' pages';
//         if (myLibrary[i].read === 'true') {
//             readButton.textContent = 'Read';
//         } else {
//             readButton.textContent = 'Not read';
//         }
//         deleteButton.textContent = 'Delete';
//         buttonsContainer.appendChild(readButton);
//         buttonsContainer.appendChild(deleteButton);
//         card.appendChild(title);
//         card.appendChild(author);
//         card.appendChild(number);
//         card.appendChild(buttonsContainer);
//         cardsContainer.appendChild(card);
//     }
// }

let bookOne = new Book('Apple', 'Hugo', '123', 'true');
let bookTwo = new Book('Orange', 'Mac', '23', 'false');

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);

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
    addBookToLibrary(book);
}