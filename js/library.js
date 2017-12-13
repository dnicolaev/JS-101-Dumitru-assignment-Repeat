function LibraryOfBooks(Books) {
  this.Books = []
}

var library01 = new LibraryOfBooks();
var pileToAdd = new LibraryOfBooks();

function Book(title, author, numberOfPages, publishDate) {
  this.title = title || 'No title';
  this.author = author || 'No title';;
  this.numberOfPages = numberOfPages || 0;
  this.publishDate = publishDate || new Date(1899, 01, 01);
}

function setUpLibrary01() {
  if (localStorage.getItem("Books") === null) {
    library01.Books.push(new Book('title00', 'author00', 100, new Date(2000, 01, 20)));
    library01.Books.push(new Book('title01', 'author01', 101, new Date(2001, 01, 21)));
    library01.Books.push(new Book('title02', 'author02', 102, new Date(2002, 01, 22)));
    library01.Books.push(new Book('title03', 'author03', 103, new Date(2003, 01, 23)));
    library01.Books.push(new Book('title04', 'author04', 104, new Date(2004, 01, 24)));
    library01.Books.push(new Book('title05', 'author05', 105, new Date(2005, 01, 25)));
    library01.Books.push(new Book('title06', 'author06', 106, new Date(2006, 01, 26)));
    library01.Books.push(new Book('title07', 'author07', 107, new Date(2007, 01, 27)));
    library01.Books.push(new Book('title08', 'author08', 108, new Date(2008, 01, 28)));
    library01.Books.push(new Book('title09', 'author09', 109, new Date(2009, 01, 29)));
    localStorage.setItem('Books', JSON.stringify(library01.Books));
  };
  library01.Books = JSON.parse(localStorage.getItem('Books'));
};

LibraryOfBooks.prototype.addBook = function(newBook) {
  for (var i = 0; i < this.Books.length; i++) {
    if (JSON.stringify(newBook).toLowerCase() === JSON.stringify(this.Books[i]).toLowerCase()) return false;
  }
  return (!!this.Books.push(newBook));
};

LibraryOfBooks.prototype.removeBooksByTitle = function(title) {
  for (var _len = this.Books.length, i = _len - 1; i >= 0; i--) {
    (this.Books[i].title.toLowerCase() === title.toLowerCase().trim()) && this.Books.splice(i, 1);
  }
  booksToTable (this);
  printResults('removeBooksByTitle', (_len !== this.Books.length) && (_len - this.Books.length), 1)
};

LibraryOfBooks.prototype.removeBooksByAuthor = function(authorName) {
  for (var _len = this.Books.length, i = _len - 1; i >= 0; i--) {
    (this.Books[i].author.toLowerCase() === authorName.toLowerCase().trim()) && this.Books.splice(i, 1);
  }
  booksToTable (this);
  printResults('removeBooksByAuthor', (_len !== this.Books.length) && (_len - this.Books.length), 1)
};

LibraryOfBooks.prototype.getRandomBook = function() {
  var _random_i = Math.floor((Math.random() * this.Books.length));
  // return (this.Books.length == 0 ? null : this.Books[_random_i]);

  libraryOut = new LibraryOfBooks();
  libraryOut.Books.push(this.Books[_random_i]);
  booksToTable (libraryOut);
};

LibraryOfBooks.prototype.getBooksByTitle = function(title) {
  for (var i = 0, libraryOut = new LibraryOfBooks(); i < this.Books.length; i++) {
    if (this.Books[i].title.toLowerCase().includes(title.toLowerCase().trim())) {
      libraryOut.Books.push(this.Books[i]);
    }
  }
  booksToTable (libraryOut);
  return libraryOut;
};

LibraryOfBooks.prototype.getBooksByAuthor = function(authorName) {
  var booksOut = this.Books.filter(function(item) {
    return item.author.toLowerCase().includes((authorName.toLowerCase().trim() || 'No author was entered').trim());
  });
  var libraryOut = new LibraryOfBooks();
  libraryOut.Books.push(...booksOut);
  booksToTable (libraryOut);
};

LibraryOfBooks.prototype.addBooks = function(booksIn) {
  for (var _cnt = 0, i = 0; i < booksIn.length; i++) {
    this.addBook(booksIn[i]) && _cnt++;
  }
  // return _cnt;
  printResults('addBooks', 'Where added '+_cnt + ' of ' + booksIn.length +' books.', 1)
};

LibraryOfBooks.prototype.getAuthors = function() {
  for (var i = 0, authorsOut = []; i < this.Books.length; i++) {
    if (!authorsOut.includes(this.Books[i].author)) {
      authorsOut.push(this.Books[i].author);
    }
  }
  // return authorsOut;
  printResults('getAuthors', authorsOut.join(" | "), 1)
};

LibraryOfBooks.prototype.getRandomAuthorName = function() {
  var _random_i = Math.floor((Math.random() * this.Books.length));
  // return (this.Books.length == 0 ? null : this.Books[_random_i].author);
  printResults('getRandomAuthorName', (this.Books.length == 0 ? null : this.Books[_random_i].author), 1)
};

LibraryOfBooks.prototype.getAllBooks = function() {
  booksToTable (this);
};

function booksToTable (libraryIn) {
  $("#lib-table-body").empty();
  for (var i = 0; i < libraryIn.Books.length; i++) {
    var $_tr = $("<tr>", {id: "tr" + i});
    $("#lib-table-body").append($_tr);
    $($_tr).append( tableAddDropDownBtn(i) );
    for (var key in libraryIn.Books[i]) {
      var _td = document.createElement("td");
      (key === "publishDate") ? _td.innerHTML = libraryIn.Books[i][key].slice(0, 10) : _td.innerHTML = libraryIn.Books[i][key];
      $($_tr).append(_td);
    }
  }
};

function tableAddDropDownBtn (_index) {
  var $_td = $("<td>");
  $_td.html('<div class="btn-group">'+
    '<button class="btn btn-default btn-sm dropdown-toggle" type="button"'+ 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
      'Action<span class="caret"></span>'+
    '</button>'+
    '<ul class="dropdown-menu">'+
      '<li><a id="td-remove-by-title" href="#">Remove by this Title</a></li>'+
      '<li><a id="td-remove-by-author" href="#">Remove by this Author</a></li>'+
      '<li><a id="td-get-by-author" href="#">Get books by this Title</a></li>'+
      '<li><a id="td-get-by-title" href="#">Get books by this Author</a></li>'+
    '</ul>'+
  '</div>');
  return $_td;
};

function libResultsTextareaClear() {
  document.getElementById("lib-results").value = "";
};

function addBookToPile() {
  pileToAdd.Books.push(new Book(
    $("#lib-input-title").val(),
    $("#lib-input-author").val(),
    $("#lib-input-pages-cnt").val(),
    new Date(2000, 01, 20) ));
    printResults('Book added to pile.', pileToAdd.Books.length + ' books.', 1)
};

function submitPile() {
  library01.addBooks(pileToAdd.Books);
  pileToAdd.Books = [];
};

function printResults(_funcName, _resultToPrint, _resultType) {
  // result maybe object - type=0; string, boolean, number - type=1
  document.getElementById("lib-results").value = _funcName + '\r';
  document.getElementById("lib-results").value += _resultToPrint + '\r';
};

(function() {
  var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

  if (isIE) {
    document.getElementById('myDiv').innerHTML = "Please don't use Internet Explorer. Use any modern browser.";
  }
})();

$(document).ready(function(){
  setUpLibrary01();
  // library01.getAllBooks();

  $("#lib-results-btn-clear").click(function() { libResultsTextareaClear() });
  $("#lib-btn-submit-pile").click(function() { submitPile() });
  $("#lib-btn-add-to-pile").click(function() { addBookToPile() });
  $("#lib-btn-empty-books-pile").click(function() { pileToAdd.Books = []; });
  $("#nav-remove-by-title").click(function() { library01.removeBooksByTitle( $("#lib-input-title").val() ) });
  $("#nav-remove-by-author").click(function() { library01.removeBooksByAuthor( $("#lib-input-author").val() ) });
  $("#nav-get-by-title").click(function() { library01.getBooksByTitle( $("#lib-input-title").val() ) });
  $("#nav-get-by-author").click(function() { library01.getBooksByAuthor( $("#lib-input-author").val() ) });
  $("#nav-get-all-books").click(function() { library01.getAllBooks() });
  $("#nav-get-random-book").click(function() { library01.getRandomBook() });
  $("#nav-get-random-author").click(function() { library01.getRandomAuthorName() });
  $("#nav-get-authors").click(function() { library01.getAuthors() });
  $("#nav-set-storage").click(function() { localStorage.setItem('Books', JSON.stringify(library01.Books)); });
});

// commands to test in browser console
// library01.addBook ({title: "Title00", author: "auth555or00", numberOfPages: 10011, publishDate: new Date(2001,01,01) } )
// library01.removeBooksByTitle('TItle0550')
// library01.getBooksByAuthor('')
// library01.addBooks ([{title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title101", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}] )
