const myLibrary = [];
const cardsContainer = document.querySelector('.cards-container');
console.log(cardsContainer);

function Book(title, author, number, read) {
    this.title = title;
	this.author = author;
	this.number = number;
	this.read = read;
}

Book.prototype.addBookToLibrary = function () {
	myLibrary.push(this);
}

function displayBook () {
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

let bookOne = new Book('Apple','Hugo','123','read');
let bookTwo = new Book ('Orange', 'Mac', '23', 'not read');

bookOne.addBookToLibrary();
bookTwo.addBookToLibrary();
displayBook();