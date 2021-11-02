import axios from './axios'
import { API_ROOT } from 'utils/constants'

axios.defaults.withCredentials = true

export const fetchAllComic = async (page) => await axios.get(`${API_ROOT}/v1/comics/${page}`)

export const fetchDetailComic = async (id) => await axios.get(`${API_ROOT}/v1/comics/detail/${id}`)

export const fetchQuantityPage = async (query) => {
    let request = null
    if(query === '')
        request = await axios.get(`${API_ROOT}/v1/comics/quantity-page`)
    else
        if(query === null)
            request = await axios.get(`${API_ROOT}/v1/comics/quantity-page?tagID=0`)
        else
            request = await axios.get(`${API_ROOT}/v1/comics/quantity-page?tagID=${query}`)
    return request
}

export const fetchAllComicOfTag = async (tagID, page) => await axios.get(`${API_ROOT}/v1/comics/tag?tagID=${tagID}&page=${page}`)

export const fetchAllCommentOfComic = async (comicID, page) => await axios.get(`${API_ROOT}/v1/comics/comments?comicID=${comicID}&page=${page}`)
