const { GET_USER, GET_LIKE_STATUS, GET_FOLLOW_STATUS } = require("utils/constants")

const initialState = {
    user: {},
    likeStatus: false,
    followStatus: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {...state, user: action.payload}
        case GET_LIKE_STATUS:
            return {...state, likeStatus: action.payload}
        case GET_FOLLOW_STATUS:
            return {...state, followStatus: action.payload}
        default:
            return state
    }
}

export default userReducer