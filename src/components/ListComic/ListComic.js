/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect } from 'react'
import Comic from 'components/Comic/Comic'
import { useLocation  } from 'react-router-dom'

import './ListComic.scss'
import useQuery from 'utils/useQuery'
import { useDispatch, useSelector } from 'react-redux'
import { getHeightChange } from 'actions/getHeight'
import { actFetchAllComic, actFetchAllComicOfTag, clearComics } from 'actions/comicAction'
import { loadingComic } from 'actions/loading'
import { actFetchFollowedComics, actFetchLikedComics } from 'actions/userAction'

function ListComic() {

    const comics = useSelector(state => state.comic.comics)
    const user = useSelector(state => state.user.user)
    const quantityPage = useSelector(state => state.comic.quantityPage)

    let query = useQuery()
    const location = useLocation()

    const dispatch = useDispatch()

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                if(query.get('page') !== null) {
                    dispatch(loadingComic(true))
                    dispatch(actFetchAllComic(query.get('page')))
                }
                else {
                    dispatch(loadingComic(true))
                    dispatch(actFetchAllComic(1))
                }
                break
            case '/home':
                if(query.get('page') !== null) {
                    dispatch(loadingComic(true))
                    dispatch(actFetchAllComic(query.get('page')))
                }
                else {
                    dispatch(loadingComic(true))
                    dispatch(actFetchAllComic(1))
                }
                break
            case '/category':
                if(query.get('page') !== null) {
                    dispatch(loadingComic(true))
                    dispatch(actFetchAllComicOfTag(query.get('tag'), query.get('page')))
                }
                else {
                    dispatch(loadingComic(true))
                    dispatch(actFetchAllComicOfTag('616af71268f59ad44354b30f', 1))
                }
                break
            case '/history/liked':
                if(query.get('page') !== null && user._id !== undefined) {
                    dispatch(loadingComic(true))
                    dispatch(actFetchLikedComics(user?._id, query.get('page')))
                }
                else
                    if (user._id !== undefined) {
                        dispatch(loadingComic(true))
                        dispatch(actFetchLikedComics(user._id, 1))
                    }
                break
            case '/history/followed':
                if(query.get('page') !== null && user._id !== undefined) {
                    dispatch(loadingComic(true))
                    dispatch(actFetchFollowedComics(user._id, query.get('page')))
                }
                else
                    if (user._id !== undefined) {
                        dispatch(loadingComic(true))
                        dispatch(actFetchFollowedComics(user._id, 1))
                    }
                break
            default:
                break
        }

        return () => dispatch(clearComics([]))

    }, [location.search, location.pathname, user])
    
    useLayoutEffect(() => {

        const action = getHeightChange(document.getElementById("category-height").scrollHeight)
        dispatch(action)

    }, [comics])

    useEffect(() => {

        const handleResize = () => {
            const action = getHeightChange(document.getElementById("category-height").scrollHeight)
            dispatch(action)
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

export default React.memo(ListComic)
