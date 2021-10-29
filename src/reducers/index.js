import { combineReducers } from 'redux'
import getHeightReducer from './getHeight'
import loginReducer from './login'


const rootReducer = combineReducers({
    getHeight: getHeightReducer,
    login: loginReducer
})

export default rootReducer