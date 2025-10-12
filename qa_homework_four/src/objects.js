const user = {
    id: 1,
    name: 'Harry Potter',
    isActive: true,
    address: {
        city: 'Little Whinging',
        street: '4 Privet Drive',
        zip: 'HP7'
    }, // 2й рівень ієрархії
    hobbies: ['quidditch', 'night walks', 'hunting horcruxes'], // масив у складі об'єкта
    greet() { // метод, що виводить значення
        console.log(`Hello, I am ${this.name} from ${this.address.city}.`);
    }
};

user.greet();

// доступ до вкладених значень
console.log('First hobby:', user.hobbies[0]);

// динамічне додавання властивості та виведення ключів і значень
user.stats = { bestFriends: 2, demolishedHorcruxes: 7 };
console.log('keys:', Object.keys(user));
console.log('values:', Object.values(user).map(v => (typeof v)));
console.log('Full object:', JSON.stringify(user, null, 2));

// приклад методу, що читає масив усередині об'єкта
user.printHobbies = function () {
    console.log('Hobbies:');
    this.hobbies.forEach((h, i) => console.log(`${i + 1}. ${h}`));
};

user.printHobbies();
