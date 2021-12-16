/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect } from 'react'
import Comic from 'components/Comic/Comic'
import { useLocation  } from 'react-router-dom'
import { connect } from 'react-redux'

import './ListComic.scss'
import useQuery from 'utils/useQuery'
import { getHeightChange } from 'actions/getHeight'
import { actFetchAllComic, actFetchAllComicOfTag, clearComics } from 'actions/comicAction'
import { loadingComic } from 'actions/loading'
import { actFetchFollowedComics, actFetchLikedComics } from 'actions/userAction'

function ListComic(props) {

    const {
        comics, user, quantityPage, token,
        fetchAllComics,
        fetchAllComicOfTag,
        fetchLikedComics,
        fetchFollowedComics,
        getHeightChange,
        loadingComic,
        clearComics } = props

    let query = useQuery()
    const location = useLocation()

    useLayoutEffect(() => {
        switch (location.pathname) {
            case '/':
                if(query.get('page') !== null) {
                    loadingComic()
                    fetchAllComics(query.get('page'))
                }
                else {
                    loadingComic()
                    fetchAllComics(1)
                }
                break
            case '/home':
                if(query.get('page') !== null) {
                    loadingComic()
                    fetchAllComics(query.get('page'))
                }
                else {
                    loadingComic()
                    fetchAllComics(1)
                }
                break
            case '/category':
                if(query.get('page') !== null) {
                    loadingComic()
                    fetchAllComicOfTag(query.get('tag'), query.get('page'))
                }
                else {
                    loadingComic()
                    fetchAllComicOfTag('616af71268f59ad44354b30f', 1)
                }
                break
            case '/history/liked':
                if(query.get('page') !== null && token) {
                    loadingComic()
                    fetchLikedComics(query.get('page'), token)
                }
                else
                    if (token) {
                        loadingComic()
                        fetchLikedComics(1, token)
                    }
                break
            case '/history/followed':
                if(query.get('page') !== null && token) {
                    loadingComic()
                    fetchFollowedComics(query.get('page'), token)
                }
                else
                    if (token) {
                        loadingComic()
                        fetchFollowedComics(1, token)
                    }
                break
            default:
                break
        }


        return () => clearComics()

    }, [location.search, location.pathname, user])
    
    useLayoutEffect(() => {

        getHeightChange(document.getElementById("category-height").scrollHeight)

    }, [comics])

    useEffect(() => {

        const handleResize = () => {
            getHeightChange(document.getElementById("category-height").scrollHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)

    }, [])

    return (
        <div id='category-height' className="list-comic-container">
            { quantityPage > 0 && comics.map(comic => (
            <div key={comic._id} className="comic-item">
                <Comic comic={comic}/>
            </div>))}
            { quantityPage === 0 &&
            <div className="no-result">
                Chưa có truyện!
            </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        comics: state.comic.comics,
        user: state.user.user,
        quantityPage: state.comic.quantityPage,
        token: state.user.token
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchAllComics : (page) => {
            dispatch(actFetchAllComic(page))
        },
        fetchAllComicOfTag : (tag, page) => {
            dispatch(actFetchAllComicOfTag(tag, page))
        },
        fetchLikedComics : (page, token) => {
            dispatch(actFetchLikedComics(page, token))
        },
        fetchFollowedComics : (page, token) => {
            dispatch(actFetchFollowedComics(page, token))
        },
        loadingComic : () => {
            dispatch(loadingComic(true))
        },
        getHeightChange : (height) => {
            dispatch(getHeightChange(height))
        },
        clearComics : () => {
            dispatch(clearComics([]))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListComic))
