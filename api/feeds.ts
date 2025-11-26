import HTTP from "./http";

export default class Feeds {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/feeds`);
    }
    public async Find(id: string) : Promise<any> {
        if (!id) throw new Error("id is required");
        return await this.httpservice.get(`${this.config.apiUrl}/feeds/${id}`);
    }
}