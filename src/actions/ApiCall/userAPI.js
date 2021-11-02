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

export const fetchFullUser = async (id, token) => await axios.get(`${API_ROOT}/v1/user/${id}`, {
        headers: {'x-access-token': token}
    })

export const fetchLogout = async () => {
    const request = await axios.get(`${API_ROOT}/v1/user/logout`)
    return request.data
}

export const likeComic = async (userID, comicID, token) => {
    const request = await axios.put(`${API_ROOT}/v1/user/like?userID=${userID}&comicID=${comicID}`, {
        headers: {'x-access-token': token}
    })
    return request.data
}

export const fetchLikeStatus = async (userID, comicID, token) => await axios.get(
    `${API_ROOT}/v1/user/like?userID=${userID}&comicID=${comicID}`,
    { headers: {'x-access-token': token}})

export const followComic = async (userID, comicID, token) => {
    const request = await axios.put(`${API_ROOT}/v1/user/follow?userID=${userID}&comicID=${comicID}`, {
        headers: {'x-access-token': token}
    })
    return request.data
}

export const fetchFollowStatus = async (userID, comicID, token) => await axios.get(
    `${API_ROOT}/v1/user/follow?userID=${userID}&comicID=${comicID}`,
    { headers: {'x-access-token': token}})

export const removeComment = async (id, token) => {
    const request = await axios.delete(`${API_ROOT}/v1/user/comment?id=${id}`,{ headers: {'x-access-token': token}})
    return request.data
}

export const postComment = async (data, token) => {
    const request = await axios.post(`${API_ROOT}/v1/user/comment`, data, { headers: {'x-access-token': token}})
    return request.data
}

export const updateComment = async (id, data, token) => {
    const request = await axios.put(`${API_ROOT}/v1/user/comment/${id}`, data, { headers: {'x-access-token': token}})
    return request.data
}

export const addHistory = async (data, token) => await axios.post(`${API_ROOT}/v1/user/history`, data, { headers: {'x-access-token': token}})
