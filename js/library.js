function LibraryOfBooks() {};

function Book(title, author, numberOfPages, publishDate) {
  this.title = title || 'No title';
  this.author = author || 'No title';;
  this.numberOfPages = numberOfPages || 0;
  this.publishDate = publishDate || new Date(1899, 01, 01);
};

LibraryOfBooks.prototype.loadBooksToLibrary = function() {
  if (localStorage.getItem("Books") === null) {
    this.Books.push(new Book('title00', 'author00', 100, new Date(2000, 01, 20)) );
    this.Books.push(new Book('title01', 'author01', 101, new Date(2001, 01, 21)) );
    this.Books.push(new Book('title02', 'author02', 102, new Date(2002, 01, 22)) );
    this.Books.push(new Book('title03', 'author03', 103, new Date(2003, 01, 23)) );
    this.Books.push(new Book('title04', 'author04', 104, new Date(2004, 01, 24)) );
    this.Books.push(new Book('title05', 'author05', 105, new Date(2005, 01, 25)) );
    this.saveToStorage();
  };
  this.loadFromStorage();
};

LibraryOfBooks.prototype._tempPileOfBooks = []; //Temp PileOfBooks to be added
LibraryOfBooks.prototype._tempPileResult = []; //Temp PileOfBooks - search result
LibraryOfBooks.prototype.Books = [];  //Permanent Book Library

LibraryOfBooks.prototype.init = function(){
  this.$libInputTitle = $("#lib-input-title");
  this.$libInputAuthor = $("#lib-input-author");
  this.$libInputPages = $("#lib-input-pages-cnt");
  this.$libInputDate = $("#lib-input-date-published");
  this.$libResults = $("#lib-results");
  this.$libTableBody = $("#lib-table-body");
  this._bindEvents();
};

LibraryOfBooks.prototype._bindEvents = function(){
  this.loadBooksToLibrary();
  $("#lib-btn-empty-books-pile").click(function() { this._tempPileOfBooks = []; });

  $("#lib-results-btn-clear").on("click", $.proxy(this.libResultsTextareaClear, this) );
  $("#nav-remove-by-title").on("click", $.proxy(this.removeBooksByTitle, this) );
  $("#nav-remove-by-author").on("click", $.proxy(this.removeBooksByAuthor, this) );
  $("#lib-btn-submit-pile").on("click", $.proxy(this.submitPile, this) );
  $("#lib-btn-add-to-pile").on("click", $.proxy(this.addBookToPile, this) );
  $("#nav-get-by-title").on("click", $.proxy(this.getBooksByTitle, this) );
  $("#nav-get-by-author").on("click", $.proxy(this.getBooksByAuthor, this) );
  $("#nav-get-all-books").on("click", $.proxy(this.getAllBooks, this) );
  $("#nav-get-random-book").on("click", $.proxy(this.getRandomBook, this) );
  $("#nav-get-random-author").on("click", $.proxy(this.getRandomAuthorName, this) );
  $("#nav-get-authors").on("click", $.proxy(this.getAuthors, this) );
  $("#nav-set-storage").on("click", $.proxy(this.saveToStorage, this) );
};

LibraryOfBooks.prototype.loadFromStorage = function() {
  this.Books = [];
  this.addBooks ( JSON.parse(localStorage.getItem('Books')) );
  this.libResultsTextareaClear();

  this.Books.forEach ( function(_aBook, i) {
    _aBook.publishDate = new Date(_aBook.publishDate);
  });
};

LibraryOfBooks.prototype.saveToStorage = function() {
  localStorage.setItem('Books', JSON.stringify(this.Books));
};

LibraryOfBooks.prototype.addBook = function(newBook) {
  for (var i = 0; i < this.Books.length; i++) {
    if (JSON.stringify(newBook).toLowerCase() === JSON.stringify(this.Books[i]).toLowerCase()) return false;
  }
  return (!!this.Books.push(newBook));
};

LibraryOfBooks.prototype.removeBooksByTitle = function(title) {
  (typeof title === 'object') && (title = this.$libInputTitle.val() );
  for (var _len = this.Books.length, i = _len - 1; i >= 0; i--) {
    (this.Books[i].title.toLowerCase() === title.toLowerCase().trim()) && this.Books.splice(i, 1);
  }
  this._tempPileResult = this.Books;
  this.booksToTable();
  this.saveToStorage();
  this.printResults('removeBooksByTitle', (_len !== this.Books.length) && (_len - this.Books.length), 1)
};

LibraryOfBooks.prototype.removeBooksByAuthor = function(authorName) {
  (typeof authorName === 'object') && (authorName = this.$libInputAuthor.val() );
  for (var _len = this.Books.length, i = _len - 1; i >= 0; i--) {
    (this.Books[i].author.toLowerCase() === authorName.toLowerCase().trim()) && this.Books.splice(i, 1);
  }
  this._tempPileResult = this.Books;
  this.booksToTable();
  this.saveToStorage();
  this.printResults('removeBooksByAuthor', (_len !== this.Books.length) && (_len - this.Books.length), 1)
};

LibraryOfBooks.prototype.getRandomBook = function() {
  var _random_i = Math.floor((Math.random() * this.Books.length));
  this._tempPileResult = [];
  this._tempPileResult.push(this.Books[_random_i]);
  this.booksToTable();
};

LibraryOfBooks.prototype.getBooksByTitle = function(title) {
  (typeof title === 'object') && (title = this.$libInputTitle.val() );
  this._tempPileResult = [];
  for (var i = 0; i < this.Books.length; i++) {
    if (this.Books[i].title.toLowerCase().includes(title.toLowerCase().trim())) {
      this._tempPileResult.push(this.Books[i]);
    }
  }
  this.booksToTable();
  return this._tempPileResult;
};

LibraryOfBooks.prototype.getBooksByAuthor = function(authorName) {
  (typeof authorName === 'object') && (authorName = this.$libInputAuthor.val() );
  var booksOut = this.Books.filter(function(item) {
    return item.author.toLowerCase().includes((authorName.toLowerCase().trim() || 'No author was entered').trim());
  });
  this._tempPileResult = [];
  this._tempPileResult.push(...booksOut);
  this.booksToTable ();
};

LibraryOfBooks.prototype.addBooks = function(booksIn) {
  for (var _cnt = 0, i = 0; i < booksIn.length; i++) {
    this.addBook(booksIn[i]) && _cnt++;
  };
  this.saveToStorage();
  this.printResults('addBooks', 'Where added '+_cnt + ' of ' + booksIn.length +' books.', 1);
};

LibraryOfBooks.prototype.getAuthors = function() {
  for (var i = 0, authorsOut = []; i < this.Books.length; i++) {
    if (!authorsOut.includes(this.Books[i].author)) {
      authorsOut.push(this.Books[i].author);
    }
  }
  this.printResults('getAuthors', authorsOut.join(" | "), 1)
};

LibraryOfBooks.prototype.getRandomAuthorName = function() {
  var _random_i = Math.floor((Math.random() * this.Books.length));
  this.printResults('getRandomAuthorName', (this.Books.length == 0 ? null : this.Books[_random_i].author), 1)
};

LibraryOfBooks.prototype.getAllBooks = function() {
  this._tempPileResult = this.Books;
  this.booksToTable();
};

LibraryOfBooks.prototype.booksToTable = function() {
  var _self = this;
  var _table = _self.$libTableBody;
  _table.empty();
  _self._tempPileResult.forEach ( function(_aBook, i) {
    var $_tr = $("<tr>", {id: "tr-"+i});
    _table.append($_tr);
    $($_tr).append(_self.tableAddDropDownBtn(i));

    for (var key in _aBook) {
      var $_td1 = $("<td>", {id: "td-"+key+"-"+i});
      (key === "publishDate") ? $_td1.html(_aBook[key].toString().slice(4, 15)) : $_td1.html(_aBook[key]);
      $($_tr).append($_td1);
    }

    $("#td-get-by-author-"+i).on("click", $.proxy(_self.getBooksByAuthor, _self, $("#td-author-"+i).text() ));
    $("#td-get-by-title-"+i).on("click", $.proxy(_self.getBooksByTitle, _self, $("#td-title-"+i).text() ));
    $("#td-remove-by-author-"+i).on("click", $.proxy(_self.removeBooksByAuthor, _self, $("#td-author-"+i).text() ));
    $("#td-remove-by-title-"+i).on("click", $.proxy(_self.removeBooksByTitle, _self, $("#td-title-"+i).text() ));
  });
};

LibraryOfBooks.prototype.tableAddDropDownBtn = function(_index) {
  var $_td = $("<td>");
  $_td.html('<div class="btn-group">'+
    '<button class="btn btn-info btn-sm dropdown-toggle" type="button"'+ 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
      'Action<span class="caret"></span>'+
    '</button>'+
    '<ul class="dropdown-menu">'+
      '<li><a id="td-remove-by-title-'+_index+'" href="#">Remove by this Title</a></li>'+
      '<li><a id="td-remove-by-author-'+_index+'" href="#">Remove by this Author</a></li>'+
      '<li><a id="td-get-by-title-'+_index+'" href="#">Get books by this Title</a></li>'+
      '<li><a id="td-get-by-author-'+_index+'" href="#">Get books by this Author</a></li>'+
    '</ul>'+
  '</div>');
  return $_td;
};

LibraryOfBooks.prototype.libResultsTextareaClear = function() {
  this.$libResults.val("");
};

LibraryOfBooks.prototype.addBookToPile = function() {
  this._tempPileOfBooks.push(new Book(
    this.$libInputTitle.val(),
    this.$libInputAuthor.val(),
    parseInt(this.$libInputPages.val()),
    new Date(this.$libInputDate.val()) ));
  this.printResults('Book added to pile.', this._tempPileOfBooks.length + ' books.', 1)
};

LibraryOfBooks.prototype.submitPile = function() {
  this.addBooks(this._tempPileOfBooks);
  this._tempPileOfBooks = [];
};

LibraryOfBooks.prototype.printResults = function(_funcName, _resultToPrint, _resultType) {
  // result maybe object - type=0; string, boolean, number - type=1
  this.$libResults.val(_funcName + '\r' + _resultToPrint + '\r');
};

(function() {
  var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

  if (isIE) {
    document.getElementById('myDiv').innerHTML = "Please don't use Internet Explorer. Use any modern browser.";
  }
})();

$(document).ready(function(){
  window.library01 = new LibraryOfBooks();
  window.library01.init();
});

// commands to test in browser console
// library01.addBook ({title: "Title00", author: "auth555or00", numberOfPages: 10011, publishDate: new Date(2001,01,01) } )
// library01.removeBooksByTitle('TItle0550')
// library01.getBooksByAuthor('')
// library01.addBooks ([{title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title101", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}] )
