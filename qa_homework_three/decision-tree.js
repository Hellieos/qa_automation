// Сортувальний Капелюх: вибір факультету за рисами характеру
// коментарі залишаю як власні нотатки — щоб не загубитися в умовах

//можна підміняти значення цих const, щоб перевіряти різні факультети
const bravery = 0;     // хоробрість (1–10)
const ambition = 2;    // амбіції
const wisdom   = 1;    // розум
const loyalty  = 4;    // відданість

// «загальна магічність» — просто для зручної перевірки
const magicScore = bravery + ambition + wisdom + loyalty;

let house;

// якщо показники дуже низькі — схоже, без магії :) => магл
if (magicScore <= 12 || (bravery <= 3 && ambition <= 3 && wisdom <= 3 && loyalty <= 3)) {
  house = "Muggle (магл 🙃";
} else if (bravery >= 7 && ambition < 7) {
  house = "Gryffindor 🔴";             // сюди, коли хоробра більше за все
} else if (ambition >= 7 && loyalty <= 5) {
  house = "Slytherin 🟢";              // амбіції перемагають, відданість нижча
} else if (wisdom >= 7 || (bravery < 7 && loyalty < 7)) {
  house = "Ravenclaw 🔵";              // розум високий або мікс умов нижче
} else {
  house = "Hufflepuff 🟡";             // решта кейсів сюди
}

console.log(
  `bravery=${bravery}, ambition=${ambition}, wisdom=${wisdom}, loyalty=${loyalty}, magicScore=${magicScore} -> факультет: ${house}`
);