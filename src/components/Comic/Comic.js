/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { storage } from "firebase/index"
import loading from 'resources/loading.png'
import { useHistory } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'

import './Comic.scss'

function Comic({ comic }) {

    const [image, setImage] = useState('')
    const history = useHistory()

    useEffect(() => {
        getDownloadURL(ref(storage, `comics/${comic.thumbnail}`))
        .then((url) => setImage(url))
        .catch((error) => console.log(error))
    }, [])


    return (
        <div className="comic-container">
            <div className="comic-image">
                { image ? <img src={image} alt={comic.title} onClick={() => history.push(`/comic/${comic._id}`)}/>: 
                    <div className="loading">
                        <img src={loading} alt="loading"/>
                    </div> 
                }
                { image && <ReactTimeAgo locale="en-US" date={comic.createAt}/>}
            </div>
            <div className="comic-info">
                <span onClick={() => history.push(`/comic/${comic._id}`)}>{comic.title}</span>
            </div>
        </div>
    )
}

export default Comic
