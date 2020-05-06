/**
 * login
 *
 * this route authenticate users and create JWTs
 */

const joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const env = process.env.NODE_ENV || 'development'
const config = require('../../config/config.json')[env]

const db = require('../../models')
const delayRequest = require('../utils/delayRequest')

const route = {
  method: 'POST',
  path: '/api/1.0/login',

  handler: async function (request, h) {
    // get user from DB
    let user = await db.User.findOne({
      where: {
        email: {
          $eq: request.payload.email
        }
      }
    })

    // check if we got a user
    if (user !== null) {
      // compare password & sign JWT when match
      if (await bcrypt.compare(request.payload.password, user.password)) {
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
    }

    await delayRequest()

    // otherwise show an error
    return h.response({
      err: 'invalidCredentials' // TODO: define error messages
    }).code(403)
  },

  options: {
    validate: {
      payload: {
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().min(6).required() // TODO: config
      },
      failAction: async () => {
        await delayRequest()
      }
    }
  }
}

module.exports = route
