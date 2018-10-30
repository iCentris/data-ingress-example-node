'use strict'

// Node.js v10.4.1

const config = {
  domain: 'REPLACE_WITH_ICENTRIS_PROVIDED_DOMAIN',
  apiKey: 'REPLACE_WITH_ICENTRIS_PROVIDED_KEY',
}

const events = [
  {
    type: 'TEST_EVENT_IGNORE',
    contentType: 'application/json',
    data: () => {
      return JSON.stringify({ key: 'value' })
    }
  },
  {
    type: 'TEST_EVENT_STREAM_IGNORE',
    contentType: 'application/x-ndjson',
    data: () => {
      let content = ''
      for (let i = 1; i <= 10; i++) {
        content += `{ "id":  ${i}, "first_name": "Test ${i}", "last_name": "Tester ${i}" }\n`
      }
      return content.trim()
    }
  }
]

const request = require('request')
const jwt = require('jsonwebtoken')
const uuid4 = require('uuid/v4')
const apiKeyId = config.apiKey.split('.')[0]
const apiKeySecret = config.apiKey.split('.')[1]

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
console.log(`Signin at: https://${config.domain}/auth/v0/access\n`)
let accessToken = ''
request.post(`https://${config.domain}/auth/v0/access`,
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
      // now submit the events
      events.forEach((event) => {
        request.post(`https://${config.domain}/data/v1/event/${event.type}`,
        { body: event.data(),
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-type': event.contentType
          }
        }, (err, res, body) => {
          if (err) { console.log(err) }
          if (res.statusCode === 204) {
              console.log(`${event.type} Event Submitted`)
          } else {
              console.log("Unexpected result=" + res.statusCode)
          }
        })
      })
    })
