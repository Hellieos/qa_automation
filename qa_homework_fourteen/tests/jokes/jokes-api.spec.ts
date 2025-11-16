import { describe, test, expect, beforeAll } from 'vitest';
import { ConfigService } from '../../src/services/config.service';
import { FetchApiService } from '../../src/services/fetch-api.service';
import { JokesApi, asJoke, asJokes, asTypes } from '../../src/apis/jokes/jokes.api';

describe('HW12 → 5 API Tests (Official Joke API)', () => {
    let jokes: JokesApi;
    let savedId: number;
    let knownTypes: string[] = [];

    beforeAll(() => {
        const cfg = new ConfigService().getConfig();
        const fetchSvc = new FetchApiService(cfg.api.jokes.baseUrl);
        jokes = new JokesApi(fetchSvc);
    });

    test('01) GET /random_joke', async () => {
        const res = await jokes.getRandomJoke();
        expect(res.status).toBe(200);

        const json = await asJoke(res);
        expect(json).toMatchObject({
            id: expect.any(Number),
            type: expect.any(String),
            setup: expect.any(String),
            punchline: expect.any(String)
        });

        savedId = json.id;
    });

    test('02) GET /jokes/:id', async () => {
        const res = await jokes.getById(savedId);
        expect(res.status).toBe(200);

        const json = await asJoke(res);
        expect(json.id).toBe(savedId);
    });

    test('03) GET /types', async () => {
        const res = await jokes.getTypes();
        expect(res.status).toBe(200);

        const arr = await asTypes(res);
        expect(arr.length).toBeGreaterThan(0);

        arr.forEach(t => expect(typeof t).toBe('string'));
        expect(new Set(arr).size).toBe(arr.length);

        knownTypes = arr;
    });

    test('04) GET /jokes/random', async () => {
        const res = await jokes.getRandom();
        expect(res.status).toBe(200);

        const json = await asJoke(res);

        ['id', 'type', 'setup', 'punchline'].forEach(k => expect(json).toHaveProperty(k));

        if (knownTypes.length) {
            expect(knownTypes).toContain(json.type);
        }
    });

    test('05) GET /jokes/ten', async () => {
        const res = await jokes.getTen();
        expect(res.status).toBe(200);

        const list = await asJokes(res);
        expect(list.length).toBe(10);

        const ids = new Set(list.map(j => j.id));
        expect(ids.size).toBe(list.length);
    });
});
