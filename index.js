/**
 * index.js
 *
 * Getting API server up & running
 */
const server = require('./server')

// start hapi
const startServer = async () => {
  const s = await server()
  s.start()
  console.log(`Server running at: ${s.info.uri}`)
}

// in case something go wrong, display an error and exit the process
process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

// start hapi server
startServer()
