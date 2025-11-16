import { IApiService } from './abstractions/i-api-service';

export class FetchApiService implements IApiService<Response> {
    public constructor(
        private readonly baseUrl: string,
        private readonly secret: {
            apiKey?: string;
            basicToken?: string;
            bearerToken?: string;
        } = {}
    ) {}

    public async get(
        uri: string,
        params?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ): Promise<Response> {
        const qs = params
            ? '?' +
              Object.entries(params)
                  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
                  .join('&')
            : '';

        return fetch(`${this.baseUrl}${uri}${qs}`, {
            method: 'GET',
            headers: this.getDefaultHeaders(headers)
        });
    }

    public async post(
        uri: string,
        body: unknown,
        headers?: Record<string, string>
    ): Promise<Response> {
        return fetch(`${this.baseUrl}${uri}`, {
            method: 'POST',
            headers: this.getDefaultHeaders(headers, true),
            body: JSON.stringify(body)
        });
    }

    public async postForm(
        uri: string,
        formData: FormData,
        headers?: Record<string, string>
    ): Promise<Response> {
        return fetch(`${this.baseUrl}${uri}`, {
            method: 'POST',
            headers: this.getDefaultHeaders(headers, false),
            body: formData
        });
    }

    public async put(
        uri: string,
        body: unknown,
        headers?: Record<string, string>
    ): Promise<Response> {
        return fetch(`${this.baseUrl}${uri}`, {
            method: 'PUT',
            headers: this.getDefaultHeaders(headers, true),
            body: JSON.stringify(body)
        });
    }

    public async delete(
        uri: string,
        headers?: Record<string, string>
    ): Promise<Response> {
        return fetch(`${this.baseUrl}${uri}`, {
            method: 'DELETE',
            headers: this.getDefaultHeaders(headers)
        });
    }

    private getDefaultHeaders(
        headers?: Record<string, string>,
        isJson?: boolean
    ): Record<string, string> {
        return {
            ...this.getAuthHeaders(),
            ...(isJson ? { 'Content-Type': 'application/json' } : {}),
            Accept: 'application/json',
            ...headers
        };
    }

    private getAuthHeaders(): Record<string, string> {
        const h: Record<string, string> = {};
        if (this.secret.apiKey) {
            h['x-api-key'] = this.secret.apiKey;
        } else if (this.secret.basicToken) {
            h['Authorization'] = `Basic ${this.secret.basicToken}`;
        } else if (this.secret.bearerToken) {
            h['Authorization'] = `Bearer ${this.secret.bearerToken}`;
        }
        return h;
    }
}
