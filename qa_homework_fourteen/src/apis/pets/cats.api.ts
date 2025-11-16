import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export interface CatImage {
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface Vote {
    id: number;
    image_id: string;
    value: 1 | 0;
    sub_id?: string;
    created_at?: string;
    country_code?: string;
    image?: { id: string; url: string };
}

export interface Favourite {
    id: number;
    image_id: string;
    sub_id?: string;
    created_at?: string;
    image?: { id: string; url: string };
}

export class CatApi {
    private http: AxiosInstance;
    private subId: string;

    public constructor() {
        const baseURL = process.env.CAT_API_BASE || 'https://api.thecatapi.com/v1';
        const apiKey = process.env.CAT_API_KEY || '';
        this.subId = process.env.CAT_SUB_ID || 'demo-sub';

        this.http = axios.create({
            baseURL,
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            timeout: 10000,
            validateStatus: () => true
        });
    }

    public async getRandomImage(): Promise<CatImage> {
        const res = await this.http.get('/images/search', { params: { limit: 1 } });
        if (!Array.isArray(res.data) || !res.data[0]?.id) {
            throw new Error(`Unexpected /images/search response: ${res.status}`);
        }
        return res.data[0];
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async createVote(image_id: string, value: 1 | 0) {
        const res = await this.http.post('/votes', { image_id, value, sub_id: this.subId });
        if (res.status !== 200 && res.status !== 201)
            throw new Error(`POST /votes failed: ${res.status}`);
        return res.data as { message: string; id: number };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async deleteVote(id: number) {
        const res = await this.http.delete(`/votes/${id}`);
        if (res.status !== 200 && res.status !== 404)
            throw new Error(`DELETE /votes/${id} failed: ${res.status}`);
        return res.data;
    }

    public async listVotes(includeImage = true): Promise<Vote[]> {
        const res = await this.http.get('/votes', {
            params: {
                sub_id: this.subId,
                limit: 100,
                order: 'DESC',
                include_image: includeImage ? 1 : 0
            }
        });
        if (res.status !== 200) throw new Error(`GET /votes failed: ${res.status}`);
        return res.data;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async createFavourite(image_id: string) {
        const res = await this.http.post('/favourites', { image_id, sub_id: this.subId });
        if (res.status !== 200)
            throw new Error(`POST /favourites failed: ${res.status}`);
        return res.data as { message: string; id: number };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async deleteFavourite(id: number) {
        const res = await this.http.delete(`/favourites/${id}`);
        if (res.status !== 200 && res.status !== 404)
            throw new Error(`DELETE /favourites/${id} failed: ${res.status}`);
        return res.data;
    }

    public async listFavourites(includeImage = true): Promise<Favourite[]> {
        const res = await this.http.get('/favourites', {
            params: {
                sub_id: this.subId,
                limit: 100,
                order: 'DESC',
                include_image: includeImage ? 1 : 0
            }
        });
        if (res.status !== 200)
            throw new Error(`GET /favourites failed: ${res.status}`);
        return res.data;
    }
}
