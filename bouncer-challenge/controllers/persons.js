import { validatePerson } from '../schemas/validations.js'

export class PersonController {
  constructor ({ personModel }) {
    this.personModel = personModel
  }

  getAll = async (req, res) => {
    const persons = await this.personModel.getAll()
    res.json(persons)
  }

  create = async (req, res) => {
    const validation = validatePerson(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues })
    }

    const result = await this.personModel.create({ input: validation.data })

    if (result.allowed === true) {
      return res.status(201).json(result)
    }
    res.status(403).json(result)
  }
}
