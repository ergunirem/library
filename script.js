// SELECTORS & EVENT LISTENERS
window.onload = getBooks();
document.getElementById("submit").addEventListener('click', addBookToLocalStorage);
document.getElementById("submit").addEventListener('click', refreshPage);
const delButtons = document.querySelectorAll('.delete');
delButtons.forEach(delButton => delButton.addEventListener("click", del));

// Modal selectors, event listeners & functions
const newBook = document.querySelector("#myBtn");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");

newBook.addEventListener('click', function() {
    modal.style.display = "flex";
});

closeButton.addEventListener('click', function(){
    modal.style.display = "none";
    title.style.backgroundColor = ''; 
    author.style.backgroundColor = '';
    genre.style.backgroundColor = '';
    pages.style.backgroundColor = '';
    form.reset();
});

// FUNCTIONS
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return (`${title} by ${author}, ${pages} pages, ${read}`)
    };
}

function addBookToLocalStorage(e) {
    e.preventDefault();
    
    //Validity check
    if (document.getElementById('pages').validity.valid == false) {
        alert('Please enter a valid page number');
        return;
    };
    if(document.getElementById('title').value === '' || document.getElementById('author').value === ''){
        alert('A title and author is required');
        return;
    }
  

    //Get the values from user's input
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const select = document.getElementById("read");
    const option = select.options[select.selectedIndex];
    const read = option.text;

    //Create a new object with user's input
    const newBook = new Book(title, author, pages, read);

    // Put the object into storage
    localStorage.setItem(`Book: ${title}`, JSON.stringify(newBook));   
}

function getBooks() {
    if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "Book") {
                var item = localStorage.getItem(key);
                var bookItem = JSON.parse(item);
                addBookToTable(bookItem);
            }
        }
    }
    else {
        alert("Error: you don't have localStorage!");
    }
}

function addBookToTable(bookObject) {
    const table = document.getElementById('table');
    const tbdy = document.createElement('tbody');
    const tr = document.createElement("tr");

    for (const prop in bookObject) {
        const td = document.createElement('td');
        td.id = prop;
        td.appendChild(document.createTextNode(`${bookObject[prop]}`));
        tr.appendChild(td);
    };

    //Delete button
    const tdDelete = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.id = `${bookObject['title']}`;
    deleteButton.className = 'delete';
    deleteButton.appendChild(document.createTextNode('Delete'));
    tdDelete.appendChild(deleteButton);
    tr.appendChild(tdDelete);

    //Append the whole row to the body and body to the table
    tbdy.appendChild(tr);
    table.appendChild(tbdy);
}

function del(e) {
    localStorage.removeItem(`Book: ${e.target.id}`);
    e.target.closest('tr').remove();
}

function refreshPage () {
    location.reload();
}




