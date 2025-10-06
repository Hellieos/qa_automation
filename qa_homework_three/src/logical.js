// різні типи даних
const a = 7;          // число
const b = '7';        // string
const c = 0;          // 0
const d = true;       // булеве значення
const e = null;       // null
const obj = { x: 10 };// простий об'єкт для прикладу

console.log('== Порівняння ==');
console.log('a == b  ->', a == b);   // так, тут true
console.log('a === b ->', a === b);  // тут вже false (строге порівняння)
console.log('a > 5   ->', a > 5);
console.log('a <= 7  ->', a <= 7);

console.log('\n== Логічні оператори ==');
console.log('d && (a > 5) ->', d && (a > 5));
console.log('d || (a > 100) ->', d || (a > 100));
console.log('!d ->', !d);
console.log('!!c (чи 0 truthy?) ->', !!c);  // очікувано false

console.log('\n== Null, falsy і всяке інше ==');
console.log('e == null ->', e == null);
console.log('e === null ->', e === null);
console.log('c || 42 ->', c || 42);         // повертає 42, бо 0 falsy
console.log('obj && obj.x ->', obj && obj.x);
