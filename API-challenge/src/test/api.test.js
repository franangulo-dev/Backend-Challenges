/* global describe, test, expect, */
import { jest } from '@jest/globals'
import { apiCaller, apiPoster, apiPUT, apiPatcher, apiDelete } from '../api.js'

describe('Test for api.js', () => {
  test('trying get', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'ditto', id: 132 })
    })
    const data = await apiCaller()
    expect(data.name).toBe('ditto')
    fetchMock.mockRestore()
  })

  test('trying post', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'fran', id: 132 })
    })
    const data = await apiPoster()
    expect(data.id).toBe(132)
    fetchMock.mockRestore()
  })
  test('trying Put', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ id: 132, title: 'i am the new title' })
    })
    const data = await apiPUT()
    expect(data.title).toBe('i am the new title')
    fetchMock.mockRestore()
  })

  test('trying Patch', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ id: 132, title: 'poke FranAn' })
    })
    const data = await apiPatcher()
    expect(data.title).toBe('poke FranAn')
    fetchMock.mockRestore()
  })
  test('trying Delete', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({})
    })
    const data = await apiDelete()
    expect(data).toEqual({})
    fetchMock.mockRestore()
  })
})
