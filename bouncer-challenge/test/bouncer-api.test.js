/* global describe, test, expect, beforeAll, afterAll */
import { app } from '../app.js'
import { Bouncer } from '../models/local-memory/bouncer.js'
const bouncer = new Bouncer()

describe('Test for Bouncer challenge', () => {
  test('Succesful POST', () => {
    const ticket = bouncer.check({ name: 'Fran', age: 28 })
    expect(ticket.allowed).toBe(true)
    expect(ticket.reason).toBe('Acceso concedido, mayor de edad')
    expect(ticket.timeStamp).toBeDefined()
  })
  test('Failed POST', () => {
    const ticket = bouncer.check({ name: 'Jorgito', age: 15 })
    expect(ticket.allowed).toBe(false)
    expect(ticket.reason).toBe('Edad insuficiente')
    expect(ticket.timeStamp).toBeDefined()
  })
  test('logical GET', () => {
    expect(bouncer.entry.length).toBe(2)
  })
  test('History should be immutable from outside', () => {
    const historyCopy = bouncer.entry

    historyCopy.push({ name: 'Hacker', age: 30, allowed: true })
    expect(bouncer.entry.length).toBe(2)
  })
})

describe('Test for HTTP', () => {
  let server
  let baseUrl

  beforeAll(() => {
    server = app.listen(0)
    const { port } = server.address()
    baseUrl = `http://localhost:${port}`
  })

  afterAll(() => {
    server.close()
  })
  test('Successful POST strips extra properties and returns 201', async () => {
    const res = await fetch(`${baseUrl}/persons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '  Fran  ',
        age: 28,
        isAdmin: true
      })
    })
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.name).toBe('Fran')
    expect(data.isAdmin).toBeUndefined()
    expect(data.allowed).toBe(true)
  })
  test('Minor aged POST returns 403', async () => {
    const res = await fetch(`${baseUrl}/persons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '  Jorgito  ',
        age: 15
      })
    })
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.allowed).toBe(false)
    expect(data.reason).toBe('Edad insuficiente')
  })
  test('Wrong data in POST returns 400', async () => {
    const res = await fetch(`${baseUrl}/persons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '   ',
        age: 'twenty'
      })
    })
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(Array.isArray(data.error)).toBe(true)
    expect(data.error.length).toBeGreaterThan(0)
  })
  test('Simple GET returns 200', async () => {
    const res = await fetch(`${baseUrl}/persons`)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.length).toBe(2)
  })
  test('Authorized GET returns 200', async () => {
    const res = await fetch(`${baseUrl}/persons`, {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:8080'
      }
    })

    expect(res.status).toBe(200)
    expect(res.headers.get('access-control-allow-origin')).toBe('http://localhost:8080')
  })
  test('Malicious GET returns 500', async () => {
    const res = await fetch(`${baseUrl}/persons`, {
      method: 'GET',
      headers: {
        Origin: 'http://hacker-site.com'
      }
    })

    expect(res.status).toBe(500)
    expect(res.headers.get('access-control-allow-origin')).toBeNull()
  })
})
