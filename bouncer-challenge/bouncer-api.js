/* * 1. LA LÓGICA (LA CLASE):
*    - Crea una estructura llamada "Bouncer".
*    - Debe almacenar internamente un registro(privado de alteraciones)de todos los intentos de entrada.
*    - Crea una función interna que reciba el nombre y la edad de la persona.
*      • Si no es mayor de edad, debe retornar que no tiene acceso y el motivo.
*      • Si es mayor de edad, debe retornar que sí tiene acceso y el motivo.
*    - Cada vez que se use esta función, debes guardar los datos de ese intento
 *      (nombre, edad, si entró o no, y el momento exacto en que lo hizo) en el registro blindado.
 *    - Crea una forma de poder leer ese registro blindado desde afuera del molde.
*
 *  * 2. EL SERVIDOR (EXPRESS):
 *    - Levanta la API en el puerto 4321, preparada para procesar los datos que mande el cliente.
 *    - Inicializa un único "Bouncer" para que controle todo el boliche.
 *
 * * 3. LAS VENTANILLAS (ENDPOINTS):
 *    - Crea una ruta para recibir los datos de la persona que quiere ingresar.
 *      Debe procesarlos con tu Bouncer y devolver la respuesta correspondiente.
 *    - Crea una ruta para poder revisar la lista completa de los registros guardados hasta el momento.
 */
import express from 'express'
import cors from 'cors'
import { validatePerson } from './schema/validations.js'

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const ACCEPTED_ORIGINS = [
  'http://localhost:4321',
  'http://localhost:8080'
]

app.use(cors({
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

class Bouncer {
  #entry = []
  get entry () {
    return [...this.#entry]
  }

  check ({ name, age }) {
    if (age < 18) {
      const denied = ({ name, age, allowed: false, reason: 'Edad insuficiente', timeStamp: new Date().toISOString() })
      this.#entry.push(denied)
      return denied
    } else if (age >= 18) {
      const permited = ({ name, age, allowed: true, reason: 'Acceso concedido, mayor de edad', timeStamp: new Date().toISOString() })

      this.#entry.push(permited)
      return permited
    }
  }
}

const bouncer = new Bouncer()

app.get('/personas', (req, res) => {
  res.json(bouncer.entry)
})

app.post('/personas', (req, res) => {
  const validation = validatePerson(req.body)

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues })
  }

  const result = bouncer.check(validation.data)

  if (result.allowed === true) {
    return res.status(201).json(result)
  }
  res.status(403).json(result)
})

const PORT = process.env.PORT ?? 4321

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`engine running on Port: ${PORT}`)
  })
}

export { app, Bouncer }
