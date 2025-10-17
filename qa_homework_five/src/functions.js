// звичайна функція, що приймає масив і повертає суму його елементів
// string значення перетворити в число > якщо не вийшло — ігнорувати
function sumArray(arr) {
    if (!Array.isArray(arr)) {
        console.warn('sumArray: аргумент має бути масивом');
        return 0;
    }
    return arr.reduce((acc, val) => {
        const n = Number(val);
        return Number.isFinite(n) ? acc + n : acc;
    }, 0);
}

// масиви
const numbers = [1, 2, 3, 4, 5];
const stringNumbers = ['10', '20', '30', 'not-a-number'];

// виклики
console.log('sumArray(numbers) =', sumArray(numbers));               // 15
console.log('sumArray(stringNumbers) =', sumArray(stringNumbers));   // 60 (рядки-конвертуються)
// експорт для імпорту
export { sumArray };
