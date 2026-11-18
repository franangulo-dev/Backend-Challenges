import { validatePerson } from '../schemas/validations.js'
import { PersonModel } from '../models/local-memory/bouncer.js'

export class PersonController {
  static async getAll (req, res) {
    const persons = await PersonModel.getAll()
    res.json(persons)
  }

  static async create (req, res) {
    const validation = validatePerson(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues })
    }

    const result = await PersonModel.create({ input: validation.data })

    if (result.allowed === true) {
      return res.status(201).json(result)
    }
    res.status(403).json(result)
  }
}
