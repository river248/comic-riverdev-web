import axios from 'axios'
import { removeUserSession } from 'utils/common'

const instance = axios.create({
  baseURL: /*process.env.NODE_ENV === 'production' ? */ 'https://comic-riverdev-api.herokuapp.com/' /*: 'http://localhost:8080/'*/
})

instance.interceptors.request.use(
  async (config) => {

    const token = await instance.get('/v1/user/access-token')
    if (token) {
      // config.headers['Authorization'] = 'Bearer ' + token  // for Spring Boot back-end
      config.headers['x-access-token'] = token // for Node.js Express back-end
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401) {

        try {
          await instance.get('/v1/user/refresh-token')
          const res = await instance.get('/v1/user/access-token')
          const { accessToken } = res.data
          instance.defaults.headers.common["x-access-token"] = accessToken

          return instance(originalConfig)
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }

          return Promise.reject(_error)
        }
      }

      if (err.response.status === 403) {
        removeUserSession()
        window.location.reload()
        return Promise.reject(err.response.data)
      }
    }

    return Promise.reject(err)
  }
)

export default instance