import {
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
    fetchReadComics
} from "./ApiCall/userAPI"

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

export const actFetchLikedComics = (userID, page, token) => {
    return (dispatch) => {
        return fetchLikedComics(userID, page, token).then(res => {
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

export const actFetchQuantityLikedComics = (userID, token) => {
    return (dispatch) => {
        return fetchQuantityPageLikedComics(userID, token).then(res => {
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

export const actFetchFollowedComics = (userID, page, token) => {
    return (dispatch) => {
        return fetchFollowedComics(userID, page, token).then(res => {
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

export const actFetchQuantityFollowedComics = (userID, token) => {
    return (dispatch) => {
        return fetchQuantityPageFollowedComics(userID, token).then(res => {
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

export const actFetchReadComics = (userID, page, token) => {
    return (dispatch) => {
        return fetchReadComics(userID, page, token).then(res => {
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

export const actfetchNotifications = (userID, page, token) => {
    return (dispatch) => {
        return fetchNotifications(userID, page, token).then(res => {
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