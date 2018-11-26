'use strict'

// Node.js v10.4.1

const config = {
  domain: 'REPLACE_WITH_ICENTRIS_PROVIDED_DOMAIN',
  apiKey: 'REPLACE_WITH_ICENTRIS_PROVIDED_KEY',
  protocol: 'https',
  port: 443
}

const createRoot = require('./requests/events/create-root')
const createOne = require('./requests/events/create-one')
const placeRoot = require('./requests/events/place-root')
const placeOne = require('./requests/events/place-one')
const test = require('./requests/events/test')
const payloadValidation = require('./requests/events/payloadValidation')
const health = require('./requests/events/health')
const invalidEventError = require('./requests/events/invalidEventError')
const order = require('./requests/objects/order')
const user = require('./requests/objects/user')
const base64 = require('base-64')

const requests = []
// requests.push(createRoot)
// requests.push(createOne)
// requests.push(placeRoot)
// requests.push(placeOne)
// requests.push(health)
// requests.push(test)
// requests.push(payloadValidation)
// requests.push(invalidEventError)
// requests.push(order)
requests.push(user)

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
console.log(refreshToken)
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
        if (_request.method === 'GET') {
          console.log(`GET: ${_request.path}`)
          request.get(`${config.protocol}://${config.domain}:${config.port}${_request.path}`, null, handler)
        }
        else {
          console.log(`POST: ${_request.path}`)
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
