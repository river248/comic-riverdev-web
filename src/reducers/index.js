import { combineReducers } from 'redux'
import comicReducer from './comicReducer'
import getHeightReducer from './getHeight'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    getHeight: getHeightReducer,
    comic: comicReducer,
    user: userReducer
})

export default rootReducer