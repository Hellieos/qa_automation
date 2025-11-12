import { expect } from 'chai';
import { CatApi } from '../src/cat-service';

describe('TheCatAPI integration: images → votes → favourites', function () {
    this.timeout(30000);
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

    it('4) verifies both linked to same image and pull image object by ID', async () => {
        // прошу API включити об'єкт image у відповіді
        const [votes, favs] = await Promise.all([api.listVotes(true), api.listFavourites(true)]);

        const myVote = votes.find(v => v.id === voteId);
        const myFav = favs.find(f => f.id === favouriteId);

        // зв’язок за image_id
        expect(myVote?.image_id).to.equal(imageId);
        expect(myFav?.image_id).to.equal(imageId);

        // у відповіді присутній вкладений image-об'єкт саме з тим ID і валідним URL
        expect(myVote?.image).to.include.keys('id', 'url');
        expect(myVote?.image?.id).to.equal(imageId);
        expect(myVote?.image?.url).to.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i);

        expect(myFav?.image).to.include.keys('id', 'url');
        expect(myFav?.image?.id).to.equal(imageId);
        expect(myFav?.image?.url).to.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i);
    });

    it('5) cleanup', async () => {
        const ops: Promise<unknown>[] = [];
        if (favouriteId != null) ops.push(api.deleteFavourite(favouriteId).catch(() => { /* empty */ }));
        if (voteId != null) ops.push(api.deleteVote(voteId).catch(() => { /* empty */ }));
        await Promise.allSettled(ops);
    });
});
