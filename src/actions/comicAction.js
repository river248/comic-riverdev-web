import {
    CLEAR_COMICS,
    CLEAR_DETAIL_COMIC,
    GET_CHAPTER,
    GET_CHAPTERS,
    GET_COMIC,
    GET_COMICS,
    GET_COMICS_OF_TAG,
    GET_COMMENTS,
    GET_INTERACTIONS,
    GET_NEW_COMICS,
    GET_QUANTITY_CHAPTER,
    GET_QUANTITY_PAGE,
    GET_TAG,
    GET_TAGS,
    CLEAR_QUANTITY_PAGE,
    GET_QUANTITY_COMIC,
    GET_UNFINISHED_COMIC,
    SEARCH
} from "utils/constants"

import {
    fetchAllChapterOfComic,
    fetchFullChapter,
    fetchNewComics,
    fetchQuantityChapter
} from "./ApiCall/chapterAPI"

import {
    fetchAllComic,
    fetchAllComicOfTag,
    fetchAllCommentOfComic,
    fetchDetailComic,
    fetchInteractions,
    fetchQuantityPage,
    fetchUnfinishedComic,
    searchComic
} from "./ApiCall/comicAPI"
import { fetchAllTag, fetchDetailTag } from "./ApiCall/tagAPI"

//-------------Comic Action ----------------------------
export const actFetchAllComic = (page) => {
    return (dispatch) => {
        return fetchAllComic(page).then(res => {
            dispatch(getComics(res.data.comics))
        })
    }
}

export const getComics = (comics) => {
    return {
        type: GET_COMICS,
        payload: comics
    }
}

export const actFetchAllComicOfTag = (tagID, page) => {
    return (dispatch) => {
        return fetchAllComicOfTag(tagID, page).then(res => {
            dispatch(getComics(res.data))
        })
    }
}

export const getComicsOfTag = (comics) => {
    return {
        type: GET_COMICS_OF_TAG,
        payload: comics
    }
}

export const actFetchNewComics = () => {
    return (dispatch) => {
        return fetchNewComics().then(res => {
            dispatch(getNewComics(res.data))
        })
    }
}

export const getNewComics = (newcomics) => {
    return {
        type: GET_NEW_COMICS,
        payload: newcomics
    }
}

export const actFetchQuantityPage = (query) => {
    return (dispatch) => {
        return fetchQuantityPage(query).then(res => {
            dispatch(getQuantityPage(res.data))
        })
    }
}

export const getQuantityPage = (quantity) => {
    return {
        type: GET_QUANTITY_PAGE,
        payload: quantity
    }
}

export const actFetchDetailComic = (id) => {
    return (dispatch) => {
        return fetchDetailComic(id).then(res => {
            dispatch(getDetailComic(res.data))
        })
    }
}

export const getDetailComic = (comic) => {
    return {
        type: GET_COMIC,
        payload: comic
    }
}

export const actFetchInteractions = (comicID) => {
    return (dispatch) => {
        return fetchInteractions(comicID).then(res => {
            dispatch(getInteractions(res.data))
        })
    }
}

export const getInteractions = (interactions) => {
    return {
        type: GET_INTERACTIONS,
        payload: interactions
    }
}

export const actFetchQuantityComic = () => {
    return (dispatch) => {
        return fetchAllComic(1).then(res => {
            dispatch(getQuantityComics(res.data.quantityComic))
        })
    }
}

export const getQuantityComics = (quantity) => {
    return {
        type: GET_QUANTITY_COMIC,
        payload: quantity
    }
}

export const actFetchUnfinishedComic = () => {
    return (dispatch) => {
        return fetchUnfinishedComic().then(res => {
            dispatch(getUnfinishedComics(res.data))
        })
    }
}

export const getUnfinishedComics = (comics) => {
    return {
        type: GET_UNFINISHED_COMIC,
        payload: comics
    }
}

export const actSearchComic = (key, page) => {
    return (dispatch) => {
        return searchComic(key, page).then(res => {
            dispatch(getSearchComics(res.data))
        })
    }
}

export const getSearchComics = (data) => {
    return {
        type: SEARCH,
        payload: data
    }
}

//------------------------Chapter Action ----------------------
export const actFetchAllChapterOfComic = (comicID) => {
    return (dispatch) => {
        return fetchAllChapterOfComic(comicID).then(res => {
            dispatch(getAllChapterOfComic(res.data))
        })
    }
}

export const getAllChapterOfComic = (chapters) => {
    return {
        type: GET_CHAPTERS,
        payload: chapters
    }
}

export const actFetchFullChapter = (comicID, chap) => {
    return (dispatch) => {
        return fetchFullChapter(comicID, chap).then(res => {
            dispatch(getFullChapter(res.data))
        })
    }
}

export const getFullChapter = (chapter) => {
    return {
        type: GET_CHAPTER,
        payload: chapter
    }
}

export const actFetchQuantityChapter = (comicID) => {
    return (dispatch) => {
        return fetchQuantityChapter(comicID).then(res => {
            dispatch(getQuantityChapter(res.data))
        })
    }
}

export const getQuantityChapter = (quantity) => {
    return {
        type: GET_QUANTITY_CHAPTER,
        payload: quantity
    }
}

// ------------------------Tag Action ---------------------------------
export const actFetchAllTag = () => {
    return (dispatch) => {
        return fetchAllTag().then(res => {
            dispatch(getAllTag(res.data))
        })
    }
}

export const getAllTag = (tags) => {
    return {
        type: GET_TAGS,
        payload: tags
    }
}

export const actFetchDetailTag = (id) => {
    return (dispatch) => {
        return fetchDetailTag(id).then(res => {
            dispatch(getDetailTag(res.data))
        })
    }
}

export const getDetailTag = (tags) => {
    return {
        type: GET_TAG,
        payload: tags
    }
}

// -------------------- Comments ---------------------

export const actComments = (comicID, page) => {
    return (dispatch) => {
        return fetchAllCommentOfComic(comicID, page).then(res => {
            dispatch(getComments(res.data))
        })
    }
}

export const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}
//-------Clear func ----------------------------

export const clearComics = (comics) => {
    return {
        type: CLEAR_COMICS,
        payload: comics
    }
}

export const clearDetailComic = () => {
    return {
        type: CLEAR_DETAIL_COMIC,
    }
}

export const clearQuantityPage = (quantityPage) => {
    return {
        type: CLEAR_QUANTITY_PAGE,
        payload: quantityPage
    }
}