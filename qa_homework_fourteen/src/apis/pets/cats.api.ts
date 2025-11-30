import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

// TYPES

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

export interface CreateVoteResponse {
    message: string;
    id: number;
}

export interface CreateFavouriteResponse {
    message: string;
    id: number;
}

// CLASS

export class CatApi {
    private readonly http: AxiosInstance;
    private readonly subId: string;

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
            timeout: 10_000,
            validateStatus: () => true
        });
    }

    // 1) GET /images/search → CatImage
    public async getRandomImage(): Promise<CatImage> {
        const res: AxiosResponse<CatImage[]> = await this.http.get('/images/search', {
            params: { limit: 1 }
        });

        if (!Array.isArray(res.data) || !res.data[0]?.id) {
            throw new Error(`Unexpected /images/search response: ${res.status}`);
        }

        return res.data[0];
    }

    // 2) POST /votes → CreateVoteResponse
    public async createVote(imageId: string, value: 1 | 0): Promise<CreateVoteResponse> {
        const res: AxiosResponse<CreateVoteResponse> = await this.http.post('/votes', {
            image_id: imageId,
            value,
            sub_id: this.subId
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error(`POST /votes failed: ${res.status}`);
        }

        return res.data;
    }

    // 3) DELETE /votes/:id → unknown (we just don’t care about shape)
    public async deleteVote(id: number): Promise<unknown> {
        const res: AxiosResponse<unknown> = await this.http.delete(`/votes/${id}`);

        if (res.status !== 200 && res.status !== 404) {
            throw new Error(`DELETE /votes/${id} failed: ${res.status}`);
        }

        return res.data;
    }

    // 4) GET /votes → Vote[]
    public async listVotes(includeImage = true): Promise<Vote[]> {
        const res: AxiosResponse<Vote[]> = await this.http.get('/votes', {
            params: {
                sub_id: this.subId,
                limit: 100,
                order: 'DESC',
                include_image: includeImage ? 1 : 0
            }
        });

        if (res.status !== 200) {
            throw new Error(`GET /votes failed: ${res.status}`);
        }

        return res.data;
    }

    // 5) POST /favourites → CreateFavouriteResponse
    public async createFavourite(imageId: string): Promise<CreateFavouriteResponse> {
        const res: AxiosResponse<CreateFavouriteResponse> = await this.http.post('/favourites', {
            image_id: imageId,
            sub_id: this.subId
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error(`POST /favourites failed: ${res.status}`);
        }

        return res.data;
    }

    // 6) DELETE /favourites/:id → unknown
    public async deleteFavourite(id: number): Promise<unknown> {
        const res: AxiosResponse<unknown> = await this.http.delete(`/favourites/${id}`);

        if (res.status !== 200 && res.status !== 404) {
            throw new Error(`DELETE /favourites/${id} failed: ${res.status}`);
        }

        return res.data;
    }

    // 7) GET /favourites → Favourite[]
    public async listFavourites(includeImage = true): Promise<Favourite[]> {
        const res: AxiosResponse<Favourite[]> = await this.http.get('/favourites', {
            params: {
                sub_id: this.subId,
                limit: 100,
                order: 'DESC',
                include_image: includeImage ? 1 : 0
            }
        });

        if (res.status !== 200) {
            throw new Error(`GET /favourites failed: ${res.status}`);
        }

        return res.data;
    }
}
