/**
 * getActionForProject
 *
 * this route maintains a list of invalid JWTs.
 */

const joi = require('joi')

const db = require('../../models')
const validateToken = require('../utils/validateToken.js')

const route = {
  method: 'GET',
  path: '/api/1.0/getActionTypes',

  handler: async function (request, h) {
    try {
      const tokenInfo = await validateToken(request)
      if (
        typeof tokenInfo !== 'undefined' &&
        typeof tokenInfo.user !== 'undefined') {
        // get projects from DB
        return await db.ActionCategory.findAll(
          {
            include: [{
              model: db.ActionGroup,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              include: [{
                model: db.ActionType,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }]
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
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
