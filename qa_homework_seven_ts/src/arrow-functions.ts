// те саме завдання із стрілковою функцією (TypeScript)
export const sumArrayArrow = (arr: (number | string)[]): number => {
    if (arr.length === 0) {
        console.warn('sumArray: масив порожній');
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
const emptyArr: string[] = [];

// виклики
console.log('sumArrayArrow(numArr) =', sumArrayArrow(numArr)); // 19
console.log('sumArrayArrow(strArr) =', sumArrayArrow(strArr)); // 16
console.log('sumArrayArrow(emptyArr) =', sumArrayArrow(emptyArr)); //масив порожній > 0
