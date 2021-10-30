import { GET_USER } from "utils/constants"
import { fetchFullUser } from "./ApiCall/userAPI"

export const actFetchFullUser = (id, token) => {
    return (dispatch) => {
        return fetchFullUser(id, token).then(res => {
            dispatch(getFullUser(res.data))
        })
    }
}

export const getFullUser = (info) => {
    return {
        type: GET_USER,
        payload: info
    }
}