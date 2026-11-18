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

import { corsMiddleware } from './middlewares/cors.js'
import { personRouter } from './routes/persons.js'

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use(corsMiddleware())

app.use('/persons', personRouter)

const PORT = process.env.PORT ?? 4321

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`engine running on Port: ${PORT}`)
  })
}

export { app }
