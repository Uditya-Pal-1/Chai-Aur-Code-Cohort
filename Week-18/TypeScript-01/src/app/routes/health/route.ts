import express from 'express'
import type {Router} from 'express'
import HealthController from './controller.js'

export function register(): Router{
    const router = express.Router();
    const controller = new HealthController();
    
    router.get("/", controller.handleHealthCheck.bind(controller));
    return router;
}