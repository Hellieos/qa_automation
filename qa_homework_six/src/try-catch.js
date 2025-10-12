// тут ловлю помилки і підміняю запити на запасний варіант
import { INVALID_URL, GOOD_BACKUP_URL } from './config.js';


// функція fetch перевірити, чи все ок
async function fetchWithCheck(url) {
    const response = await fetch(url);
    // якщо сервер відповів, але статус не 200 — кидає помилку
    if (!response.ok) {
        throw new Error(`Погана відповідь від ${url}: ${response.status} ${response.statusText}`);
    }
    response.clone().json().then((json) => {
        console.log('Отриманий JSON:');
        console.log(JSON.stringify(Array.isArray(json) ? json.slice(0, 5) : json, null, 2));
    });

    return response.json();
}

// основна функція, де спочатку один запит, потім інший
async function sendImprovisedApiRequest() {
    console.log('\nВідправляю API-запит');
    try {
        return await fetchWithCheck(INVALID_URL);
    } catch (err) {
    // якщо основний впав — ловлю помилку
        console.warn('Основний запит не вдався:', err.message);

        // пробую запасний
        if (err.message.includes('Погана відповідь')) {
            return await fetchWithCheck(GOOD_BACKUP_URL);
        } else {
            throw err;
        }
    }
}

// обгортка, щоб не падав код, навіть якщо все пішло не так
async function initializeTestData() {
    try {
        await sendImprovisedApiRequest();
    } catch (err) {
        console.error('initializeTestData: не вдалося підготувати тестові дані:', err.message);
    }
}

// викликаю, щоб побачити, як все працює
(async () => {
    await initializeTestData();
})();
