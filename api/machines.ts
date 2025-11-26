import HTTP from "./http";
import Tasks from "./tasks";

export default class Machines {
    constructor(private httpservice: HTTP, private config: IOctopusAPI, private tasks: Tasks) {}
    public async List() : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/machines`);
    }
    public async Find(id: string) : Promise<any> {
        return await this.httpservice.get(`${this.config.apiUrl}/machines/${id}`);
    }
    public async Upgrade(id: string, space: string) {
            const task = {
                'Name': 'Upgrade',
                'Arguments': {
                    'MachineIds': [id],
                },
                'Description': 'Upgrade Machine',
                'SpaceId': space
            }
            return await this.tasks.Create(task);
        }
}