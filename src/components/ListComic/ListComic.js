/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect } from 'react'
import Comic from 'components/Comic/Comic'
import { useLocation  } from 'react-router-dom'

import './ListComic.scss'
import useQuery from 'utils/useQuery'
import { useDispatch, useSelector } from 'react-redux'
import { getHeightChange } from 'actions/getHeight'
import { actFetchAllComic, actFetchAllComicOfTag, clearComics } from 'actions/comicAction'

function ListComic() {

    const comics = useSelector(state => state.comic.comics)
    
    let query = useQuery()
    const location = useLocation()

    const dispatch = useDispatch()

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                if(query.get('page') !== null)
                    dispatch(actFetchAllComic(query.get('page')))
                else
                    dispatch(actFetchAllComic(1))
                break
            case '/home':
                if(query.get('page') !== null)
                    dispatch(actFetchAllComic(query.get('page')))
                else
                    dispatch(actFetchAllComic(1))
                break
            case '/category':
                if(query.get('page') !== null)
                    dispatch(actFetchAllComicOfTag(query.get('tag'), query.get('page')))
                else
                    dispatch(actFetchAllComicOfTag('616af71268f59ad44354b30f', 1))
                break
            default:
                break
        }

        return () => dispatch(clearComics([]))
    }, [location.search])
    
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
            { comics.map(comic => (
            <div key={comic._id} className="comic-item">
                <Comic comic={comic}/>
            </div>)) }
        </div>
    )
}

export default React.memo(ListComic)
