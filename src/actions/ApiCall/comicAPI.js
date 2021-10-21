import axios from 'axios'
import { API_ROOT } from 'utils/constants'

export const fetchAllComic = async (page) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/${page}`)
    return request.data
}

export const fetchDetailComic = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/detail/${id}`)
    return request.data
}

export const fetchQuantityPage = async () => {
    const request = await axios.get(`${API_ROOT}/v1/comics/quantity-page`)
    return request.data
}
export const fetchAllComicOfTag = async (tagID, page) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/tag?tagID=${tagID}&page=${page}`)
    return request.data
}