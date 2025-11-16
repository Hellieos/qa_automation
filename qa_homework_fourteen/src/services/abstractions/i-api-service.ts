export interface IApiService<TResponse = Response> {
    get(
        uri: string,
        params?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ): Promise<TResponse>;

    post(
        uri: string,
        body: unknown,
        headers?: Record<string, string>
    ): Promise<TResponse>;

    postForm(
        uri: string,
        formData: FormData,
        headers?: Record<string, string>
    ): Promise<TResponse>;

    put(
        uri: string,
        body: unknown,
        headers?: Record<string, string>
    ): Promise<TResponse>;

    delete(
        uri: string,
        headers?: Record<string, string>
    ): Promise<TResponse>;
}
