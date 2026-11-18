export class Bouncer {
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

export class PersonModel {
  static async getAll () {
    return bouncer.entry
  }

  static async create ({ input }) {
    return bouncer.check(input)
  }
}
