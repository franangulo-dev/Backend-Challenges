import mysql from 'mysql2/promise'
import { Bouncer } from '../local-memory/bouncer.js'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'bouncerdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

const bouncer = new Bouncer()

export class PersonModel {
  static async getAll () {
    const [persons] = await connection.query(
      'SELECT name, age, allowed, reason, timeStamp, BIN_TO_UUID(id) id FROM persons'
    )
    return persons.map(person => ({
      ...person,
      allowed: Boolean(person.allowed)
    }))
  }

  static async create ({ input }) {
    const personResult = bouncer.check(input)
    const { name, age, allowed, reason, timeStamp } = personResult
    try {
      await connection.query(
        `INSERT INTO persons (name, age, allowed, reason, timeStamp)
        VALUES (?, ?, ?, ?, ?);`,
        [name, age, allowed, reason, new Date(timeStamp)]
      )
    } catch (e) {
      throw new Error('Error creating Person')
    }
    return personResult
  }
}
