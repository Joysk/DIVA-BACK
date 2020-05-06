/**
 * publicRoute
 *
 * this route file serves the entire /public folder by GET reqs
 */

const route = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public',
      index: 'index.html'
    }
  }
}

module.exports = route
