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
        try {
            console.log(`Пробую запасний запит: ${GOOD_BACKUP_URL}`);
            const backupResult = await fetchWithCheck(GOOD_BACKUP_URL);
            console.log('Запасний запит спрацював! Кілька перших записів:');
            backupResult.slice(0, 3).forEach(item =>
                console.log(`- [${item.id}] ${item.title} (completed: ${item.completed})`)
            );
        } catch (err2) {
        // якщо запасний впав — кидаю кастомну помилку
            const customErr = new Error(`Обидва запити не спрацювали. Остання помилка: ${err2.message}`);
            console.error(customErr.message);
            throw customErr; // передаю далі, щоб її можна було спіймати вище
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

// викликаємо кілька разів, щоб побачити, як все працює
(async function runAll() {
    await initializeTestData();
    await initializeTestData();
})();
