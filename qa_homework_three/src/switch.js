// перевірка switch: хочу щоб воно видавало факультет у Гоґвортсі
const number = 3; // тут я просто вибрала 3 для прикладу

let house;
switch (number) {
    case 1:
        house = 'Gryffindor 🔴';
        break;
    case 2:
        house = 'Slytherin 🟢';
        break;
    case 3:
        house = 'Ravenclaw 🔵';
        break;
    case 4:
        house = 'Hufflepuff 🟡';
        break;
    default:
        house = 'Не впевнена, мабуть Ви магл 🙃';
}

console.log(`Число ${number} -> Ваш факультет: ${house}`);
