// почала з чисел
const n1 = 10;
const n2 = 3;

// пробую те саме, але рядки які виглядають як числа
const s1 = "10";
const s2 = "3";

// булеві
const t = true;
const f = false;

console.log("== Числа з числами ==");
console.log("n1 + n2 =", n1 + n2);
console.log("n1 - n2 =", n1 - n2);
console.log("n1 * n2 =", n1 * n2);
console.log("n1 / n2 =", n1 / n2);
console.log("n1 % n2 =", n1 % n2);
console.log("n1 ** n2 =", n1 ** n2);

console.log("\n== Рядки з string ==");
console.log('s1 + s2 =', s1 + s2); // тут вийшло просто зліплення
console.log('s1 - s2 =', s1 - s2); // а тут вже перетворилося в числа
console.log('s1 * s2 =', s1 * s2);
console.log('s1 / s2 =', s1 / s2);

console.log("\n== Мікс різних типів ==");
console.log("n1 + s1 =", n1 + s1); // додає число до рядка
console.log("n1 - s1 =", n1 - s1); // тут навпаки, JS зробив з рядка число
console.log("n2 * t =", n2 * Number(t));
console.log("n2 * f =", n2 * Number(f));
console.log("унарний +s1 =", +s1, "=> результат з n2 =", +s1 + n2); // пробую + перед рядком, щоб JS зробив з нього число
