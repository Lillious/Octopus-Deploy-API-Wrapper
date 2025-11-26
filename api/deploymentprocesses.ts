import HTTP from "./http";

export default class DeploymentProcesses {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/deploymentprocesses`);
    }
    public async Find(id: string, space: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/${space}/deploymentprocesses/${id}`);
    }
    public async Template(id: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/deploymentprocesses/${id}/template`);
    }
}