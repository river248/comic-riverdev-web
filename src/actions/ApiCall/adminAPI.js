import axios from './axios'
import { API_ROOT } from 'utils/constants'

axios.defaults.withCredentials = true

export const createNewComic = async (data, role, token) => await axios.post(
    `${API_ROOT}/v1/comics?role=${role}`,
    data,
    { headers: {'x-access-token': token}}
)

export const updateComic = async (id, role, data, token) => await axios.put(
    `${API_ROOT}/v1/comics/update/${id}?role=${role}`,
    data,
    { headers: {'x-access-token': token}}
)

export const softRemoveComic = async (id, data, role, token) => await axios.put(
    `${API_ROOT}/v1/comics/soft-remove/${id}?role=${role}`,
    data,
    { headers: {'x-access-token': token}}
)

export const getSoftRemoveComics = async (page, role, token) => await axios.get(
    `${API_ROOT}/v1/comics/removed-comics/${page}?role=${role}`,
    { headers: {'x-access-token': token}}
)

export const removeComic = async (id, role, token) => await axios.delete(
    `${API_ROOT}/v1/comics/remove/${id}?role=${role}`,
    { headers: {'x-access-token': token}}
)

export const removeAllComics = async (role, token) => await axios.delete(
    `${API_ROOT}/v1/comics/remove-all?role=${role}`,
    { headers: {'x-access-token': token}}
)

export const createNewChapter = async (data, role, token) => await axios.post(
    `${API_ROOT}/v1/chapters?role=${role}`,
    data,
    { headers: {'x-access-token': token}}
)

export const updateChapter = async (id, data, role, token) => await axios.put(
    `${API_ROOT}/v1/chapters/${id}?role=${role}`,
    data,
    { headers: {'x-access-token': token}}
)
