import { createApp } from './app.js'

import { PersonModel } from './models/local-memory/bouncer.js'

createApp({ personModel: PersonModel })
