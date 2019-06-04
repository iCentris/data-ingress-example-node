'use strict'

// Node.js v10.4.1

const config = {
  domain: 'REPLACE_WITH_ICENTRIS_PROVIDED_DOMAIN',
  apiKey: 'REPLACE_WITH_ICENTRIS_PROVIDED_KEY',
  protocol: 'https',
  port: 443
}

const dealershipCreated = require('./requests/events/dealership-created')
const dealershipEnrollerChanged = require('./requests/events/dealership-enroller-changed')
const dealershipSponsorshipChanged = require('./requests/events/dealership-sponsorship-changed')
const customerEnrollment =  require('./requests/events/customer-enrollment')
const orderCreated = require('./requests/events/order-created')
const dealerUpdated = require('./requests/events/dealer_updated')
const commissionUpdated = require('./requests/events/commission_updated')
const test = require('./requests/events/test')
const payloadValidation = require('./requests/events/payloadValidation')
const health = require('./requests/events/health')
const invalidEventError = require('./requests/events/invalidEventError')
const order = require('./requests/objects/order')
const user = require('./requests/objects/user')
const userStream = require('./requests/objects/user-stream')
const seed = require('./requests/objects/seed')
const base64 = require('base-64')

const requests = []
// requests.push(dealershipCreated)
// requests.push(dealershipEnrollerChanged)
// requests.push(dealershipSponsorshipChanged)
// requests.push(customerEnrollment)
// requests.push(orderCreated)
requests.push(health)
// requests.push(dealerUpdated)
// requests.push(commissionUpdated)
// requests.push(test)
// requests.push(payloadValidation)
// requests.push(invalidEventError)
// requests.push(order)
// requests.push(user)
// requests.push(userStream)
// requests.push(seed)

const request = require('request')
const jwt = require('jsonwebtoken')
const uuid4 = require('uuid/v4')
const apiKeyId = config.apiKey.split('.')[0]
const apiKeySecret = base64.decode(config.apiKey.split('.')[1])

/* ********************************************************************** */
// create your own JWT as a signin (aka refresh token) using our shared secret
// Sign using the HS256 algorithm.
const refreshToken = jwt.sign({
  jti: uuid4(),
  sub: config.domain,
  kid: apiKeyId}, apiKeySecret, {expiresIn: 15 * 60})

console.log(`Refresh Token: ${refreshToken}\n`)

/* ********************************************************************** */
// then get your session / access token
console.log(`Signin at: ${config.protocol}://${config.domain}:${config.port}/auth/v0/access\n`)
console.log('refreshToken', refreshToken)
let accessToken = ''
request.post(`${config.protocol}://${config.domain}:${config.port}/auth/v0/access`,
    { form: {
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: refreshToken
    }}, (err, res, body) => {
      if (err) {
        return console.error(err)
      }
      if (res.statusCode != 302) {
        throw Error("Auth Failed")
      }
      const accessToken = JSON.parse(body).access_token
      console.log(`Access Token: ${accessToken}\n`)

      /* ********************************************************************** */
      // now submit the requests
      requests.forEach((_request) => {
        console.log('content-type', _request.contentType)
        if (_request.method === 'GET') {
          console.log(`GET: ${_request.path}`)
          request.get(`${config.protocol}://${config.domain}:${config.port}${_request.path}`, null, handler)
        }
        else {
          console.log(`POST: ${_request.path}`)
          console.log(_request.data())
          request.post(`${config.protocol}://${config.domain}:${config.port}${_request.path}`,
          { body: _request.data(),
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-type': _request.contentType
            }
          }, handler)
        }
      })
    })

    const handler = (err, res, body) => {
      if (err) { console.log(err) }
      if (res.statusCode === 204) {
        console.log(`Success: status ${res.statusCode}`)
      } else {
        console.log(`Error: status ${res.statusCode}`)
        console.log(res.body)
      }
    }
