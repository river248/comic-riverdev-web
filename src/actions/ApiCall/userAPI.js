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

export const fetchRegister = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/user/register`, data)
    return request.data
}

export const fetchForgotPassword = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/user/forgot-password`, data)
    return request.data
}

export const fetchResetPassword = async (id, data, token) => {
    const request = await axios.put(`${API_ROOT}/v1/user/reset-password/${id}`, data, {headers: {'x-access-token': token}})
    return request.data
}

export const likeComic = async (userID, comicID, token) => await axios.put(`${API_ROOT}/v1/user/like?userID=${userID}&comicID=${comicID}`, {
        headers: {'x-access-token': token}
    })

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

export const fetchLikedComics = async (userID, page, token) => await axios.get(`${API_ROOT}/v1/user/comics/liked?userID=${userID}&page=${page}`, { headers: { 'x-access-token': token}})

export const fetchQuantityPageLikedComics = async (userID, token) => await axios.get(`${API_ROOT}/v1/user/comics/quantity-page-liked?userID=${userID}`, { headers: { 'x-access-token': token}})

export const fetchFollowedComics = async (userID, page, token) => await axios.get(`${API_ROOT}/v1/user/comics/followed?userID=${userID}&page=${page}`, { headers: { 'x-access-token': token}})

export const fetchQuantityPageFollowedComics = async (userID, token) => await axios.get(`${API_ROOT}/v1/user/comics/quantity-page-followed?userID=${userID}`, { headers: { 'x-access-token': token}})

export const fetchReadComics = async (userID, page, token) => await axios.get(`${API_ROOT}/v1/user/history?userID=${userID}&page=${page}`, { headers: { 'x-access-token': token}})

export const removeReadComic = async (userID, comicID, chap, token) => await axios.delete(`${API_ROOT}/v1/user/remove-history?userID=${userID}&comicID=${comicID}&chap=${chap}`, { headers: { 'x-access-token': token}})

export const removeAllReadComic = async (userID, token) => await axios.delete(`${API_ROOT}/v1/user/remove-all-history?userID=${userID}`, { headers: { 'x-access-token': token}})

export const updateUser = async (userID, token, data) => await axios.put(`${API_ROOT}/v1/user/${userID}`, data, { headers: { 'x-access-token': token}})

export const fetchNotifications = async (userID, page, token) => await axios.get(
    `${API_ROOT}/v1/notification?userID=${userID}&page=${page}`, { headers: { 'x-access-token': token } })

export const removeNotification = async (token, id) => await axios.delete(
    `${API_ROOT}/v1/notification/${id}`, { header: { 'x-access-token': token }})

export const updateNotification = async (userID, token) => await axios.put(
    `${API_ROOT}/v1/notification/${userID}`, { header: { 'x-access-token': token }})