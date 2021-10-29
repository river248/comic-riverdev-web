import axios from './axios'
import { API_ROOT } from 'utils/constants'

axios.defaults.withCredentials = true

export const fetchAllComic = async (page) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/${page}`)
    return request.data
}

export const fetchDetailComic = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/detail/${id}`)
    return request.data
}

export const fetchQuantityPage = async (query) => {
    let request = null
    if(query === '')
        request = await axios.get(`${API_ROOT}/v1/comics/quantity-page`)
    else
        if(query === null)
            request = await axios.get(`${API_ROOT}/v1/comics/quantity-page?tagID=0`)
        else
            request = await axios.get(`${API_ROOT}/v1/comics/quantity-page?tagID=${query}`)
    return request.data
}

export const fetchAllComicOfTag = async (tagID, page) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/tag?tagID=${tagID}&page=${page}`)
    return request.data
}