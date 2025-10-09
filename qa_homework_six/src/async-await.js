// той самий фокус, що й у promises.js, але через async/await
import { GOOD_BACKUP_URL, LIMIT } from './config.js';

// хелпер функція: зробити запит і перевірити, чи все ок
async function getJson(url) {
    const response = await fetch(url);
    // якщо статус не ок — кидаю помилку і ловлю вище
    if (!response.ok) {
        throw new Error(`Мережевий збій: ${response.status} ${response.statusText}`);
    }
    response.clone().json().then((json) => {
        console.log('Отриманий JSON:');
        console.log(JSON.stringify(Array.isArray(json) ? json.slice(0, 5) : json, null, 2));
    });
    return response.json(); // повертаю вже розпарсений json
}

// перевикористана функція, що й у promises.js,
function processData(json) {
    console.log('Обробляю JSON у processData (async/await):');
    json.slice(0, LIMIT).forEach((item) => {
        console.log(`- [${item.id}] ${item.title} (completed: ${item.completed})`);
    });
}

async function main() {
    try {
        const json = await getJson(GOOD_BACKUP_URL);
        processData(json);
    } catch (err) {
        console.error('Помилка в async-await.js:', err.message);
    }
}

main(); // викликаю функцію
