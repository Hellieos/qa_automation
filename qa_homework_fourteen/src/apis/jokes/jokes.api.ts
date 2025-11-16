import { IApiService } from '../../services/abstractions/i-api-service';
import { JokeDto, JokeListDto } from '../../models/jokes/joke.dto';

export class JokesApi {
    public constructor(private readonly api: IApiService<Response>) {}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getRandomJoke() {
        return this.api.get('/random_joke');
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getById(id: number | string) {
        return this.api.get(`/jokes/${id}`);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getTypes() {
        return this.api.get('/types');
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getRandom() {
        return this.api.get('/jokes/random');
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getTen() {
        return this.api.get('/jokes/ten');
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getRandomCount(n: number) {
        return this.api.get(`/jokes/random/${n}`);
    }
}

export const asJoke = async (r: Response): Promise<JokeDto> => r.json();
export const asJokes = async (r: Response): Promise<JokeListDto> => r.json();
export const asTypes = async (r: Response): Promise<string[]> => r.json();
