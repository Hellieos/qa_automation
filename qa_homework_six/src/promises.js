// тут варіант через then()
import { GOOD_BACKUP_URL, LIMIT } from './config.js';

// роблю запит, перевіряю статус
function fetchJson(url) {
    return fetch(url).then((response) => {
    // якщо сервер відповів не 2xx — вважаю це помилкою
        if (!response.ok) {
            throw new Error(`Мережевий збій: ${response.status} ${response.statusText}`);
        }
        response.clone().json().then((json) => {
            console.log('Отриманий JSON:');
            console.log(JSON.stringify(Array.isArray(json) ? json.slice(0, 5) : json, null, 2));
        });

        return response.json(); // віддаємо json далі по ланцюжку
    });
}

// окрема функція, яка перевикористовує той же json
function processData(json) {
    console.log('Обробляю JSON у processData (promises):');
    json.slice(0, LIMIT).forEach((item) => {
        console.log(`- [${item.id}] ${item.title} (completed: ${item.completed})`);
    });
}

// починаю ланцюжок: отримати json -> передати в обробку
fetchJson(GOOD_BACKUP_URL)
    .then(processData)
    .catch((err) => {
    // якщо щось іде не так — ловою тут
        console.error('Помилка в promises.js:', err.message);
    });
