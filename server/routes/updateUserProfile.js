/**
 * updateUserProfile
 *
 * this route maintains a list of invalid JWTs.
 */

const joi = require('joi')

const db = require('../../models')
const validateToken = require('../utils/validateToken.js')

const route = {
  method: 'POST',
  path: '/api/1.0/updateUserProfile',

  handler: async function (request, h) {
    try {
      const tokenInfo = await validateToken(request)
      if (
        typeof tokenInfo !== 'undefined' &&
        typeof tokenInfo.user !== 'undefined' &&
        tokenInfo.user.id > 0) {
        const updateUser = JSON.parse(request.payload).user

        // make sure nothing stupid happens
        delete (updateUser.password)
        delete (updateUser.isAdmin)
        delete (updateUser.createdAt)
        delete (updateUser.updatedAt)

        // get user from DB
        let user = await db.User.findOne({
          where: {
            id: {
              $eq: tokenInfo.user.id
            }
          }
        })

        // update it
        await user.update(updateUser)

        return {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
          }
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
      options: {
        allowUnknown: true
      }
    }
  }
}

module.exports = route
