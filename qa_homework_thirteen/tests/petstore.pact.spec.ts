import { expect } from 'chai';
import axios from 'axios';

type PactModule = typeof import('@pact-foundation/pact');

let PactV3: PactModule['PactV3'];
let MatchersV3: PactModule['MatchersV3'];
let provider: InstanceType<PactModule['PactV3']>;

before(async () => {
    const pact: PactModule = await import('@pact-foundation/pact');
    ({ PactV3, MatchersV3 } = pact);
});

describe('Pact: Petstore consumer (GET /pet/{petId})', () => {
    // create provider AFTER Pact is loaded
    before(() => {
        provider = new PactV3({
            consumer: 'petstore-consumer',
            provider: 'petstore-provider'
        });
    });

    it('creates a contract for GET /pet/1', () => {
        provider
            .given('pet with id 1 exists')
            .uponReceiving('a request for pet 1')
            .withRequest({
                method: 'GET',
                path: '/pet/1',
                headers: { accept: 'application/json' }
            })
            .willRespondWith({
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: MatchersV3.like({
                    id: MatchersV3.integer(1),
                    name: MatchersV3.string('doggie'),
                    status: MatchersV3.string('available')
                })
            });

        return provider.executeTest(async (mockServer) => {
            const res = await axios.get(`${mockServer.url}/pet/1`, {
                headers: { accept: 'application/json' }
            });
            expect(res.status).to.equal(200);
            expect(res.data).to.have.keys(['id', 'name', 'status']);
        });
    });
});
