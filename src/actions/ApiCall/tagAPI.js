import axios from './axios'
import { API_ROOT } from 'utils/constants'

axios.defaults.withCredentials = true

export const fetchAllTag = async () => await axios.get(`${API_ROOT}/v1/tags`)

export const fetchDetailTag = async (id) => await axios.get(`${API_ROOT}/v1/tags/${id}`)