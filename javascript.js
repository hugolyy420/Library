const myLibrary = [];
const cardsContainer = document.querySelector('.cards-container');
const dialog = document.querySelector('dialog');
const addBookButton = document.querySelector('.add-book-button');
const closeDialogButton = document.querySelector('.close-dialog');
const form = document.querySelector('.form');
const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>tag-edit-outline</title><path d="M21.41 11.58L12.41 2.58C12.04 2.21 11.53 2 11 2H4C3.47 2 2.96 2.21 2.59 2.59C2.21 2.96 2 3.47 2 4V11C2 11.26 2.05 11.53 2.15 11.77C2.25 12 2.4 12.23 2.59 12.42L4.57 14.4L6 13L4 11V4H11L20 13L13 20L10.87 17.87L10.7 18.04L10.7 18.03L9.45 19.28L11.59 21.42C11.97 21.79 12.47 22 13 22C13.53 22 14.04 21.79 14.41 21.41L21.41 14.41C21.79 14.04 22 13.53 22 13C22 12.74 21.95 12.5 21.85 12.23C21.75 12 21.6 11.77 21.41 11.58M6.5 5C6.8 5 7.09 5.09 7.33 5.25C7.58 5.42 7.77 5.65 7.89 5.93C8 6.2 8.03 6.5 7.97 6.79C7.91 7.08 7.77 7.35 7.56 7.56C7.35 7.77 7.08 7.91 6.79 7.97C6.5 8.03 6.2 8 5.93 7.89C5.65 7.77 5.42 7.58 5.25 7.33C5.09 7.09 5 6.8 5 6.5C5 6.1 5.16 5.72 5.44 5.44C5.72 5.16 6.1 5 6.5 5M10.7 15.35L11.7 14.35C11.91 14.14 11.91 13.79 11.7 13.58L10.42 12.3C10.21 12.09 9.86 12.09 9.65 12.3L8.65 13.3L10.7 15.35M8.06 13.88L2 19.94V22H4.06L10.11 15.93L8.06 13.88Z" /></svg>`;
const titleInputField = document.querySelector('#title');
const authorInputField = document.querySelector('#author');
const pageInputField = document.querySelector('#pages');
const titleRegExp = /^[\w\s\d\-.!?,:&@']{1,100}$/;
const authorRegExp = /[A-Za-z\s\-]{1,50}$/;
let editMode = false;

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBook(book);
}

function displayBook(book) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.number = myLibrary.length - 1;

  card.innerHTML = `
        <div class="edit-button-container">${editIcon}</div>
        <div class="title">${book.title}</div>
        <div class="author">By ${book.author}</div>
        <div class="page-number">${book.pages} pages</div>
        <div class="buttons-container">
            <button class="read-button ${book.read ? 'read' : ''}">${
    book.read ? 'Read' : 'Not read'
  }</button>
            <button class="delete-button">Delete</button>
        </div>
    `;

  const readButton = card.querySelector('.read-button');
  readButton.addEventListener('click', () => toggleReadStatus(card));

  const deleteButton = card.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => deleteBook(card));

  const editButtonContainer = card.querySelector('.edit-button-container');
  editButtonContainer.addEventListener('click', () => openEditDialog(card));

  cardsContainer.appendChild(card);
}

function toggleReadStatus(card) {
  const index = card.dataset.number;
  const book = myLibrary[index];
  book.read = !book.read;
  const readButton = card.querySelector('.read-button');
  readButton.textContent = book.read ? 'Read' : 'Not read';
  readButton.classList.toggle('read', book.read);
}

function deleteBook(card) {
  const index = card.dataset.number;
  myLibrary.splice(index, 1);
  card.remove();
  updateCardIndexes();
}

function updateCardIndexes() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.dataset.number = index;
  });
}

function openEditDialog(card) {
  editMode = true;
  const index = card.dataset.number;
  const book = myLibrary[index];
  // Populate form with book details
  dialog.showModal();
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('pages').value = book.pages;
  document.getElementById('read').checked = book.read;

  form.onsubmit = function (event) {
    if (
      titleInputField.classList.contains('invalid') ||
      authorInputField.classList.contains('invalid')
    ) {
      event.preventDefault();
      return;
    }

    if (editMode) {
      event.preventDefault();

      book.title = document.getElementById('title').value;
      book.author = document.getElementById('author').value;
      book.pages = document.getElementById('pages').value;
      book.read = document.getElementById('read').checked;

      // Update the card with the new book details
      const titleElement = card.querySelector('.title');
      const authorElement = card.querySelector('.author');
      const pageNumberElement = card.querySelector('.page-number');
      const readButton = card.querySelector('.read-button');

      titleElement.textContent = book.title;
      authorElement.textContent = 'By ' + book.author;
      pageNumberElement.textContent = book.pages + ' pages';
      readButton.textContent = book.read ? 'Read' : 'Not read';
      readButton.classList.toggle('read', book.read);

      dialog.close();
      form.reset();
      editMode = false;
    }
  };
}

addBookButton.addEventListener('click', () => {
  dialog.showModal();
});

closeDialogButton.addEventListener('click', () => {
  const errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach((message) => {
    message.className = 'error';
    message.textContent = '';
  });
  authorInputField.className = 'valid';
  titleInputField.className = 'valid';
  dialog.close();
  form.reset();
});

form.addEventListener('submit', (event) => {
  if (
    titleInputField.classList.contains('invalid') ||
    authorInputField.classList.contains('invalid')
  ) {
    event.preventDefault();
    return;
  }
  if (!editMode) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    dialog.close();
    form.reset();
  }
});

titleInputField.addEventListener('input', (event) => {
  const errorMessage = event.target.nextElementSibling;
  const isValid =
    titleRegExp.test(titleInputField.value) ||
    titleInputField.value.length === 0;
  console.log(isValid);
  console.log(titleInputField.value.length);

  if (isValid) {
    titleInputField.className = 'valid';
    errorMessage.textContent = '';
    errorMessage.className = 'error';
  } else {
    titleInputField.className = 'valid invalid';
    showTitleError(errorMessage);
  }
});

authorInputField.addEventListener('input', (event) => {
  const errorMessage = event.target.nextElementSibling;
  const isValid =
    authorInputField.value.length === 0 ||
    authorRegExp.test(authorInputField.value);

  if (isValid) {
    authorInputField.className = 'valid';
    errorMessage.textContent = '';
    errorMessage.className = 'error';
  } else {
    authorInputField.className = 'valid invalid';
    showAuthorError(errorMessage);
  }
});

function showTitleError(errMessage) {
  errMessage.textContent = `Only letters, digits, spaces and special characters '-.,!?:&@'' are allowed`;
}

function showAuthorError(errMessage) {
  errMessage.textContent = `Only letters (both uppercase and lowercase), spaces, and hyphens are allowed.`;
}

let bookOne = new Book(
  'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
  'James Clear',
  '320',
  true
);
let bookTwo = new Book(
  'Think Like a Monk: Train Your Mind for Peace and Purpose Every Day',
  'Jay Shetty',
  '352',
  false
);

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
