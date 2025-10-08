// об'єкт із геттерами/сеттерами (2 рівні), плюс метод-самері
// тема — бібліотека Hogwarts
const library = {
    _name: 'Hogwarts Library',
    address: {
        city: 'Hogsmeade',
        building: 'Castle Annex'
    },
    _books: [
        { title: 'Advanced Potion-Making', author: 'Libatius Borage', rating: 4.5 },
        { title: 'Fantastic Beasts', author: 'Newt Scamander', rating: 4.8 }
    ],

    // getter/setter для назви бібліотеки
    get name() {
        return this._name;
    },
    set name(value) {
        if (typeof value !== 'string' || value.trim().length < 3) {
            console.warn('Invalid library name');
            return;
        }
        this._name = value.trim();
    },

    // getter повертає середній рейтинг книг
    get averageRating() {
        if (this._books.length === 0) return 0;
        const sum = this._books.reduce((acc, b) => acc + (Number(b.rating) || 0), 0);
        return +(sum / this._books.length).toFixed(2);
    },

    // setter для оновлення існуючої книги (без розширення масиву)
    set book(newBook) {
        if (!newBook || typeof newBook.title !== 'string' || typeof newBook.author !== 'string') {
            console.warn('book: некоректна книга');
            return;
        }
        const idx = this._books.length - 1;// перезаписую останню наявну книгу
        if (idx < 0) {
            console.warn('book: немає книжок для оновлення');
            return;
        }
        const rating = Number(newBook.rating);
        this._books[idx] = {
            title: newBook.title.trim(),
            author: newBook.author.trim(),
            rating: Number.isFinite(rating) ? rating : 0
        };
    },

    // метод > повертає коротке самері
    summary() {
        const count = this._books.length;
        return `${this.name} — ${count} книг(и), середній рейтинг: ${this.averageRating}`;
    },

    // метод > друкує список назв
    printTitles() {
        console.log('Books:');
        this._books.forEach((b, i) => console.log(`${i + 1}. ${b.title} — ${b.author}`));
    }
};

// використання гетерів, сетерів та методів
console.log(library.summary());
library.printTitles();

library.name = 'Hogwarts Grand Library';
library.book = { title: 'Defence Against the Dark Arts', author: 'Various', rating: 4.2 };
library.book = { title: 'History of Magic', author: 'Bathilda Bagshot', rating: 4.0 };
console.log('Updated _books array:', library._books);

console.log(library.summary());
library.printTitles();

// доступ до вкладених значень (2-й рівень)
console.log('City:', library.address.city);
