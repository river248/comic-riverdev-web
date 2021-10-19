import axios from "axios"
import { API_ROOT } from "utils/constants"

export const fetchAllComic = async (page) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/${page}`)
    return request.data
}

export const fetchDetailComic = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/comics/detail/${id}`)
    return request.data
}

export const fetchAllChapterOfComic = async (comicID) => {
    const request = await axios.get(`${API_ROOT}/v1/chapters/comic/${comicID}`)
    return request.data
}

export const fetchAllTag = async () => {
    const request = await axios.get(`${API_ROOT}/v1/tags`)
    return request.data
}