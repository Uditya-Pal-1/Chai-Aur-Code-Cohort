import express from 'express'
import { listComponents, getComponent } from '../controllers/registryController.js'

const router = express.Router()

router.get('/', listComponents)
router.get('/:name', getComponent)

export default router

