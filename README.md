# Backend Challenges

> Este repositorio esta hecho para desarrollar challenges sobre la creacion de API rest y manejo de datos en servidores
---
## 🧠 Filosofia de aprendizaje
Estos ejercicios fueron realizados de forma manual sin agentes de ia, ni correcciones automaticas, con el fin de practicar, fijar conocimientos y adquirir nuevos.

---

## 🛠️ Tecnologías y Herramientas
* **Entorno:** Node.js (`"type": "module"`)
* **Framework Web:** Express 5
* **Validación de Datos:** Zod v4
* **Seguridad de Red:** CORS
* **Estilo de Código:** Standard JS
* **Testing:** Jest

---

## 📦 Desafíos Incluidos

### 1. API Challenge (`API-challenge/`)
* **De qué se trata:** 
El ejercicio de consumo datos con fetch nativo con metodos GET, POST, PUT, PATCH, DELETE.
De APIs publicas (pokeAPI, jsonplaceholder), con manejo de errores locales.
Con manejo de errores y test con jest.
* **Archivos clave:**
  * `API-challenge/src/api.js`
  * `API-challenge/src/test/api.test.js`

### 2. Bouncer Challenge (`bouncer-challenge/`)
* **De qué se trata:** 
Simula el control de un Bouncer de un evento, que registra la entrada de personas dejando pasar solo mayores de 18 años, almacenando informacion en la lista privada e inmutable #entry. 

Protegido con validaciones utilizando ZOD configuradas en el archivo validations.js

Controla los origenes de conexion con CORS.

Con manejo de errores y test con jest.
* **Endpoints:**
  * `GET /persons`: Devuelve un JSON (200 OK) con la lista de todos los intentos de ingreso registrados, sin permitir modificaciones.
  * `POST /persons`: Recibe {name, age} en el cuerpo de la peticion, limpia y valida los datos con ZOD y devuelve: 
  - 201 Created: si la persona es mayor de edad y tiene acceso concedido.
  - 403 Forbidden: si los datos son validos pero la persona es menor de edad
  - 400 Bad Request: Para datos malformados o incompletos (filtrados por ZOD)

* **Archivos clave:**
 * `bouncer-challenge/app.js`
 * `bouncer-challenge/routes/persons.js`
 * `bouncer-challenge/controllers/persons.js`
 * `bouncer-challenge/models/local-memory/bouncer.js`
 * `bouncer-challenge/middlewares/cors.js`
 * `bouncer-challenge/schemas/validations.js`
 * `bouncer-challenge/test/bouncer-api.test.js`
---

## ⚙️ Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Levantar los desafíos
```bash
# Ejecutar API Challenge
npm run challenge:api

# Ejecutar Bouncer Challenge (Puerto 4321)
npm run challenge:bouncer
```

### 3. Correr toda la suite de tests
```bash
npm test
```

---

## 💡 Aprendizajes Clave
* API-Challenge: Practica y consolidacion de los metodos GET, POST, PUT, PATCH, DELETE. Del lado cliente
* Bouncer-Challenge: Validaciones con ZOD, manejo de origenes con CORS, creacion de API rest y practica de clases privadas, estructurado bajo arquitectura MVC desacoplada

---

## 👤 Autor
* **Desarrollador:** Francisco Angulo
