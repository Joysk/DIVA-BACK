/**
 * updateUserPassword
 *
 * this route maintains a list of invalid JWTs.
 */

const joi = require('joi')

const db = require('../../models')
const validateToken = require('../utils/validateToken.js')
const bcrypt = require('bcrypt')

const route = {
  method: 'POST',
  path: '/api/1.0/updateUserPassword',

  handler: async function (request, h) {
    try {
      const tokenInfo = await validateToken(request)
      if (
        typeof tokenInfo !== 'undefined' &&
        typeof tokenInfo.user !== 'undefined' &&
        tokenInfo.user.id > 0) {
        const password = await bcrypt.hash(request.payload.newPassword, 10)

        // get user from DB
        let user = await db.User.findOne({
          where: {
            id: {
              $eq: tokenInfo.user.id
            }
          }
        })

        if (user !== null) {
          // check for current password
          if (await bcrypt.compare(request.payload.currentPassword, user.password)) {
            // update it
            await user.update({
              password
            })
            return {
              success: 'newPassword'
            }
          }
          return h.response({
            err: 'invalidCurrentPassword', // TODO: define error messages
            msg: 'The current password does not match'
          }).code(403)
        }
      }

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
      payload: {
        currentPassword: joi.string().min(6).required(),
        newPassword: joi.string().min(6).required() // TODO: config
      },
      options: {
        allowUnknown: true
      }
    }
  }
}

module.exports = route
