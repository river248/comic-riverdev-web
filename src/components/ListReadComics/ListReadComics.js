/* eslint-disable react-hooks/exhaustive-deps */
import { loadingComic } from 'actions/loading'
import { actFetchReadComics, getReadComics } from 'actions/userAction'
import ReadComic from 'components/ReadComic/ReadComic'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getToken } from 'utils/common'
import useQuery from 'utils/useQuery'

import './ListReadComics.scss'

function ListReadComics() {

    const comics = useSelector(state => state.user.comics)
    const user = useSelector(state => state.user.user)
    const quantityPage = useSelector(state => state.comic.quantityPage)
    const token = getToken()

    let query = useQuery()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {

        if(user._id) {
            if(query.get('page')) {
                dispatch(loadingComic(true))
                dispatch(actFetchReadComics(user._id, query.get('page'), token))
            }
            else {
                console.log('hello')
                dispatch(loadingComic(true))
                dispatch(actFetchReadComics(user._id, 1, token))
            }
        }

        return () => {
            const data = { comics: [], quatitypage: -1 }
            dispatch(getReadComics(data))
        }

    }, [location.search, user])

    return (
        <div className="list-read-comic-container">
            { quantityPage > 0 && comics.map(comic => (
            <div key={comic._id} className="read-comic-item">
                <ReadComic comic={comic}/>
            </div>))}
            { quantityPage === 0 &&
            <div className="no-result">
                Chưa có truyện!
            </div>
            }
        </div>
    )
}

export default ListReadComics
