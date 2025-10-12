// set
const hogwartsHouses = new Set();

hogwartsHouses.add('Gryffindor');
hogwartsHouses.add('Ravenclaw');
hogwartsHouses.add('Hufflepuff');
hogwartsHouses.add('Slytherin');
hogwartsHouses.add('Gryffindor'); // дубль — не додасться

console.log('Hogwarts Houses:', Array.from(hogwartsHouses));

// перевірка чи факультет у списку
if (hogwartsHouses.has('Slytherin')) {
    console.log('Slytherin detected 🐍');
}

// видалення факультету
hogwartsHouses.delete('Ravenclaw');
console.log('After removing Ravenclaw:', Array.from(hogwartsHouses));

// використання Set для видалення дублікатів
const spells = ['Expelliarmus', 'Lumos', 'Lumos', 'Alohomora', 'Lumos'];
const uniqueSpells = Array.from(new Set(spells));
console.log('Unique spells:', uniqueSpells);

// map
const maraudersMap = new Map();

// додаємо учасників із їхніми прізвиськами
maraudersMap.set('James Potter', 'Prongs');
maraudersMap.set('Sirius Black', 'Padfoot');
maraudersMap.set('Remus Lupin', 'Moony');
maraudersMap.set('Peter Pettigrew', 'Wormtail');

console.log('Marauders Map entries:', Array.from(maraudersMap.entries()));

// перевіримо, чи є Снейп на мапі
if (!maraudersMap.has('Severus Snape')) {
    console.log('Snape is NOT on the Marauder’s Map');
}

// додаємо Snape з позначкою “spotted”
maraudersMap.set('Severus Snape', 'Spotted near the library');
console.log('After adding Snape:', Array.from(maraudersMap.entries()));

// отримаємо прізвисько певного учасника
const siriusNickname = maraudersMap.get('Sirius Black');
console.log(`Sirius Black’s nickname is: ${siriusNickname}`);

// отримати всі імена
const names = Array.from(maraudersMap.keys());
console.log('All names on the map:', names);

// отримати всі прізвиська
const nicknames = Array.from(maraudersMap.values());
console.log('All nicknames:', nicknames);

// підрахунок кількості використаних заклять
const spellsCast = ['Lumos', 'Expelliarmus', 'Lumos', 'Alohomora', 'Lumos', 'Alohomora'];
const spellCounter = new Map();

for (const spell of spellsCast) {
    spellCounter.set(spell, (spellCounter.get(spell) || 0) + 1);
}

console.log('Spell usage count:', Array.from(spellCounter.entries()));

// фінальний меседж
console.log('Mischief managed!');
