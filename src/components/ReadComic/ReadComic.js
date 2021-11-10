/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { loadingComic } from 'actions/loading'
import { storage } from 'firebase/index'
import { getDownloadURL, ref } from 'firebase/storage'
import { ImBin } from 'react-icons/im'
import loadingImg from 'resources/loading.png'

import './ReadComic.scss'
import { getToken } from 'utils/common'
import { removeReadComic } from 'actions/ApiCall/userAPI'
import { actFetchReadComics } from 'actions/userAction'
import useQuery from 'utils/useQuery'

function ReadComic({ comic }) {

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.user)
    const token = getToken()

    const dispatch = useDispatch()
    const history = useHistory()
    const query = useQuery()

    useEffect(() => {
        getDownloadURL(ref(storage, `comics/${comic.thumbnail}`))
        .then(url => {
            setImage(url)
            dispatch(loadingComic(false))
        })
        .catch((error) => console.log(error))

        return () => setImage('')
    }, [comic])

    const handleRemoveReadComic = (comicID, chap) => {
        setLoading(true)
        if(user._id && token) {
            removeReadComic(user._id, comicID, chap, token).then(() => {
                if(query.get('page'))
                    dispatch(actFetchReadComics(user._id, query.get('page'), token))
                else
                    dispatch(actFetchReadComics(user._id, 1, token))
                setLoading(false)
            })
        }
    }

    return (
        <div className="read-comic-container">
            <div className="read-comic-image">
                { image ? <>
                    <img src={image} alt={comic.comicID} onClick={() => history.push(`/home/reading?comic=${comic.comicID}&chap=${comic.chap}`)}/>
                    <div className="remove-read-comic" onClick={() => handleRemoveReadComic(comic.comicID, comic.chap)}>
                        { !loading ? <ImBin/> :
                        <div className="spinner-border text-warning" role="status"/> }
                    </div>
                    </>
                    : 
                    <div className="loading">
                        <img src={loadingImg} alt="loading"/>
                    </div> 
                }
            </div>
            <div className="read-comic-info">
                <span onClick={() => history.push(`/home/detail-comic/${comic.comicID}`)}>{comic.title}</span>
                <span onClick={() => history.push(`/home/reading?comic=${comic.comicID}&chap=${comic.chap}`)}>Chương {comic.chap}</span>
            </div>
        </div>
    )
}

export default ReadComic
