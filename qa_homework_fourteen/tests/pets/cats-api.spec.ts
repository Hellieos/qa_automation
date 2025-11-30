import { beforeAll, describe, expect, test } from 'vitest';
import { CatApi, CatImage, Vote, Favourite } from '../../src/apis/pets/cats.api';

describe('HW13 → TheCatAPI (votes & favourites)', () => {
    let api: CatApi;
    let randomImage: CatImage;
    let createdVoteId: number;
    let createdFavouriteId: number;

    beforeAll(async () => {
        api = new CatApi();

        // та сама image перевикористана в подальших тестах
        randomImage = await api.getRandomImage();
        expect(randomImage.id).toBeDefined();
        expect(randomImage.url).toMatch(/^https?:\/\//);
    });

    test('01) GET /images/search returns a valid single image', async () => {
        const img = await api.getRandomImage();

        expect(typeof img.id).toBe('string');
        expect(img.url).toMatch(/^https?:\/\//);
        expect(typeof img.width).toBe('number');
        expect(typeof img.height).toBe('number');
    });

    test('02) POST /votes creates an upvote for the image', async () => {
        const res = await api.createVote(randomImage.id, 1);

        expect(res).toHaveProperty('id');
        expect(res).toHaveProperty('message');
        expect(res.message.toLowerCase()).toContain('success');

        createdVoteId = res.id;
    });

    test('03) GET /votes returns list that includes created vote', async () => {
        const votes: Vote[] = await api.listVotes(true);

        expect(Array.isArray(votes)).toBe(true);
        expect(votes.length).toBeGreaterThan(0);

        const found = votes.find(v => v.id === createdVoteId);
        expect(found).toBeDefined();
        expect(found?.image_id).toBe(randomImage.id);
        if (found?.image) {
            expect(found.image.url).toMatch(/^https?:\/\//);
        }
    });

    test('04) POST /favourites creates a favourite for the image', async () => {
        const res = await api.createFavourite(randomImage.id);

        expect(res).toHaveProperty('id');
        expect(res).toHaveProperty('message');
        expect(res.message.toLowerCase()).toContain('success');

        createdFavouriteId = res.id;
    });

    test('05) GET /favourites returns list that includes created favourite', async () => {
        const favs: Favourite[] = await api.listFavourites(true);

        expect(Array.isArray(favs)).toBe(true);
        expect(favs.length).toBeGreaterThan(0);

        const found = favs.find(f => f.id === createdFavouriteId);
        expect(found).toBeDefined();
        expect(found?.image_id).toBe(randomImage.id);
        if (found?.image) {
            expect(found.image.url).toMatch(/^https?:\/\//);
        }
    });
});
