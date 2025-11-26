# Octopus Deploy API Wrapper

A TypeScript wrapper for the Octopus Deploy REST API, providing a simple and intuitive interface to interact with your Octopus Deploy server.

## Configuration

To use the wrapper, you need to provide your Octopus Deploy API key and server URL:

```typescript
import OctopusAPI from 'octopus-deploy-api-wrapper';

const octopus = new OctopusAPI({
    apiKey: process.env.OCTOPUS_API_KEY as string,
    apiUrl: process.env.OCTOPUS_API_URL as string
});
```

## Usage

### Quick Example

```typescript
import OctopusAPI from 'octopus-deploy-api-wrapper';

const octopus = new OctopusAPI({
    apiKey: process.env.OCTOPUS_API_KEY as string,
    apiUrl: process.env.OCTOPUS_API_URL as string
});

// Find an environment by name
const environment = await octopus.environments.FindByName('Spaces-1', 'Production');

// List all projects
const projects = await octopus.projects.List();

// Create a deployment
const deployment = await octopus.deployments.Create({
    EnvironmentId: 'Environments-1',
    ReleaseId: 'Releases-1'
});
```

## Advanced Example

Here's a more complete example showing how to find projects in a group and deploy a previous release:

```typescript
import OctopusAPI from 'octopus-deploy-api-wrapper';

const octopus = new OctopusAPI({
    apiKey: process.env.OCTOPUS_API_KEY as string,
    apiUrl: process.env.OCTOPUS_API_URL as string
});

// Find the target environment
const environment = await octopus.environments.FindByName('Spaces-1', 'Production');
if (!environment?.Id) throw new Error('Environment not found');

// Get all project groups
const groups = await octopus.projectGroups.List();

// Find a specific group
const targetGroup = groups.Items.find(g => g.Name === 'My Project Group');
if (!targetGroup) throw new Error('Project group not found');

// Get all projects in the group
const projects = await octopus.projectGroups.Projects(targetGroup.Id, 100);

// Process each project
for (const project of projects.Items) {
    // Get recent deployments
    const deployments = await octopus.deployments.FindByEnvironment(
        project.Id,
        environment.Id,
        2
    );

    // Get the previous release
    const previousReleaseId = deployments.Items?.[1]?.ReleaseId;
    if (!previousReleaseId) continue;

    // Deploy the previous release (rollback)
    await octopus.deployments.Create({
        EnvironmentId: environment.Id,
        ReleaseId: previousReleaseId
    });

    console.log(`Rolled back ${project.Name}`);
}
```

## Requirements

- TypeScript 5.0+
- Node.js 16+ or Bun runtime

## Contributing

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/Lillious/Octopus-Deploy-API-Wrapper)
- [Octopus Deploy Documentation](https://octopus.com/docs/octopus-rest-api)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Lillious/Octopus-Deploy-API-Wrapper/issues) on GitHub.
