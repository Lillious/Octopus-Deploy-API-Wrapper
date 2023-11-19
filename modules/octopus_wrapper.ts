const API_KEY = process.env.API_KEY as string;
const API_URL = process.env.API_URL as string;

import fetch from 'node-fetch';

type ApiResponse<T = any> = {
    response: {
        status: number;
        message: string;
        errors: T;
    };
};

class Client {
    private apiKey: string;
    private apiUrl: string;

    constructor(apiKey: string, apiUrl: string) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }

    private async baseRequest(path: string, method: string, body?: any): Promise<any> {
        const result = await fetch(this.apiUrl + path, {
            method,
            headers: {
                "X-Octopus-ApiKey": this.apiKey,
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (result.ok) return await result.json();

        const response = (await result.json()) as { ErrorMessage: string; Errors: object };
        return {
            response: {
                status: result.status as number,
                message: response.ErrorMessage as string,
                errors: { ...response.Errors } as object,
            },
        } as ApiResponse<object>;
    }

    public async post(path: string, body: any): Promise<any> {
        return this.baseRequest(path, 'POST', body);
    }

    public async get(path: string): Promise<any> {
        return this.baseRequest(path, 'GET');
    }

    public async delete(path: string): Promise<any> {
        return this.baseRequest(path, 'DELETE');
    }

    public async put(path: string, body: any): Promise<any> {
        return this.baseRequest(path, 'PUT', body);
    }
}

const client = new Client(API_KEY, API_URL);

export const Octopus = {

    Account: {
        List: async function () {
            return await client.get("/accounts/all");
        },
    },

    Deployment: {
        List: async function () {
            return await client.get("/deployments");
        },
    },

    DeploymentTarget: {
        List: async function () {
            return await client.get("/machines");
        },
        FindByName: async function (name: string) {
            return await client.get(`/machines/all?name=${name}`);
        },
        FindById: async function (id: string) {
            return await client.get(`/machines/${id}`);
        }
    },

    Environment: {
        List: async function () {
            return await client.get("/environments");
        },
    },

    Event: {
        List: async function () {
            return await client.get("/events");
        },
    },

    Feed: {
        List: async function () {
            return await client.get("/feeds");
        },
    },

    Connection: {
        Check: async function (id: string) {
            return await client.get(`/machines/${id}/connection`);
        }
    }
}