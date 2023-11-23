const API_KEY = process.env.API_KEY as string;
const API_URL = process.env.API_URL as string;

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

const Octopus = {

    Account: {
        List: async function () {
            return await client.get("/accounts/all");
        },
    },

    Space: {
        List: async function () {
            return await client.get("/spaces/all");
        },
    },

    Deployment: {
        List: async function () {
            return await client.get("/deployments");
        },
        Find: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/deployments/${id}`);
        }
    },

    DeploymentProcess: {
        List: async function () {
            return await client.get("/deploymentprocesses");
        },
        Find: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/deploymentprocesses/${id}`);
        },
        Template: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/deploymentprocesses/${id}/template`);
        }
    },

    DeploymentTarget: {
        List: async function () {
            return await client.get("/machines");
        },
        Find: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/machines/${id}`);
        }
    },

    Task: {
        List: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/machines/${id}/tasks`);
        }
    },

    Environment: {
        List: async function () {
            return await client.get("/environments");
        },
        Find: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/environments/${id}`);
        }
    },

    Event: {
        List: async function () {
            return await client.get("/events");
        },
        Find: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/events/${id}`);
        }
    },

    Feed: {
        List: async function () {
            return await client.get("/feeds");
        },
        Find: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/feeds/${id}`);
        }
    },

    Connection: {
        Check: async function (id: string) {
            if (!id) throw new Error("id is required");
            return await client.get(`/machines/${id}/connection`);
        }
    }
}

export default Octopus;