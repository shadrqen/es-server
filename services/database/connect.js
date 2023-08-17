'use strict'

/* Makes requests to the database micro-service */

const AXIOS = require('axios')

let apiKey, dbMicroService, origin

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  dbMicroService = `http://${process.env.DBMS}/`
  origin = 'https://api.essayspring.com:gkjslif'
  apiKey = process.env.API_KEY
} else {
  dbMicroService = `http://${process.env.URL}:3050/`
  origin = 'http://localhost:3100:lspauidg'
  apiKey = process.env.DEV_API_KEY
}

AXIOS.defaults.headers.common.api_key = apiKey
AXIOS.defaults.headers.common['x-allowed-origin'] = origin

module.exports.getDBRequest = async url => {
  return await AXIOS
    .get(dbMicroService + url)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return Promise.reject(error.message)
    })
}

module.exports.postDBRequest = async (url, body) => {
  return await AXIOS
    .post(dbMicroService + url, body)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return Promise.reject(error.message)
    })
}

/* There were times when the two headers below were deleted prior to making certain requests
* to the Safaricom Daraja api. There was need then to set the headers again before calling
* our DBMS */
module.exports.setHeaders = () => {
  AXIOS.defaults.headers.common.api_key = apiKey
  AXIOS.defaults.headers.common['x-allowed-origin'] = origin
}
