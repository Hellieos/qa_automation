import { beforeAll, describe, expect, test } from 'vitest';
import { ConfigService } from '../../src/services/config.service';
import { FetchApiService } from '../../src/services/fetch-api.service';
import { JokesApi, asJoke, asJokes, asTypes } from '../../src/apis/jokes/jokes.api';
import { JokeDto } from '../../src/models/jokes/joke.dto';

let jokesApi: JokesApi;
let savedJokeId: number;
let knownTypes: string[] = [];

describe('HW12 → 5 API Tests (Official Joke API)', () => {
    beforeAll(() => {
        const config = new ConfigService().getConfig();
        const fetchService = new FetchApiService(config.api.jokes.baseUrl, {});
        jokesApi = new JokesApi(fetchService);
    });

    test('01) GET /random_joke returns a valid joke and saves id', async () => {
        const res = await jokesApi.getRandomJoke();

        expect(res.status).toBe(200);

        const joke = await asJoke(res);

        expect(typeof joke.id).toBe('number');
        expect(typeof joke.type).toBe('string');
        expect(typeof joke.setup).toBe('string');
        expect(typeof joke.punchline).toBe('string');
        expect(joke.setup.length).toBeGreaterThan(0);
        expect(joke.punchline.length).toBeGreaterThan(0);

        savedJokeId = joke.id;
    });

    test('02) GET /jokes/:id returns the same joke by id', async () => {
        const res = await jokesApi.getById(savedJokeId);

        expect(res.status).toBe(200);

        const joke = await asJoke(res);
        expect(joke.id).toBe(savedJokeId);
    });

    test('03) GET /types returns non-empty, unique list of types', async () => {
        const res = await jokesApi.getTypes();

        expect(res.status).toBe(200);

        const types = await asTypes(res);

        expect(Array.isArray(types)).toBe(true);
        expect(types.length).toBeGreaterThan(0);

        types.forEach(t => {
            expect(typeof t).toBe('string');
            expect(t.length).toBeGreaterThan(0);
        });

        const unique = new Set(types);
        expect(unique.size).toBe(types.length);

        knownTypes = types;
    });

    test('04) GET /jokes/random returns a valid joke with known type (if loaded)', async () => {
        const res = await jokesApi.getRandom();

        expect(res.status).toBe(200);

        const joke = await asJoke(res);

        expect(joke).toHaveProperty('id');
        expect(joke).toHaveProperty('type');
        expect(joke).toHaveProperty('setup');
        expect(joke).toHaveProperty('punchline');

        if (knownTypes.length > 0) {
            expect(knownTypes).toContain(joke.type);
        }
    });

    test('05) GET /jokes/ten returns 10 unique jokes with valid shape', async () => {
        const res = await jokesApi.getTen();

        expect(res.status).toBe(200);

        const jokes = await asJokes(res);

        expect(Array.isArray(jokes)).toBe(true);
        expect(jokes.length).toBe(10);

        jokes.forEach((j: JokeDto) => {
            expect(j).toHaveProperty('id');
            expect(j).toHaveProperty('type');
            expect(j).toHaveProperty('setup');
            expect(j).toHaveProperty('punchline');
        });

        const ids = new Set(jokes.map(j => j.id));
        expect(ids.size).toBe(jokes.length);
    });
});
