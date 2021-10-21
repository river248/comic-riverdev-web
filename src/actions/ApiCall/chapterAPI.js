import axios from 'axios'
import { API_ROOT } from 'utils/constants'

export const fetchAllChapterOfComic = async (comicID) => {
    const request = await axios.get(`${API_ROOT}/v1/chapters/comic/${comicID}`)
    return request.data
}

export const fetchFullChapter = async (comicID, chap) => {
    const request = await axios.get(`${API_ROOT}/v1/chapters?comicID=${comicID}&chap=${chap}`)
    return request.data
}

export const fetchQuantityChapter = async (comicID) => {
    const request = await axios.get(`${API_ROOT}/v1/chapters/quantity/${comicID}`)
    return request.data
}