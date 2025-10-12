// 4 масиви: рядки, числа, boolean, any (змішаний)
const strings = ['apple', 'banana', 'cherry'];
const numbers = [1, 2, 3, 4, 5];
const booleans = [true, false, true, true];
const any = ['mix', 42, true, { k: 'v' }, [1, 2]];

// базові операції
strings.push('dragon fruit');       // додати в кінець
strings.unshift('avocado');         // додати на початок
const lastStr = strings.pop();      // видалити з кінця
const firstStr = strings.shift();   // видалити з початку

const doubled = numbers.map(n => n * 2);                  // map()
const evens = numbers.filter(n => n % 2 === 0);           // filter()
const sum = numbers.reduce((acc, n) => acc + n, 0);       // reduce()

// forEach()
console.log('forEach strings');
strings.forEach((val, idx) => console.log(idx, val));

console.log('map numbers (подвоєні)');
console.log(doubled);

console.log('filter numbers (парні)');
console.log(evens);

console.log('reduce numbers (сума)', sum);

// слайси/сплайси/конкатенація
const sliceOfStrings = strings.slice(0, 2);               // копія частини
const numbersCopy = numbers.slice();
numbersCopy.splice(2, 1, 99);                             // заміна 1 елементу з індексу 2
const merged = strings.concat(['elderberry', 'fig']);     // конкатенація

console.log({ strings, lastStr, firstStr });
console.log({ numbers, doubled, evens, sum });
console.log({ booleans });
console.log({ any });
console.log({ sliceOfStrings, numbersCopy, merged });
