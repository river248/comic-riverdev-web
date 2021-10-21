import axios from 'axios'
import { API_ROOT } from 'utils/constants'

export const fetchAllTag = async () => {
    const request = await axios.get(`${API_ROOT}/v1/tags`)
    return request.data
}
