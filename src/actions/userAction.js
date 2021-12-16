import {
    ACCESS_TOKEN,
    CONFIRM,
    GET_FOLLOWED_COMICS,
    GET_FOLLOW_STATUS,
    GET_LIKED_COMICS,
    GET_LIKE_STATUS,
    GET_NOTIFICATIONS,
    GET_QUANTITY_PAGE_FOLLOWED_COMICS,
    GET_QUANTITY_PAGE_LIKED_COMICS,
    GET_READ_COMICS,
    GET_USER,
    SEEN_NOTIFICATION,
    SHOW_NOTIFICATION
} from "utils/constants"

import {
    fetchFollowedComics,
    fetchFollowStatus,
    fetchFullUser,
    fetchLikedComics,
    fetchLikeStatus,
    fetchNotifications,
    fetchQuantityPageFollowedComics,
    fetchQuantityPageLikedComics,
    fetchReadComics,
    getAccessToken
} from "./ApiCall/userAPI"

export const actFetchFullUser = (token) => {
    return (dispatch) => {
        return fetchFullUser(token).then(res => {
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

export const actFetchLikeStatus = (comicID, token) => {
    return (dispatch) => {
        return fetchLikeStatus(comicID, token).then(res => {
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

export const actFetchFollowStatus = (comicID, token) => {
    return (dispatch) => {
        return fetchFollowStatus(comicID, token).then(res => {
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

export const actFetchLikedComics = (page, token) => {
    return (dispatch) => {
        return fetchLikedComics(page, token).then(res => {
            dispatch(getLikedComics(res.data))
        })
    }
}

export const getLikedComics = (comics) => {
    return {
        type: GET_LIKED_COMICS,
        payload: comics
    }
}

export const actFetchQuantityLikedComics = (token) => {
    return (dispatch) => {
        return fetchQuantityPageLikedComics(token).then(res => {
            dispatch(getQuantityLikedComics(res.data))
        })
    }
}

export const getQuantityLikedComics = (quantity) => {
    return {
        type: GET_QUANTITY_PAGE_LIKED_COMICS,
        payload: quantity
    }
}

export const actFetchFollowedComics = (page, token) => {
    return (dispatch) => {
        return fetchFollowedComics(page, token).then(res => {
            dispatch(getFollowedComics(res.data))
        })
    }
}

export const getFollowedComics = (comics) => {
    return {
        type: GET_FOLLOWED_COMICS,
        payload: comics
    }
}

export const actFetchQuantityFollowedComics = (token) => {
    return (dispatch) => {
        return fetchQuantityPageFollowedComics(token).then(res => {
            dispatch(getQuantityFollowedComics(res.data))
        })
    }
}

export const getQuantityFollowedComics = (quantity) => {
    return {
        type: GET_QUANTITY_PAGE_FOLLOWED_COMICS,
        payload: quantity
    }
}

export const actFetchReadComics = (page, token) => {
    return (dispatch) => {
        return fetchReadComics(page, token).then(res => {
            dispatch(getReadComics(res.data))
        })
    }
}

export const getReadComics = (data) => {
    return {
        type: GET_READ_COMICS,
        payload: data
    }
}

export const actfetchNotifications = (page, token) => {
    return (dispatch) => {
        return fetchNotifications(page, token).then(res => {
            dispatch(getNotifications(res.data))
        })
    }
}

export const getNotifications = (data) => {
    return {
        type: GET_NOTIFICATIONS,
        payload: data
    }
}

export const showNotification = (status) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: status
    }
}

export const seenNotification = () => {
    return {
        type: SEEN_NOTIFICATION,
        payload: 0
    }
}

export const actConfirm = (data) => {
    return {
        type: CONFIRM,
        payload: data
    }
}

export const actGetAccessToken = () => {
    return (dispatch) => {
        return getAccessToken().then(res => {
            dispatch(fetchAccessToken(res.data.accessToken))
        })
    }
}

export const fetchAccessToken = (token) => {
    return {
        type: ACCESS_TOKEN,
        payload: token
    }
}