import HTTP from "./http";

export default class Tasks {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List(id: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/machines/${id}/tasks`);
    }
    public async Create(task: any) : Promise<any> {
        return await this.httpservice.post(`${this.config.apiUrl}/tasks`, task);
    }
    public async ReRun(id: string) : Promise<any> {
        return await this.httpservice.post(`${this.config.apiUrl}/tasks/${id}/rerun`, {});
    }
    public async Find(id: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/tasks/${id}`);
    }
}