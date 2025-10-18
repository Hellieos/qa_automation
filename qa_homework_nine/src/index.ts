import { HogwartsHouse } from './interfaces';
import { Wizard, Witch, Auror, DeathEater, HouseElf, Hippogriff, PotionMaster } from './entities';
import { duel, patrolOnBroom, brewLesson, report } from './services';

// Створення екземплярів
const harry = new Wizard('Harry Potter', HogwartsHouse.Gryffindor);
const hermione = new Witch('Hermione Granger', HogwartsHouse.Gryffindor);
const snape = new PotionMaster('Severus Snape', HogwartsHouse.Slytherin);
const auror = new Auror('Kingsley Shacklebolt', HogwartsHouse.Gryffindor);
const de = new DeathEater('Bellatrix Lestrange', HogwartsHouse.Slytherin);
const dobby = new HouseElf('Dobby');
const buckbeak = new Hippogriff('Buckbeak');

// Працюємо через інтерфейси (поліморфізм)
duel(harry, de, 'Expelliarmus', 'Crucio');
duel(auror, de, 'Stupefy', 'Avada Kedavra');

brewLesson(snape, 'Draught of Living Death');

patrolOnBroom(buckbeak, 12);

// Додаткові дії
console.log('🟢 Extra casting:');
console.log(dobby.cast('Apparition', harry));
console.log(hermione.cast('Protego', harry));

// Загальний репорт
console.log('🔵 Report:');
[harry, hermione, snape, auror, de, dobby, buckbeak].forEach(report);
