const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const api = require("../middle_laen/api")
const app = express()
const session = require('express-session')
const session_config = require("../config/express-session.json")
const auth = require("../middle_laen/auth")
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  console.log(session_config)
  app.use(session(session_config))
  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true }))
  //gives api middleware:

  app.use("/api/:id", api.api)
  app.use("/auth/:action", auth.api)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
