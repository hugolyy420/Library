// const myLibrary = [];
// const cardsContainer = document.querySelector('.cards-container');
// const dialog = document.querySelector('dialog');
// const addBookButton = document.querySelector(".add-book-button");
// const closeDialogButton = document.querySelector(".close-dialog");
// const titleInput = document.getElementById('title');
// const authorInput = document.getElementById('author');
// const pageNumberInput = document.getElementById('pages');
// const readInput = document.getElementById('read');
// const submitButton = document.querySelector('input[type=submit]');
// const form = document.querySelector('.form');
// const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>tag-edit-outline</title><path d="M21.41 11.58L12.41 2.58C12.04 2.21 11.53 2 11 2H4C3.47 2 2.96 2.21 2.59 2.59C2.21 2.96 2 3.47 2 4V11C2 11.26 2.05 11.53 2.15 11.77C2.25 12 2.4 12.23 2.59 12.42L4.57 14.4L6 13L4 11V4H11L20 13L13 20L10.87 17.87L10.7 18.04L10.7 18.03L9.45 19.28L11.59 21.42C11.97 21.79 12.47 22 13 22C13.53 22 14.04 21.79 14.41 21.41L21.41 14.41C21.79 14.04 22 13.53 22 13C22 12.74 21.95 12.5 21.85 12.23C21.75 12 21.6 11.77 21.41 11.58M6.5 5C6.8 5 7.09 5.09 7.33 5.25C7.58 5.42 7.77 5.65 7.89 5.93C8 6.2 8.03 6.5 7.97 6.79C7.91 7.08 7.77 7.35 7.56 7.56C7.35 7.77 7.08 7.91 6.79 7.97C6.5 8.03 6.2 8 5.93 7.89C5.65 7.77 5.42 7.58 5.25 7.33C5.09 7.09 5 6.8 5 6.5C5 6.1 5.16 5.72 5.44 5.44C5.72 5.16 6.1 5 6.5 5M10.7 15.35L11.7 14.35C11.91 14.14 11.91 13.79 11.7 13.58L10.42 12.3C10.21 12.09 9.86 12.09 9.65 12.3L8.65 13.3L10.7 15.35M8.06 13.88L2 19.94V22H4.06L10.11 15.93L8.06 13.88Z" /></svg>`;
// const read = true;
// let editMode = false;

// function Book(title, author, number, read) {
//     this.title = title;
//     this.author = author;
//     this.number = number;
//     this.read = read;
// }

// function addBookToLibrary (obj) {
//     myLibrary.push(obj);
//     displaybook(obj);
// }

// function displaybook (obj) {
//     let card = document.createElement('div');
//     card.dataset.number = myLibrary.length - 1;
//     let title = document.createElement('div');
//     let author = document.createElement('div');
//     let number = document.createElement('div');
//     let buttonsContainer = document.createElement('div');
//     let readButton = document.createElement('button');
//     let deleteButton = document.createElement('button');
//     let editButtonContainer = document.createElement('a');
//     card.classList.add('card');
//     title.classList.add('title');
//     author.classList.add('author');
//     number.classList.add('page-number');
//     readButton.classList.add('read-button');
//     deleteButton.classList.add('delete-button')
//     editButtonContainer.classList.add('edit-button-container');
//     buttonsContainer.classList.add('buttons-container');
//     title.textContent = obj.title;
//     author.textContent = 'By ' + obj.author;
//     number.textContent = obj.number + ' pages';
//     if (obj.read === 'true') {
//         readButton.textContent = 'Read';
//         readButton.classList.add('read');
//     } else {
//         readButton.textContent = 'Not read';
//     }
//     readButton.onclick = function (e) {
//         let x = e.target.parentElement.parentElement.dataset.number;
//         let obj = myLibrary[x];
//         if (obj.read === 'false') {
//             obj.read = 'true';
//             e.target.textContent = 'Read';
//             e.target.classList.toggle('read');
//         } else {
//             obj.read = 'false';
//             e.target.textContent = 'Not Read'
//             e.target.classList.toggle('read');
//         }
//     };
//     deleteButton.textContent = 'Delete';
//     deleteButton.onclick = function (e) {
//         e.target.parentElement.parentElement.remove();
//         let y = e.target.parentElement.parentElement.dataset.number;
//         myLibrary.splice(y,1);
//         let cards = document.querySelectorAll('.card');
//         let arr = Array.from(cards);
//         for (let card of cards) {
//             card.dataset.number = arr.indexOf(card)
//         }; 
//     }

//     editButtonContainer.onclick = function (e) {
//         editMode = true;
//         console.log('yay');
//         let parent = e.target.closest('.card');
//         let z = parent.dataset.number;
//         let obj = myLibrary[z];
//         console.log(parent);
//         dialog.showModal();
//         titleInput.value = obj.title;
//         authorInput.value = obj.author;
//         pageNumberInput.value = obj.number; 
//         obj.read === 'true' ? readInput.checked = true : readInput.checked = false;

//         form.onsubmit = function(event) {
//             if (editMode) {
//             event.preventDefault();
//             dialog.close();
//             obj.title = titleInput.value;
//             obj.author = authorInput.value;
//             obj.number = pageNumberInput.value;
//             obj.read = readInput.checked ? 'true' : 'false';
//             parent.querySelector(".title").textContent = obj.title;
//             parent.querySelector(".author").textContent = 'By ' + obj.author;
//             parent.querySelector(".page-number").textContent = obj.number + ' pages';
//             parent.querySelector(".read-button").textContent = readInput.checked ? 'Read' : 'Not read';
//             parent.querySelector(".read-button").classList.toggle('read', readInput.checked);
//             form.reset();
//             editMode = false;
//             }
//     }
//     }
//     editButtonContainer.innerHTML = editIcon;
//     buttonsContainer.appendChild(readButton);
//     buttonsContainer.appendChild(deleteButton);
//     card.appendChild(editButtonContainer);
//     card.appendChild(title);
//     card.appendChild(author);
//     card.appendChild(number);
//     card.appendChild(buttonsContainer);
//     cardsContainer.appendChild(card);
// }

// let bookOne = new Book('Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', 'James Clear', '320', 'true');
// let bookTwo = new Book('Think Like a Monk: Train Your Mind for Peace and Purpose Every Day', 'Jay Shetty', '352', 'false');

// addBookToLibrary(bookOne);
// addBookToLibrary(bookTwo);

// addBookButton.addEventListener("click", () => {
//     dialog.showModal();
// });

// closeDialogButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     dialog.close();
//     form.reset();
// });

// form.addEventListener("submit", showResult, false);

// function showResult(event) {
//     if (!editMode) {
//     console.log('yay');
//     event.preventDefault();
//     dialog.close();
//     readInput.value = readInput.checked ? read : !read;
//     let book = new Book(titleInput.value, authorInput.value, pageNumberInput.value, readInput.value);
//     addBookToLibrary(book);
//     form.reset(); 
//     }
// }