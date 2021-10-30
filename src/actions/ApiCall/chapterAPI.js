import axios from './axios'
import { API_ROOT } from 'utils/constants'

axios.defaults.withCredentials = true

export const fetchAllChapterOfComic = async (comicID) => await axios.get(`${API_ROOT}/v1/chapters/comic/${comicID}`)

export const fetchFullChapter = async (comicID, chap) => await axios.get(`${API_ROOT}/v1/chapters?comicID=${comicID}&chap=${chap}`)

export const fetchQuantityChapter = async (comicID) => await axios.get(`${API_ROOT}/v1/chapters/quantity/${comicID}`)


export const fetchNewComics = async () => await axios.get(`${API_ROOT}/v1/chapters/new-comics`)
