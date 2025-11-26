import HTTP from "./http";

export default class Connections {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async Check(id: string) : Promise<any> {
        if (!id) throw new Error("id is required");
        return await this.httpservice.get(`${this.config.apiUrl}/machines/${id}/connection`);
    }
}