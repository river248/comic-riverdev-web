import { GET_HEIGHT } from "utils/constants"

const initialState = 0

const getHeightReducer = (state = initialState, action) => {
    
    if(action.type === GET_HEIGHT) {
        return action.payload
    }
    else return state
}

export default getHeightReducer