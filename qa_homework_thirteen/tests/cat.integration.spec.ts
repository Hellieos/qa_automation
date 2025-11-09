import { expect } from 'chai';
import { CatApi } from '../src/cat-service';

describe('TheCatAPI integration: images → votes → favourites', function () {
    this.timeout(20000);
    const api = new CatApi();

    let imageId = '';
    let voteId: number | null = null;
    let favouriteId: number | null = null;

    it('1) fetches random image', async () => {
        const img = await api.getRandomImage();
        imageId = img.id;
        expect(img).to.include.keys('id', 'url');
    });

    it('2) votes for the image', async () => {
        const res = await api.createVote(imageId, 1);
        voteId = res.id;
        expect(res).to.have.property('id');
    });

    it('3) favourites that image', async () => {
        const res = await api.createFavourite(imageId);
        favouriteId = res.id;
        expect(res).to.have.property('id');
    });

    it('4) verifies both linked to same image', async () => {
        const [votes, favs] = await Promise.all([api.listVotes(), api.listFavourites()]);
        expect(votes.some(v => v.image_id === imageId)).to.be.true;
        expect(favs.some(f => f.image_id === imageId)).to.be.true;
    });

    it('5) cleanup', async () => {
        if (favouriteId) await api.deleteFavourite(favouriteId);
        if (voteId) await api.deleteVote(voteId);
    });
});
