import { combineReducers } from 'redux'
import adminReducer from './adminReducer'
import comicReducer from './comicReducer'
import getHeightReducer from './getHeight'
import loadingReducer from './loading'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    getHeight: getHeightReducer,
    comic: comicReducer,
    user: userReducer,
    loading: loadingReducer,
    admin: adminReducer,
})

export default rootReducer