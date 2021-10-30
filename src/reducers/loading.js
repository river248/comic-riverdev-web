import { LOADING_CHAPTER, LOADING_COMIC, LOADING_NEW_COMIC } from 'utils/constants'

const initialState = {
    comicLoading: false,
    newComicLoading: false,
    chapterLoading: false
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_COMIC:
            return {...state, comicLoading: action.payload}
        case LOADING_NEW_COMIC:
            return {...state, newComicLoading: action.payload}
        case LOADING_CHAPTER:
            return {...state, chapterLoading: action.payload}
        default:
            return state
    }
}

export default loadingReducer