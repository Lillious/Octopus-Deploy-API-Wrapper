import HTTP from "./http";

export default class ProjectGroups {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/projectgroups`);
    }
    public async Projects(groupId: string, amount: number = 30) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/projectgroups/${groupId}/projects?take=${amount}`);
    }
}