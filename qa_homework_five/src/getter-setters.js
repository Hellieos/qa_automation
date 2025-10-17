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

    // зберігаємо останню перевірену / сетовану книгу окремо
    _lastBook: null,

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

    // ✅ getter/setter для останньої книги (без зміни масиву)
    get lastBook() {
        return this._lastBook;
    },
    set lastBook(value) {
        if (!value || typeof value.title !== 'string' || typeof value.author !== 'string') {
            console.warn('lastBook: некоректна книга');
            return;
        }

        const book = {
            title: value.title.trim(),
            author: value.author.trim(),
            rating: Number(value.rating) || 0
        };

        if (!book.title || !book.author) {
            console.warn('lastBook: порожні поля після нормалізації');
            return;
        }

        // Не змінюємо масив
        this._lastBook = book;
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

// використання
console.log(library.summary());
library.printTitles();

library.name = 'Hogwarts Grand Library';

// цей виклик лише перевіряє й зберігає останню книгу, не змінюючи масив
library.lastBook = { title: 'Defence Against the Dark Arts', author: 'Various', rating: 4.2 };

// гетер повертає останню перевірену книгу
console.log('Last checked book:', library.lastBook);

// масив лишається без змін
console.log('Books array:', library._books);
console.log(library.summary());
