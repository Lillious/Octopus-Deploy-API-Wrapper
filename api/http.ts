export default class HTTP {
    private headers: Headers;
    public constructor(public config: IOctopusAPI) {
        this.headers = new Headers({
            "X-Octopus-ApiKey": config.apiKey,
            "Content-Type": "application/json",
        });
    }

    private async request(url: string, method: string, body?: any): Promise<any> {
        const result = await fetch(url, {
            method,
            headers: this.headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (result.ok) return await result.json();

        try {
            JSON.parse(result.statusText);
        } catch (e) {
            return {
                response: {
                    status: 500,
                    message: "An unknown error occurred",
                    errors: {},
                },
            } as ApiResponse<object>;
        }

        const response = (await result.json()) as { ErrorMessage: string; Errors: object };
        return {
            response: {
                status: result.status as number,
                message: response.ErrorMessage as string,
                errors: { ...response.Errors } as object,
            },
        } as ApiResponse<object>;
    }

    public post(url: string, body?: any): Promise<any> {
        return this.request(url, 'POST', body);
    }

    public get(url: string): Promise<any> {
        return this.request(url, 'GET');
    }

    public delete(url: string): Promise<any> {
        return this.request(url, 'DELETE');
    }

    public put(url: string, body?: any): Promise<any> {
        return this.request(url, 'PUT', body);
    }
}