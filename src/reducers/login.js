const { LOGIN } = require("utils/constants")

const initialState = false

const loginReducer = (state = initialState, action) => {
    
    if(action.type === LOGIN) {
        return action.payload
    } else return state
}

export default loginReducer