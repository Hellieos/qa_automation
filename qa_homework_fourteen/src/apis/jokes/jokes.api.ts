// src/apis/jokes.api.ts
import { IApiService } from '../../services/abstractions/i-api-service';
import { JokeDto, JokeListDto } from '../../models/jokes/joke.dto';

export class JokesApi {
    public constructor(private readonly api: IApiService<Response>) {}

    public getRandomJoke(): Promise<Response> {
        return this.api.get('/random_joke');
    }

    public getById(id: number | string): Promise<Response> {
        return this.api.get(`/jokes/${id}`);
    }

    public getTypes(): Promise<Response> {
        return this.api.get('/types');
    }

    public getRandom(): Promise<Response> {
        return this.api.get('/jokes/random');
    }

    public getTen(): Promise<Response> {
        return this.api.get('/jokes/ten');
    }

    public getRandomCount(n: number): Promise<Response> {
        return this.api.get(`/jokes/random/${n}`);
    }
}

export const asJoke = async (r: Response): Promise<JokeDto> => {
    const json = (await r.json()) as JokeDto;
    return json;
};

export const asJokes = async (r: Response): Promise<JokeListDto> => {
    const json = (await r.json()) as JokeListDto;
    return json;
};

export const asTypes = async (r: Response): Promise<string[]> => {
    const json = (await r.json()) as string[];
    return json;
};
