const config = require('../config')
const axios = require('axios')
const btoa = require('btoa')


module.exports = {
  getAccessToken () {
    return axios.post('https://allegro.pl.allegrosandbox.pl/auth/oauth/token?grant_type=client_credentials', {
      client_id: config.clientId
    }, {
      headers: {
        'Authorization': `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}