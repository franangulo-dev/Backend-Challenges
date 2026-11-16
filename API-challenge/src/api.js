/*
 * Llamar a una API es una de las tareas más comunes en programación.
 *
 * Implementa una llamada HTTP a una API (la que tú quieras) y muestra su
 * resultado a través de la terminal. Por ejemplo: Pokémon, Marvel...
 *
 * Aquí tienes un listado de posibles APIs:
 * https://github.com/public-apis/public-apis
 */

async function apiCaller () {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    if (!response.ok) {
      throw new Error('Problemas GET')
    }
    const data = await response.json()
    return data
  } catch (error) { console.error('GET error', error.message) }
}

async function apiPoster () {
  try {
    const newPost = {
      title: 'pokeFran',
      base_experience: 420,
      height: 2,
      is_default: true,
      order: 313,
      weight: 70
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    if (!response.ok) {
      throw new Error('Problemas POST')
    }
    const data = await response.json()
    return data
  } catch (error) { console.error('POST error', error.message) }
}

async function apiPatcher () {
  try {
    const newPatch = {
      title: 'pokeFranAn',
      base_experience: 313,
      height: 1
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPatch)
    })
    if (!response.ok) {
      throw new Error('Problemas PATCH')
    }
    const data = await response.json()
    return data
  } catch (error) { console.error('PATCH error', error.message) }
}

async function apiPUT () {
  try {
    const newPut =
        {
          userId: 12,
          id: 2,
          title: 'soy el new tittle',
          body: 'no se que quieren pero aca va'
        }
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPut)
    })
    if (!response.ok) {
      throw new Error('Problemas PUT')
    }
    const data = await response.json()
    return data
  } catch (error) { console.error('PUT error', error.message) }
}

async function apiDelete () {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Problemas DELETE')
    }
    const data = await response.json()
    return data
  } catch (error) { console.error('DELETE error', error.message) }
}

async function runAllSequential () {
  const pokemon = await apiCaller()
  const created = await apiPoster()
  const updated = await apiPUT()
  const patched = await apiPatcher()
  const deleted = await apiDelete()

  console.log({
    get: pokemon?.name,
    post: created,
    put: updated,
    patch: patched,
    delete: deleted
  })
}

if (process.env.NODE_ENV !== 'test') {
  runAllSequential()
}

export { apiCaller, apiPoster, apiPUT, apiPatcher, apiDelete }
