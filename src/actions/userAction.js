import { GET_FOLLOW_STATUS, GET_LIKE_STATUS, GET_USER } from "utils/constants"
import { fetchFollowStatus, fetchFullUser, fetchLikeStatus } from "./ApiCall/userAPI"

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

export const actFetchLikeStatus = (userID, comicID, token) => {
    return (dispatch) => {
        return fetchLikeStatus(userID, comicID, token).then(res => {
            dispatch(getLikeStatus(res.data))
        })
    }
}

export const getLikeStatus = (status) => {
    return {
        type: GET_LIKE_STATUS,
        payload: status
    }
}

export const actFetchFollowStatus = (userID, comicID, token) => {
    return (dispatch) => {
        return fetchFollowStatus(userID, comicID, token).then(res => {
            dispatch(getFollowStatus(res.data))
        })
    }
}

export const getFollowStatus = (status) => {
    return {
        type: GET_FOLLOW_STATUS,
        payload: status
    }
}