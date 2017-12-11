(function() {
  var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

  if(isIE){
    document.getElementById('myDiv').innerHTML = "Please don't use Internet Explorer. Use any modern browser.";
  }
})();

function LibraryOfBooks(Books) {
  this.Books = []
}

var library01 = new LibraryOfBooks();

function Book(title, author, numberOfPages, publishDate) {
  this.title = title || 'No title';
  this.author = author || 'No title';;
  this.numberOfPages = numberOfPages || 0;
  this.publishDate = publishDate || new Date(1899, 01, 01);
}

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
  return (_len !== this.Books.length) && (_len - this.Books.length);
};

LibraryOfBooks.prototype.removeBooksByAuthor = function(authorName) {
  for (var _len = this.Books.length, i = _len - 1; i >= 0; i--) {
    (this.Books[i].author.toLowerCase() === authorName.toLowerCase().trim()) && this.Books.splice(i, 1);
  }
  return !(_len == this.Books.length);
};

LibraryOfBooks.prototype.getRandomBook = function() {
  var _random_i = Math.floor((Math.random() * this.Books.length));
  return (this.Books.length == 0 ? null : this.Books[_random_i]);
};

LibraryOfBooks.prototype.getBooksByTitle = function(title) {
  for (var i = 0, libraryOut = new LibraryOfBooks(); i < this.Books.length; i++) {
    if (this.Books[i].title.toLowerCase().includes(title.toLowerCase().trim())) {
      libraryOut.Books.push(this.Books[i]);
    }
  }
  return libraryOut;
};

LibraryOfBooks.prototype.getBooksByAuthor = function(authorName) {
  return libraryOut = this.Books.filter(function(item) {
    return item.author.toLowerCase().includes((authorName.toLowerCase().trim() || 'No author was entered').trim());
  });
};

LibraryOfBooks.prototype.addBooks = function(booksIn) {
  for (var _cnt = 0, i = 0; i < booksIn.length; i++) {
    this.addBook(booksIn[i]) && _cnt++;
  }
  return _cnt;
};

LibraryOfBooks.prototype.getAuthors = function() {
  for (var i = 0, authorsOut = []; i < this.Books.length; i++) {
    if (!authorsOut.includes(this.Books[i].author)) {
      authorsOut.push(this.Books[i].author);
    }
  }
  return authorsOut;
};

LibraryOfBooks.prototype.getRandomAuthorName = function() {
  var _random_i = Math.floor((Math.random() * this.Books.length));
  return (this.Books.length == 0 ? null : this.Books[_random_i].author);
};


// commands to test in browser console
// library01.addBook ({title: "Title00", author: "auth555or00", numberOfPages: 10011, publishDate: new Date(2001,01,01) } )
// library01.removeBooksByTitle('TItle0550')
// library01.getBooksByAuthor('')
// library01.addBooks ([{title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title101", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}, {title: "title100", author: "author00", numberOfPages: 100, publishDate: new Date(2001,01,01)}] )
