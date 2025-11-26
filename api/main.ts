import HTTP from './http';
import Accounts from './accounts';
import Spaces from './spaces';
import Environments from './environment';
import Deployments from './deployment';
import DeploymentProcesses from './deploymentprocesses';
import Machines from './machines';
import Tasks from './tasks';
import Events from './events';
import Feeds from './feeds';
import Connections from './connections';
import Projects from './projects';
import ProjectGroups from './projectgroups';
import Releases from './releases';

export default class OctopusAPI {
    public httpclient: HTTP;
    public accounts: Accounts;
    public spaces: Spaces;
    public environments: Environments;
    public deployments: Deployments;
    public deploymentProcesses: DeploymentProcesses;
    public machines: Machines;
    public tasks: Tasks;
    public events: Events;
    public feeds: Feeds;
    public connections: Connections;
    public projects: Projects;
    public projectGroups: ProjectGroups;
    public releases: Releases;

    constructor(private config: IOctopusAPI) {
        this.httpclient = new HTTP(this.config);
        this.accounts = new Accounts(this.httpclient, this.config);
        this.spaces = new Spaces(this.httpclient, this.config);
        this.environments = new Environments(this.httpclient, this.config);
        this.deployments = new Deployments(this.httpclient, this.config);
        this.deploymentProcesses = new DeploymentProcesses(this.httpclient, this.config);
        this.machines = new Machines(this.httpclient, this.config, new Tasks(this.httpclient, this.config));
        this.tasks = new Tasks(this.httpclient, this.config);
        this.events = new Events(this.httpclient, this.config);
        this.feeds = new Feeds(this.httpclient, this.config);
        this.connections = new Connections(this.httpclient, this.config);
        this.projects = new Projects(this.httpclient, this.config);
        this.projectGroups = new ProjectGroups(this.httpclient, this.config);
        this.releases = new Releases(this.httpclient, this.config);
    }
}