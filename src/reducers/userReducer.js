const { GET_USER, GET_LIKE_STATUS, GET_FOLLOW_STATUS, GET_READ_COMICS } = require("utils/constants")

const initialState = {
    user: {},
    likeStatus: false,
    followStatus: false,
    comics: []
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
        default:
            return state
    }
}

export default userReducer