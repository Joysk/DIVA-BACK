/**
 * invalidateToken
 *
 * this route maintains a list of invalid JWTs.
 */

const joi = require('joi')

const db = require('../../models')
const validateToken = require('../utils/validateToken.js')

const route = {
  method: 'GET',
  path: '/api/1.0/invalidateToken',

  handler: async function (request, h) {
    let token = request.headers.authorization.split('Bearer ')[1]
    try {
      await validateToken(request)
      await db.InvalidToken.create({
        token
      })
      return {
        success: 'tokenIsInvalidated' // TODO: define error messages
      }
    } catch (err) {
      return h.response({
        err: 'invalidToken', // TODO: define error messages
        msg: err.message
      }).code(406)
    }
  },

  // require 'authorization' HTTP header
  config: {
    validate: {
      headers: {
        'authorization': joi.string().required()
      },
      options: {
        allowUnknown: true
      }
    }
  }
}

module.exports = route
