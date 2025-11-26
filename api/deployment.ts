import HTTP from "./http";

export default class Deployments {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/deployments`);
    }
    public async Find(id: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/deployments/${id}`);
    }
    public async Create(deploymentData: any) : Promise<any> {
        return await this.httpservice.post(`${this.config.apiUrl}/deployments`, deploymentData);
    }
    public async FindByEnvironment(project_id: string, environmentId: string, amount: number = 30) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/deployments?projects=${project_id}&environments=${environmentId}&take=${amount}`);
    }
}