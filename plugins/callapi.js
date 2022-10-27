export default ({ app }, inject) => {
  const defaultMessage = 'An unknown error'

  const getMethod = async function (url, payload = undefined) {
    try {
      let config = {}
      if (payload) {
        config = {
          params: payload
        }
      }
      const response = await app.$axios.$get(url, config)
      return response
    } catch (e) {
      throw e.response || defaultMessage
    }
  }

  const postMethod = async function (url, body, payload = undefined) {
    try {
      let config = {}
      if (payload) {
        config = {
          params: payload
        }
      }
      const response = await app.$axios.$post(url, body, config)
      return response
    } catch (e) {
      throw e.response || defaultMessage
    }
  }

  const patchMethod = async function (url, body, payload = undefined) {
    try {
      let config = {}
      if (payload) {
        config = {
          params: payload
        }
      }
      const response = await app.$axios.$patch(url, body, config)
      return response
    } catch (e) {
      throw e.response || defaultMessage
    }
  }

  const putMethod = async function (url, body, payload = undefined) {
    try {
      let config = {}
      if (payload) {
        config = {
          params: payload
        }
      }
      const response = await app.$axios.$put(url, body, config)
      return response
    } catch (e) {
      throw e.response || defaultMessage
    }
  }

  const deleteMethod = async function (url, payload = undefined) {
    try {
      let config = {}
      if (payload) {
        config = {
          params: payload
        }
      }
      const response = await app.$axios.$delete(url, config)
      return response
    } catch (e) {
      throw e.response || defaultMessage
    }
  }

  const callapi = {
    get: getMethod,
    post: postMethod,
    patch: patchMethod,
    put: putMethod,
    delete: deleteMethod
  }

  inject('callapi', callapi)
}
