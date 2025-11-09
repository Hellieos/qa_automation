import { DogService } from '../src/dog-service';
import { expect } from 'chai';
import * as path from 'path';

type PactModule = typeof import('@pact-foundation/pact');

let PactV3: PactModule['PactV3'];
let MatchersV3: PactModule['MatchersV3'];
let Verifier: PactModule['Verifier'];
let provider: InstanceType<PactModule['PactV3']>;

before(async () => {
    const pact: PactModule = await import('@pact-foundation/pact');
    ({ PactV3, MatchersV3, Verifier } = pact);
});

describe('Pact: Dog API contract tests (/images)', () => {
    let dogService: DogService;
    const apiKey = 'live_RkOPUkQ3fRTNFFXDKg9MPCIfmAHVRMgFcMLbF14PUobewScZYbXnyM1Jw5OQkEj0';

    // create provider AFTER Pact is loaded
    before(() => {
        provider = new PactV3({
            consumer: 'dogs-consumer',
            provider: 'dogs-provider'
        });
    });

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const expectedBody = () =>
        MatchersV3.eachLike({
            id: MatchersV3.string('abc123'),
            url: MatchersV3.string('https://cdn2.thedogapi.com/images/example.jpg'),
            width: MatchersV3.integer(1200),
            height: MatchersV3.integer(800),
            breeds: MatchersV3.eachLike({}, 0),
            sub_id: MatchersV3.string('Vi Le'),
            created_at: MatchersV3.string('2025-10-27T11:06:38.000Z'),
            original_filename: MatchersV3.string('file.jpg'),
            breed_ids: MatchersV3.nullValue()
        });

    it('consumer contract for GET /images', () => {
        provider
            .given('dogs exist')
            .uponReceiving('a request for dogs')
            .withRequest({
                method: 'GET',
                path: '/images',
                headers: {
                    'x-api-key': apiKey,
                    accept: '*/*'
                }
            })
            .willRespondWith({
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: expectedBody()
            });

        return provider.executeTest(async (mockServer) => {
            dogService = new DogService(mockServer.url);
            const images = await dogService.getDogsImages();

            expect(images[0]).to.include.keys('id', 'url', 'width', 'height');
            expect(images[0].id).to.be.a('string');
            expect(images[0].url).to.be.a('string');
        });
    });

    it('provider verification', async () => {
        await new Verifier({
            providerBaseUrl: 'https://api.thedogapi.com/v1',
            pactUrls: [path.resolve(process.cwd(), 'pacts', 'dogs-consumer-dogs-provider.json')]
        }).verifyProvider();
    });
});
