import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { storage } from "firebase/index"
import loading from 'resources/loading.png'
import { ref, getDownloadURL } from 'firebase/storage'

import './Comic.scss'

function Comic() {

    const [image, setImage] = useState('')

    useEffect(() => {
        getDownloadURL(ref(storage, 'comics/truyen1/thumbnail.jpg'))
        .then((url) => setImage(url))
        .catch((error) => console.log(error))
    }, [])


    return (
        <div className="comic-container">
            <div className="comic-image">
                { image ? <img src={image} alt=""/>: 
                    <div className="loading">
                        <img src={loading} alt="loading"/>
                    </div> 
                }
                { image && <ReactTimeAgo locale="en-US" date={1630341258225}/>}
            </div>
            <div className="comic-info">
                <span>Phục Thiên Thánh Chủ</span>
                <span>Chapter 1</span>
            </div>
        </div>
    )
}

export default Comic
