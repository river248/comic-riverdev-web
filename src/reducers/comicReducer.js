import {
    CLEAR_COMICS,
    CLEAR_DETAIL_COMIC,
    CLEAR_QUANTITY_PAGE,
    GET_CHAPTER,
    GET_CHAPTERS,
    GET_COMIC,
    GET_COMICS,
    GET_COMICS_OF_TAG,
    GET_COMMENTS,
    GET_FOLLOWED_COMICS,
    GET_INTERACTIONS,
    GET_LIKED_COMICS,
    GET_NEW_COMICS,
    GET_QUANTITY_CHAPTER,
    GET_QUANTITY_COMIC,
    GET_QUANTITY_PAGE,
    GET_QUANTITY_PAGE_FOLLOWED_COMICS,
    GET_QUANTITY_PAGE_LIKED_COMICS,
    GET_READ_COMICS,
    GET_TAG,
    GET_TAGS,
    GET_UNFINISHED_COMIC,
    SEARCH
} from "utils/constants"

const initialState = {
    comics: [],
    newComics: [],
    comic: { tags: []},
    chapters: [],
    chapter: {_id: '', title: '', chap: 0, number: 0, image: []},
    tags: [],
    tag: {name: 'Ngôn Tình'},
    quantityPage: -1,
    quantityChapter: -1,
    comments: [],
    interactions: {},
    quantityComics: 0,
    searchComics: [],
    quantitySearchPage: 0
}

const comicReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMICS:
            return { ...state, comics: action.payload }
        case GET_COMICS_OF_TAG:
            return { ...state, comics: action.payload }
        case GET_NEW_COMICS:
            return { ...state, newComics: action.payload }
        case CLEAR_COMICS:
            return { ...state, comics: action.payload }
        case GET_QUANTITY_PAGE:
            return { ...state, quantityPage: action.payload }
        case GET_COMIC:
            return { ...state, comic: action.payload }
        case GET_CHAPTERS:
            return { ...state, chapters: action.payload }
        case GET_CHAPTER:
            return { ...state, chapter: action.payload }
        case GET_QUANTITY_CHAPTER:
            return { ...state, quantityChapter: action.payload }
        case GET_TAGS:
            return { ...state, tags: action.payload }
        case GET_TAG:
            return { ...state, tag: action.payload }
        case CLEAR_DETAIL_COMIC:
            return { ...state, comic: {thumbnail: undefined, tags: []} }
        case GET_COMMENTS:
            return { ...state, comments: action.payload }
        case GET_LIKED_COMICS:
            return { ...state, comics: action.payload }
        case GET_QUANTITY_PAGE_LIKED_COMICS:
            return { ...state, quantityPage: action.payload }
        case GET_FOLLOWED_COMICS:
            return { ...state, comics: action.payload }
        case GET_QUANTITY_PAGE_FOLLOWED_COMICS:
            return { ...state, quantityPage: action.payload }
        case GET_INTERACTIONS:
            return { ...state, interactions: action.payload }
        case GET_READ_COMICS:
            return { ...state, quantityPage: action.payload.quatitypage }
        case CLEAR_QUANTITY_PAGE:
            return { ...state, quantityPage: action.payload }
        case GET_QUANTITY_COMIC:
            return { ...state, quantityComics: action.payload }
        case GET_UNFINISHED_COMIC:
            return { ...state, comics: action.payload}
        case SEARCH:
            return { ...state, searchComics: action.payload.comics, quantitySearchPage: action.payload.quantityPage }
        default:
            return state
    }
}

export default comicReducer