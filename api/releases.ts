import HTTP from "./http";

export default class Releases {
    constructor(private httpservice: HTTP, private config: IOctopusAPI) {}
    public async Find(id: string, amount: number = 30) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/releases/${id}?take=${amount}`);
    }
}