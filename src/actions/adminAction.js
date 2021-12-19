import { GET_ALL_USERS, REMOVE_USER } from "utils/constants"
import { getAllUsers } from "./ApiCall/adminAPI"

export const actFetchAllUsers = (token) => {
    return (dispatch) => {
        return getAllUsers(token).then(res => {
            dispatch(fetchAllUsers(res.data))
        })
    }
}

export const fetchAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users
    }
}

export const removeThisUser = (data) => {
    return {
        type: REMOVE_USER,
        payload: data
    }
}