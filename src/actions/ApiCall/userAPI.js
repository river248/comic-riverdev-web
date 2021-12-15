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

export const fetchFullUser = async (token) => await axios.get(`${API_ROOT}/v1/user`, {
        headers: {'x-access-token': token}
})

export const fetchLogout = async () => {
    const request = await axios.get(`${API_ROOT}/v1/user/logout`)
    return request.data
}

export const fetchRegister = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/user/register`, data)
    return request.data
}

export const fetchForgotPassword = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/user/forgot-password`, data)
    return request.data
}

export const fetchResetPassword = async (data, token) => {
    const request = await axios.put(`${API_ROOT}/v1/user/reset-password`, data, {headers: {'x-access-token': token}})
    return request.data
}

export const likeComic = async (comicID, token) => await axios.put(`${API_ROOT}/v1/user/like?comicID=${comicID}`, {
        headers: {'x-access-token': token}
    })

export const fetchLikeStatus = async (comicID, token) => await axios.get(
    `${API_ROOT}/v1/user/like?comicID=${comicID}`,
    { headers: {'x-access-token': token}})

export const followComic = async (comicID, token) => {
    const request = await axios.put(`${API_ROOT}/v1/user/follow?comicID=${comicID}`, {
        headers: {'x-access-token': token}
    })
    return request.data
}

export const fetchFollowStatus = async (comicID, token) => await axios.get(
    `${API_ROOT}/v1/user/follow?comicID=${comicID}`,
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

export const fetchLikedComics = async (page, token) => await axios.get(`${API_ROOT}/v1/user/comics/liked?page=${page}`, { headers: { 'x-access-token': token}})

export const fetchQuantityPageLikedComics = async (token) => await axios.get(`${API_ROOT}/v1/user/comics/quantity-page-liked`, { headers: { 'x-access-token': token}})

export const fetchFollowedComics = async (page, token) => await axios.get(`${API_ROOT}/v1/user/comics/followed?page=${page}`, { headers: { 'x-access-token': token}})

export const fetchQuantityPageFollowedComics = async (token) => await axios.get(`${API_ROOT}/v1/user/comics/quantity-page-followed`, { headers: { 'x-access-token': token}})

export const fetchReadComics = async (page, token) => await axios.get(`${API_ROOT}/v1/user/history?page=${page}`, { headers: { 'x-access-token': token}})

export const removeReadComic = async (comicID, chap, token) => await axios.delete(`${API_ROOT}/v1/user/remove-history?comicID=${comicID}&chap=${chap}`, { headers: { 'x-access-token': token}})

export const removeAllReadComic = async (token) => await axios.delete(`${API_ROOT}/v1/user/remove-all-history`, { headers: { 'x-access-token': token}})

export const updateUser = async (token, data) => await axios.put(`${API_ROOT}/v1/user`, data, { headers: { 'x-access-token': token}})

export const fetchNotifications = async (page, token) => await axios.get(
    `${API_ROOT}/v1/notification?page=${page}`, { headers: { 'x-access-token': token } })

export const removeNotification = async (token, id) => await axios.delete(
    `${API_ROOT}/v1/notification/${id}`, { header: { 'x-access-token': token }})

export const updateNotification = async (token) => await axios.put(
    `${API_ROOT}/v1/notification`, { header: { 'x-access-token': token }})