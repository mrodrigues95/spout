<h1 align="center">Spout</h1>

<p align="center">A learning management system focused on instructor and student communications.</p>

## Features
- Create classrooms and discussions catered towards your needs
- Central hub for classroom participants to discuss and ask questions outside class hours
- Encourages peer-to-peer discussion
- Track classroom activity, create reminders and announcements
- File upload support

## Developer Guide
Make sure you have [installed](https://docs.docker.com/desktop/) and [configured](#configuring-dotnet) docker in your local environment. After that, you will be able to run the commands below in the root directory of this repo.

```sh
git clone https://github.com/mrodrigues95/spout.git
```
```sh
nx run bootstrap
nx run dev:setup:localhost
nx run dev:setup:https
nx run dev:up
```

> NOTE: You'll also need to setup .NET User Secrets and Certs [below](#configuring-dotnet).

Application URLs can be accessed as shown below:
```sh
api: https://spout.dev/api/graphql
web: https://spout.dev
```

<a id="configuring-dotnet"></a>
## Configuring .NET Environment Variables
First, ensure you have the [.NET 6.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) installed.

### .NET User Secrets
Open up a terminal and run the following commands:
```sh
cd apps/api/API
dotnet user-secrets init
dotnet user-secrets set "Kestrel:Certificates:Development:Password" "<enter_random_secret_here>"
```
It doesn't matter what you enter as the secret, just as long as you set them in your environment as shown above.
> **IMPORTANT:** Take note of the secret you entered for Kestrel:Certificates:Development:Password, as you will need it when we set the dev certificates.

### .NET HTTPS Dev Certificates
```sh
dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\API.pfx -p <enter_kestrel_secret_used_above_here>
dotnet dev-certs https --trust
```
Update `ASPNETCORE_Kestrel__Certificates__Default__Password` in [docker-compose.yml](https://github.com/mrodrigues95/spout/blob/main/.dev/docker-compose.yml) to use the secret you set above.

Once the certs have been set up, your local environment will be ready to go.

## Structure

### apps

- `api` -> [.NET](https://dotnet.microsoft.com/en-us/) GraphQL web api powered by Hot Chocolate
- `web` -> [NextJS](https://nextjs.org/) web app built with React Relay

### libs
- `shared` -> A common shared set of utility functions and hooks
- `toolkit` -> A [Storybook](https://storybook.js.org/) component library containing primitives
