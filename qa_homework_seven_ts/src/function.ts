// звичайна функція, що приймає масив і повертає суму його елементів (TypeScript)
// string значення перетворити в число
export function sumArray(arr: (number | string)[]): number {
    if (arr.length === 0) {
        console.warn('sumArray: масив порожній');
        return 0;
    }

    return arr.reduce((acc: number, val: number | string) => {
        const n = Number(val);
        return Number.isFinite(n) ? acc + n : acc;
    }, 0);
}

// масиви
const numbers: number[] = [1, 2, 3, 4, 5];
const stringNumbers: string[] = ['10', '20', '30', 'not-a-number'];
const emptyArr: string[] = [];

// виклики
console.log('sumArray(numbers) =', sumArray(numbers));             // 15
console.log('sumArray(stringNumbers) =', sumArray(stringNumbers)); // 60 (рядки-конвертуються)
console.log('sumArray(emptyArr) =', sumArray(emptyArr)); //масив порожній > 0
