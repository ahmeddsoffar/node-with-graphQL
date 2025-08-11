## Node.js + GraphQL learning project

This repository is a simple project I’m using to learn GraphQL with Node.js and Apollo Server.

### Quick start

- Create a `.env` file with:
  - `MONGO_URI=your-mongodb-connection-string`
  - `PORT=4000`
- Install dependencies: `npm install`
- Run the server: `npm start`
- Open Apollo Sandbox at `http://localhost:4000` to run queries/mutations.

### Why use GraphQL

- **Fetch exactly what you need**: Avoid over- and under-fetching common in REST.
- **Single endpoint**: One URL for the whole API, shaped by the query.
- **Strongly typed schema**: Self-documented API with introspection and tooling.
- **Client-driven queries**: Clients compose data needs without new server endpoints.

### How GraphQL differs from REST

- **One endpoint vs many**: GraphQL uses a single endpoint; REST splits by resource.
- **Declarative data**: Clients specify fields; REST returns server-defined payloads.
- **Versionless evolution**: GraphQL schemas evolve without v1/v2 endpoints.
- **Fewer round trips**: GraphQL can fetch related data in one request; REST often needs multiple.
