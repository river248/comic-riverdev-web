import { LOADING_CHAPTER, LOADING_COMIC, LOADING_NEW_COMIC } from "utils/constants"

export const loadingComic = (status) => {
    return {
        type: LOADING_COMIC,
        payload: status
    }
}

export const loadingNewComic = (status) => {
    return {
        type: LOADING_NEW_COMIC,
        payload: status
    }
}

export const loadingChapter = (status) => {
    return {
        type: LOADING_CHAPTER,
        payload: status
    }
}