const { GET_USER, GET_LIKE_STATUS, GET_FOLLOW_STATUS, GET_READ_COMICS, GET_NOTIFICATIONS, SHOW_NOTIFICATION, SEEN_NOTIFICATION, CONFIRM } = require("utils/constants")

const initialState = {
    user: {},
    likeStatus: false,
    followStatus: false,
    comics: [],
    notifications: [],
    quantityPageNotification: 0,
    yet: 0,
    show: false,
    confirmStatus: {show: false, comicID: '', chap: 0, chapterID: '', title: ''}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {...state, user: action.payload}
        case GET_LIKE_STATUS:
            return {...state, likeStatus: action.payload}
        case GET_FOLLOW_STATUS:
            return {...state, followStatus: action.payload}
        case GET_READ_COMICS:
            return {...state, comics: action.payload.comics}
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload.notifications,
                quantityPageNotification: action.payload.quantityPage,
                yet: action.payload.yet
            }
        case SHOW_NOTIFICATION:
            return {
                ...state,
                show: action.payload
            }
        case SEEN_NOTIFICATION:
            return { ...state, yet: action.payload }
        case CONFIRM:
            return { ...state, confirmStatus: action.payload }
        default:
            return state
    }
}

export default userReducer