/**
 * refreshToken
 *
 * this route generates a new valid JWT to renew expiring tokens
 */

const jwt = require('jsonwebtoken')
const joi = require('joi')

const env = process.env.NODE_ENV || 'development'
const config = require('../../config/config.json')[env]
const validateToken = require('../utils/validateToken.js')
const db = require('../../models')

const route = {
  method: 'GET',
  path: '/api/1.0/refreshToken',

  handler: async function (request, h) {
    try {
      // try to decode a token from request header
      let decoded = await validateToken(request)

      // invalidate current token
      let token = request.headers.authorization.split('Bearer ')[1]
      db.InvalidToken.create({
        token
      })

      // sign new JWT when current token is correctly decoded
      /*
      return {
        token: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + config.tokenTimeout,
          // taking over the `user` part from old token into new token
          user: decoded.user
        }, config.tokenSecret)
      }
      */

      // get user data and sign new JWT (same process as /login route)
      let user = await db.User.findOne({
        where: {
          id: {
            $eq: decoded.user.id
          }
        }
      })

      // check if we got a user
      if (user !== null) {
        return {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
          },
          token: jwt.sign({
            exp: Math.floor(Date.now() / 1000) + config.tokenTimeout,
            user: {
              id: user.id,
              isAdmin: user.isAdmin
            }
          }, config.tokenSecret)
        }
      }

      // otherwise show an error
      return h.response({
        err: 'invalidToken' // TODO: define error messages
      }).code(403)
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
