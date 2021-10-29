import axios from './axios'
import { API_ROOT } from 'utils/constants'

axios.defaults.withCredentials = true

export const fetchLogin = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/user/login`, data)
    return request.data
}

export const fetchGoogleLogin = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/user/google-login`, data)
    return request.data
}

export const fetchFullUser = async (id, token) => {
    const request = await axios.get(`${API_ROOT}/v1/user/${id}`, {
        headers: {'x-access-token': token}
    })
    return request.data
}

export const fetchLogout = async () => {
    const request = await axios.get(`${API_ROOT}/v1/user/logout`)
    return request.data
}