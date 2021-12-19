import axios from './axios'
import { API_ROOT } from 'utils/constants'

axios.defaults.withCredentials = true

export const createNewComic = async (data, token) => await axios.post(
    `${API_ROOT}/v1/comics`,
    data,
    { headers: {'x-access-token': token}}
)

export const updateComic = async (id, data, token) => await axios.put(
    `${API_ROOT}/v1/comics/update/${id}`,
    data,
    { headers: {'x-access-token': token}}
)

export const softRemoveComic = async (id, data, token) => await axios.put(
    `${API_ROOT}/v1/comics/soft-remove/${id}`,
    data,
    { headers: {'x-access-token': token}}
)

export const getSoftRemoveComics = async (page, token) => await axios.get(
    `${API_ROOT}/v1/comics/removed-comics/${page}`,
    { headers: {'x-access-token': token}}
)

export const removeComic = async (id, token) => await axios.delete(
    `${API_ROOT}/v1/comics/remove/${id}`,
    { headers: {'x-access-token': token}}
)

export const removeAllComics = async (token) => await axios.delete(
    `${API_ROOT}/v1/comics/remove-all`,
    { headers: {'x-access-token': token}}
)

export const createNewChapter = async (data, token) => await axios.post(
    `${API_ROOT}/v1/chapters`,
    data,
    { headers: {'x-access-token': token}}
)

export const updateChapter = async (id, data, token) => await axios.put(
    `${API_ROOT}/v1/chapters/${id}`,
    data,
    { headers: {'x-access-token': token}}
)

export const getAllUsers = async (token) => await axios.get(
    `${API_ROOT}/v1/user/get-all-users`,
    { headers: {'x-access-token': token}}
)

export const removeUser = async (data, token) => await axios.put(
    `${API_ROOT}/v1/user/remove-user`,
    data,
    { headers: {'x-access-token': token}}
)