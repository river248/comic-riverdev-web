/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Comic from 'components/Comic/Comic'
import { useLocation  } from 'react-router-dom'
import { fetchAllComic, fetchAllComicOfTag } from 'actions/ApiCall/comicAPI'

import './ListComic.scss'
import useQuery from 'utils/useQuery'
import { useDispatch } from 'react-redux'
import { getHeightChange } from 'actions/getHeight'

function ListComic() {

    const [comics, setComics] = useState([])
    
    let query = useQuery()
    const location = useLocation()

    const dispatch = useDispatch()

    useEffect(() => {
        let isSubsribed = true
        switch (location.pathname) {
            case '/':
                if(query.get('page') !== null)
                    fetchAllComic(query.get('page')).then(comics => {
                        if(isSubsribed)
                            setComics(comics)
                    })
                else
                    fetchAllComic(1).then(comics => {
                        if(isSubsribed)
                            setComics(comics)
                    })
                break
            case '/home':
                if(query.get('page') !== null)
                    fetchAllComic(query.get('page')).then(comics => {
                        if(isSubsribed)
                            setComics(comics)
                    })
                else
                    fetchAllComic(1).then(comics => {
                        if(isSubsribed)
                            setComics(comics)
                    })
                break
            case '/category':
                if(query.get('page') !== null)
                fetchAllComicOfTag(query.get('tag'), query.get('page')).then(comics => {
                    if(isSubsribed)
                        setComics(comics)
                })
                else
                    fetchAllComicOfTag('616af71268f59ad44354b30f', 1).then(comics => {
                        if(isSubsribed)
                            setComics(comics)
                    })
                break
            default:
                break
        }
        return () => isSubsribed = false

    }, [location.search, query.get('page')])
    
    useEffect(() => {

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
