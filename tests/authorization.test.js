/**
 * authorization.test.js
 *
 * Test for authorization API requests
 */

const chai = require('chai')
const jwt = require('jsonwebtoken')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
var expect = chai.expect

const server = require('../server.js')

// JWT token generated while tests & for tests
let token = ''

describe('## Test authorization APIs', () => {
  describe('# GET /', () => {
    it('should return static HTML page', async () => {
      const options = {
        method: 'GET',
        url: '/'
      }
      const s = await server()
      const res = await s.inject(options)
      expect(res.statusCode).be.equal(200)
    })
  })

  describe('# POST /loginRoute', () => {
    it('should return user object and a valid JWT', async () => {
      const options = {
        method: 'POST',
        url: '/api/1.0/login',
        payload: JSON.stringify({
          email: 'demo@demo.com',
          password: 'password'
        })
      }
      const s = await server()
      const res = await s.inject(options)
      expect(res.statusCode).be.equal(200)
      expect(res.result.user).deep.equal({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        isAdmin: true
      })
      let decoded = jwt.verify(res.result.token, config.tokenSecret)
      expect(decoded.user.id).be.equal(1)

      // update token for next request
      token = res.result.token
    })
  })

  describe('# POST /loginRoute', () => {
    it('should complain about failed login', async () => {
      const options = {
        method: 'POST',
        url: '/api/1.0/login',
        payload: JSON.stringify({
          email: 'foo@bar.com',
          password: 'passw0rd'
        })
      }
      const s = await server()
      const res = await s.inject(options)
      expect(res.statusCode).be.equal(403)
      expect(res.result).deep.equal({
        err: 'invalidCredentials'
      })
    })
  })

  describe('# GET /api/1.0/refreshToken', () => {
    it('should return a new valid JWT', async () => {
      const options = {
        method: 'GET',
        url: '/api/1.0/refreshToken',
        headers: {
          authorization: 'Bearer ' + token
        }
      }
      const s = await server()
      const res = await s.inject(options)
      expect(res.statusCode).be.equal(200)
      let decoded = jwt.verify(res.result.token, config.tokenSecret)
      expect(decoded.user.id).be.equal(1)

      // update token for next request
      token = res.result.token
    })
  })

  describe('# GET /api/1.0/invalidateToken', () => {
    it('should destroy JWT', async () => {
      const options = {
        method: 'GET',
        url: '/api/1.0/invalidateToken',
        headers: {
          authorization: 'Bearer ' + token
        }
      }
      const s = await server()
      const res = await s.inject(options)
      expect(res.statusCode).be.equal(200)
      expect(res.result).deep.equal({
        success: 'tokenIsInvalidated'
      })
    })
  })

  describe('# GET /api/1.0/invalidateToken', () => {
    it('should complain about destroyed JWT', async () => {
      const options = {
        method: 'GET',
        url: '/api/1.0/invalidateToken',
        headers: {
          authorization: 'Bearer ' + token
        }
      }
      const s = await server()
      const res = await s.inject(options)
      expect(res.statusCode).be.equal(406)
      expect(res.result).deep.equal({
        err: 'invalidToken',
        msg: 'Token has been invalidated previously'
      })
    })
  })
})
