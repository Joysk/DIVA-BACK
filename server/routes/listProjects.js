/**
 * listProjects
 *
 * this route maintains a list of invalid JWTs.
 */

const joi = require('joi')

const db = require('../../models')
const validateToken = require('../utils/validateToken.js')

const route = {
  method: 'GET',
  path: '/api/1.0/listProjects',

  handler: async function (request, h) {
    try {
      const tokenInfo = await validateToken(request)
      if (
        typeof tokenInfo !== 'undefined' &&
        typeof tokenInfo.user !== 'undefined') {
        // get projects from DB
        return await db.Project.findAll(
          {
            include: [{
              model: db.Client,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }, {
              model: db.User,
              through: { attributes: [] },
              attributes: { exclude: ['password', 'isAdmin', 'createdAt', 'updatedAt'] }
            }]
          }
        )
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
