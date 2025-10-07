// 1) від 0 до 9 із виведенням ітератора
for (let i = 0; i <= 9; i++) {
    console.log('i =', i);
}

// 2) від 100 до 0 з кроком 10 із виведенням ітератора
for (let j = 100; j >= 0; j -= 10) {
    console.log('j =', j);
}

// 3) те саме завдання, але циклом while (0 → 9)
console.log('while loop: 0 → 9');
let i = 0;
while (i <= 9) {
    console.log('i =', i);
    i++;
}

// 4) те саме завдання, але циклом while (100 → 0)
console.log('while loop: 100 → 0');
let j = 100;
while (j >= 0) {
    console.log('j =', j);
    j -= 10;
}

// 5) те саме завдання, але циклом do...while (0 → 9)
console.log('do...while loop: 0 → 9');
let k = 0;
do {
    console.log('k =', k);
    k++;
} while (k <= 9);

// 6) те саме завдання, але циклом do...while (100 → 0)
console.log('do...while loop: 100 → 0');
let m = 100;
do {
    console.log('m =', m);
    m -= 10;
} while (m >= 0);
