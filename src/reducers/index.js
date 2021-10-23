import { combineReducers } from 'redux'
import getHeightReducer from './getHeight'


const rootReducer = combineReducers({
    getHeight: getHeightReducer,
})

export default rootReducer