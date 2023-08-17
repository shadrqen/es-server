const requestsMixin = require('../../mixins/requests')

const { postDBRequest } = require('../database/connect')

const { decodeToken } = require('../users/auth')

/* The authentication service that deals with login, signup and access to resources */
class UsersService {
    static getUserByEmail = async email => {
      return await postDBRequest('users/v1/user_by_email', { email: email })
        .then(res => res)
        .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async reportProblem (req) {
      const DECODED_TOKEN = await decodeToken(req.headers.access)
      const EMAIL = DECODED_TOKEN.message.sub
      return await postDBRequest('users/v1/report_problem', {
        email: EMAIL,
        obj: req.body,
        source: 'EssaySpring'
      })
        .then(res => res)
        .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getWriters (req) {
      const DECODED_TOKEN = await decodeToken(req.headers.access)
      const EMAIL = DECODED_TOKEN.message.sub
      return await postDBRequest('users/v1/get_client_writers', {
        email: EMAIL
      })
        .then(res => res)
        .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getSelectedWriter (req) {
      return await postDBRequest('users/v1/get_selected_personal_writer', {
        writerId: req.writerId
      })
        .then(res => res)
        .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async approvePersonalWriter (req) {
      return await postDBRequest('users/v1/approve_personal_writer', {
        writerId: req.writerId
      })
        .then(res => res)
        .catch(error => requestsMixin.customErrorMessage(error))
    }
}

module.exports = UsersService
