import HTTP from "./http";

export default class Environments {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List(space: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/${space}/environments/all`);
    }
    public async FindByName(space: string, name: string) : Promise<any> {
        const environments = await this.httpservice.get(`${this.config.apiUrl}/${space}/environments/all`);
        return environments.find((env: { Name: string; }) => env.Name === name);
    }
    public async Find(space: string, id: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/${space}/environments/${id}`);
    }
}