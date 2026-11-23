import { Router } from 'express'
import { PersonController } from '../controllers/persons.js'

export const createPersonRouter = ({ personModel }) => {
  const personRouter = Router()
  const personController = new PersonController({ personModel })
  personRouter.get('/', personController.getAll)
  personRouter.post('/', personController.create)

  return personRouter
}
