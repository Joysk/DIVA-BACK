/**
 * server.js
 *
 * Return configured hapi server object
 */

const fs = require('fs')
const hapi = require('hapi')
const path = require('path')

module.exports = async () => {
  // init hapi server
  const server = hapi.server({
    port: 3001,
    host: 'localhost',
    debug: { request: ['error'] },
    routes: { cors: true }
  })

  // register plugins
  await server.register(require('inert'))

  // add route files
  fs
    .readdirSync('./server/routes/')
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      server.route(require(path.join(__dirname, path.join('./server/routes/', file))))
    })

  return server
}
