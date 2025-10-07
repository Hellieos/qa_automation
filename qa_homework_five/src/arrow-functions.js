// те саме завдання із стрілковою функцією.
const sumArrayArrow = (arr) => {
    if (!Array.isArray(arr)) {
        console.warn('sumArrayArrow: аргумент має бути масивом');
        return 0;
    }
    return arr.reduce((acc, val) => {
        const n = Number(val);
        return Number.isFinite(n) ? acc + n : acc;
    }, 0);
};

// масиви
const numArr = [7, 3, 9];
const strArr = ['4', '5', 'six', '7'];

// виклики
console.log('sumArrayArrow(numArr) =', sumArrayArrow(numArr));       // 19
console.log('sumArrayArrow(strArr) =', sumArrayArrow(strArr));       // 16

export { sumArrayArrow };
