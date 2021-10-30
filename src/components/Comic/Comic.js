/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { storage } from "firebase/index"
import loading from 'resources/loading.png'
import { useHistory } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'

import './Comic.scss'
import { useDispatch } from 'react-redux'
import { loadingComic } from 'actions/loading'

function Comic({ comic }) {

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
        <div className="comic-container">
            <div className="comic-image">
                { image ? <img src={image} alt={comic.title} onClick={() => history.push(`/home/detail-comic/${comic._id}`)}/>: 
                    <div className="loading">
                        <img src={loading} alt="loading"/>
                    </div> 
                }
                { image && <ReactTimeAgo locale="en-US" date={comic.createAt}/>}
            </div>
            <div className="comic-info">
                <span onClick={() => history.push(`/home/detail-comic/${comic._id}`)}>{comic.title}</span>
            </div>
        </div>
    )
}

export default React.memo(Comic)
