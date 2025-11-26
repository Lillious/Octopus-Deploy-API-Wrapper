import HTTP from "./http";

export default class Projects {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/projects/all`);
    }
    public async Find(space: string, id: string) : Promise<any> {
        if (!id) throw new Error("id is required");
        return await this.httpservice.get(`${this.config.apiUrl}/${space}/projects/${id}`);
    }
    public async Releases(projectId: string) : Promise<any> {
        if (!projectId) throw new Error("projectId is required");
        return await this.httpservice.get(`${this.config.apiUrl}/projects/${projectId}/releases`);
    }
}