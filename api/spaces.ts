import HTTP from "./http";

export default class Spaces {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/spaces/all`);
    }
}