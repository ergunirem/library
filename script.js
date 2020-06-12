let myLibrary = new Array();

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

    //Get the values from user's input
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const select = document.getElementById("read");
    const option = select.options[select.selectedIndex];
    const read = option.text;
    console.log( option.value );
    console.log( option.text );

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
                    console.log(bookItem)
                    console.log(typeof bookItem)
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
    table.style.width = '100%';
    table.setAttribute('border', '1');
    const tbdy = document.createElement('tbody');
    const tr = document.createElement("tr");

    for (const prop in bookObject) {
        const td = document.createElement('td');
        td.appendChild(document.createTextNode(`${bookObject[prop]}`));
        tr.appendChild(td)
    };

    tbdy.appendChild(tr);
    table.appendChild(tbdy);
}

function refreshPage () {
    location.reload();
}
  
window.onload = getBooks();
document.getElementById("submit").addEventListener('click', addBookToLocalStorage);
document.getElementById("submit").addEventListener('click', refreshPage);
