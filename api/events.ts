import HTTP from "./http";

export default class Events {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/events`);
    }
    public async Find(id: string) : Promise<any> {
        if (!id) throw new Error("id is required");
        return await this.httpservice.get(`${this.config.apiUrl}/events/${id}`);
    }
}