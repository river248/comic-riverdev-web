/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { loadingComic } from 'actions/loading'
import { storage } from 'firebase/index'
import { getDownloadURL, ref } from 'firebase/storage'
import loading from 'resources/loading.png'

import './ReadComic.scss'

function ReadComic({ comic }) {

    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        getDownloadURL(ref(storage, `comics/${comic.thumbnail}`))
        .then(url => {
            setImage(url)
            dispatch(loadingComic(false))
        })
        .catch((error) => console.log(error))

        return () => setImage('')
    }, [comic])

    return (
        <div className="read-comic-container">
            <div className="read-comic-image">
                { image ? <img src={image} alt={comic.comicID} onClick={() => history.push(`/home/reading?comic=${comic.comicID}&chap=${comic.chap}`)}/>: 
                    <div className="loading">
                        <img src={loading} alt="loading"/>
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
