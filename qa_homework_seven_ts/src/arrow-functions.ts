// те саме завдання із стрілковою функцією (TypeScript)
export const sumArrayArrow = (arr: readonly (number | string)[]): number => {
// (опціонально) рантайм-перевірка, лишаємо як у JS-варіанті
    if (!Array.isArray(arr)) {
        console.warn('sumArrayArrow: аргумент має бути масивом');
        return 0;
    }

    return arr.reduce((acc: number, val: number | string) => {
        const n = Number(val);
        return Number.isFinite(n) ? acc + n : acc;
    }, 0);
};

// масиви
const numArr: number[] = [7, 3, 9];
const strArr: string[] = ['4', '5', 'six', '7'];

// виклики
console.log('sumArrayArrow(numArr) =', sumArrayArrow(numArr)); // 19
console.log('sumArrayArrow(strArr) =', sumArrayArrow(strArr)); // 16
