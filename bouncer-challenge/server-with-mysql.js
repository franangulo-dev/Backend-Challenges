import { createApp } from './app.js'

import { PersonModel } from './models/mysql/bouncer.js'

createApp({ personModel: PersonModel })
