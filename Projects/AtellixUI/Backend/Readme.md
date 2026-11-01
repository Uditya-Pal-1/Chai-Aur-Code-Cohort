# AtellixUI Backend

This directory is an incomplete Express scaffold for [AtellixUI](../README.md), not a working backend service.

## Current state

- `index.js` imports Express but does not create an application, register routes, or listen on a port.
- No API endpoints, authentication, database models, or registry functionality are implemented.
- `package.json` has no start or development script. Its `test` script runs `nodemon index.js`; it does not run automated tests and does not start a useful server.

The MongoDB, Express/TypeScript API, registry, and AI-generation components in [PRD v2.1](../AtellixUI%20PRD%20v2.1.md) are planned architecture, not current functionality.

## Dependencies

The package manifest lists Express, Mongoose, JWT, cookie parsing, CORS, bcrypt, and Nodemailer. Installing these packages alone does not configure or provide the planned API.

```bash
npm install
```

Before using this backend, implement and document an application entry point, configuration, routes, persistence, and suitable start and test scripts. Do not add real credentials to the repository.
