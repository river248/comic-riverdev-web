const { GET_ALL_USERS, REMOVE_USER } = require("utils/constants")

const initialState = {
    users: [],
    removeUser: { show: false, id: '', email: '', username: '' }
}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, users: action.payload }
        case REMOVE_USER:
            return { ...state, removeUser: action.payload }
        default:
            return state
    }

}

export default adminReducer