import { combineReducers } from 'redux'
import comicReducer from './comicReducer'
import getHeightReducer from './getHeight'
import loadingReducer from './loading'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    getHeight: getHeightReducer,
    comic: comicReducer,
    user: userReducer,
    loading: loadingReducer
})

export default rootReducer