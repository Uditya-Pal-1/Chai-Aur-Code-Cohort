import express from 'express'
import type { Application } from 'express'
import {register as registerHealthRoutes} from './routes/health/route.js'

export function createApp(): Application {
    const app: Application = express();

    app.use('/health',registerHealthRoutes());
    return app;
}