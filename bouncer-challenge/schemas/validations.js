import z from 'zod'

const personSchema = z.object({
  name: z.string({
    error: 'Name is required and must be a string'
  }).trim().min(1, 'Name can not be empty'),
  age: z.number({
    error: 'Age is required and must be a number'
  }).positive().int().max(120)
})

function validatePerson (input) {
  return personSchema.safeParse(input)
}

export { validatePerson }
