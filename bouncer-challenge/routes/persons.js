import { Router } from 'express'

import { PersonController } from '../controllers/persons.js'

export const personRouter = Router()

personRouter.get('/', PersonController.getAll)

personRouter.post('/', PersonController.create)
