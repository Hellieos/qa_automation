import * as dotenv from 'dotenv';

export class ConfigService {
    public constructor() {
        // load .env (CAT_API_BASE, CAT_API_KEY, CAT_SUB_ID)
        dotenv.config();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getConfig() {
        const catApiBase = process.env.CAT_API_BASE ?? 'https://api.thecatapi.com/v1';
        const catApiKey = process.env.CAT_API_KEY ?? '';
        const catSubId = process.env.CAT_SUB_ID ?? '';

        return {
            api: {
                jokes: {
                    baseUrl: 'https://official-joke-api.appspot.com'
                },
                // single pets URL used for both Cats and Dogs (HW13)
                pets: {
                    baseUrl: catApiBase
                }
            },
            auth: {
                pets: {
                    apiKey: catApiKey,
                    subId: catSubId
                }
            }
        };
    }
}
