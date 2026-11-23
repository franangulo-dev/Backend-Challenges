# Backend Challenges

> Este repositorio esta hecho para desarrollar challenges sobre la creacion de API rest y manejo de datos en servidores
---
## 🧠 Filosofia de aprendizaje
Estos ejercicios fueron realizados de forma manual sin agentes de ia, ni correcciones automaticas, con el fin de practicar, fijar conocimientos y adquirir nuevos.

---

## 🛠️ Tecnologías y Herramientas
* **Entorno:** Node.js (`"type": "module"`)
* **Framework Web:** Express 5
* **Base de Datos:** MySQL (`mysql2/promise`) + almacenamiento en memoria local
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
Simula el control de un Bouncer de un evento, que registra la entrada de personas dejando pasar solo mayores de 18 años. Implementado bajo arquitectura **MVC con Inyección de Dependencias**, permitiendo alternar entre persistencia en **MySQL** o almacenamiento en memoria local (`#entry`) sin modificar controladores ni rutas.

Protegido con validaciones utilizando ZOD configuradas en el archivo `validations.js`.

Controla los origenes de conexion con CORS y cuenta con suite de tests automatizados con Jest.

* **Endpoints:**
  * `GET /persons`: Devuelve un JSON (200 OK) con la lista de todos los intentos de ingreso registrados.
  * `POST /persons`: Recibe `{name, age}` en el cuerpo de la peticion, limpia y valida los datos con ZOD y devuelve: 
    - `201 Created`: si la persona es mayor de edad y tiene acceso concedido.
    - `403 Forbidden`: si los datos son validos pero la persona es menor de edad.
    - `400 Bad Request`: Para datos malformados o incompletos (filtrados por ZOD).

* **Archivos clave:**
  * `bouncer-challenge/app.js` (Fábrica `createApp` desacoplada)
  * `bouncer-challenge/server-with-mysql.js` (Entry point con persistencia en MySQL)
  * `bouncer-challenge/server-with-local.js` (Entry point con almacenamiento en memoria)
  * `bouncer-challenge/routes/persons.js`
  * `bouncer-challenge/controllers/persons.js`
  * `bouncer-challenge/models/mysql/bouncer.js`
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

### 2. Configurar Base de Datos (Opcional para modo MySQL)
Ejecutar en tu instancia local de MySQL (puerto `3306`):
```sql
CREATE DATABASE IF NOT EXISTS bouncerdb;
USE bouncerdb;

CREATE TABLE persons (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  allowed BOOLEAN NOT NULL,
  reason VARCHAR(255) NOT NULL,
  timeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Levantar los desafíos
```bash
# Ejecutar API Challenge
npm run challenge:api

# Ejecutar Bouncer Challenge con MySQL (Puerto 4321)
npm run challenge:bouncer:mysql

# Ejecutar Bouncer Challenge en memoria local (Puerto 4321)
npm run challenge:bouncer:local
```

### 4. Correr toda la suite de tests
```bash
npm test
```

---

## 💡 Aprendizajes Clave
* **API-Challenge:** Practica y consolidacion de los metodos GET, POST, PUT, PATCH, DELETE del lado cliente.
* **Bouncer-Challenge:** Validaciones con ZOD, manejo de origenes con CORS, creacion de API REST bajo arquitectura MVC desacoplada con **Inyección de Dependencias**, persistencia relacional con **MySQL (`mysql2/promise`)**, manejo de UUIDs binarios y testing automatizado con Jest.

---

## 👤 Autor
* **Desarrollador:** Francisco Angulo
