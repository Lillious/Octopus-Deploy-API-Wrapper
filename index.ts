const API_Key = process.env.API_KEY as string;
const API_URL = process.env.API_URL as string;
import fetch from 'node-fetch';

type ApiResponse<T = any> = {
    response: {
        status: number;
        message: string;
        errors: T;
    };
};

const baseRequest = async (path: string, method: string, body?: any): Promise<any> => {
    const result = await fetch(API_URL + path, {
        method,
        headers: {
            "X-Octopus-ApiKey": API_Key,
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
};

const Request = {
    Post: async (path: string, body: any): Promise<any> => baseRequest(path, 'POST', body),
    Get: async (path: string): Promise<any> => baseRequest(path, 'GET'),
    Delete: async (path: string): Promise<any> => baseRequest(path, 'DELETE'),
    Put: async (path: string, body: any): Promise<any> => baseRequest(path, 'PUT', body),
};

export const Account = {
    List: async function () {
        return await Request.Get("/accounts/all");
    }
};

export const Deployment = {
    List: async function () {
        return await Request.Get("/deployments");
    }
};

export const DeploymentTarget = {
    List: async function () {
        return await Request.Get("/machines");
    },
    FindByName: async function (name: string) {
        return await Request.Get("/machines/all?name=" + name);
    },
    FindById: async function (id: string) {
        return await Request.Get("/machines/" + id);
    }
};

export const Environment = {
    List: async function () {
        return await Request.Get("/environments");
    }
};

export const Events = {
    List: async function () {
        return await Request.Get("/events");
    }
};

export const Feeds = {
    List: async function () {
        return await Request.Get("/feeds");
    }
};

export const Connection = {
    Check: async function (id: string) {
        return await Request.Get("/machines/" + id + "/connection");
    }
}