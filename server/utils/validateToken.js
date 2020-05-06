/**
 * validateToken
 *
 * method extracts JWT from HAPI 'request' and validates it
 * @return decoded token - when successfull validated
 * @throw Error object - in case of error
 */

const moment = require('moment')
const jwt = require('jsonwebtoken')

const env = process.env.NODE_ENV || 'development'
const config = require('../../config/config.json')[env]
const db = require('../../models')

function Error (message) {
  this.message = message
}

module.exports = async (request) => {
  let header = request.headers.authorization
  if (typeof header !== 'undefined') {
    let token = request.headers.authorization.split('Bearer ')[1]
    if (token.length > 10) {
      // check database if token is known and invalidated
      let invalidToken = await db.InvalidToken.findOne({
        where: {
          token: {
            $eq: token
          }
        }
      })

      // clean out expired tokens from database
      db.InvalidToken.destroy({
        where: {
          createdAt: {
            $lte: moment().subtract((config.tokenTimeout + 10), 'seconds').toDate()
          }
        }
      })

      if (invalidToken) {
        throw (new Error('Token has been invalidated previously'))
      }

      // all fine - return the token
      return jwt.verify(token, config.tokenSecret)
    } else {
      throw (new Error('Token seems too small'))
    }
  } else {
    throw (new Error('Missing authorization header'))
  }
}
