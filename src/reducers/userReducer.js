const { GET_USER } = require("utils/constants")

const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    if(action.type === GET_USER)
        return {...state, user: action.payload}
    else
        return state
}

export default userReducer