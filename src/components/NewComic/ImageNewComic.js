/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import loading from 'resources/loading.png'
import { storage } from 'firebase/index'
import { ref, getDownloadURL } from 'firebase/storage'
import { useHistory } from 'react-router-dom'

function ImageNewComic({comicID, number, chap, title}) {

    const [image, setImage] = useState('')
    const history = useHistory()
    
    useEffect(() => {
        getDownloadURL(ref(storage, `comics/truyen${number}/thumbnail.jpg`))
        .then((url) => setImage(url))
        .catch((error) => console.log(error))
    }, [])

    return (
        <div className="new-comic-image">
            { image ? <img src={image} alt={title} onClick={() => history.push(`home/reading?comic=${comicID}&chap=${chap}`)}/> : 
                <div className="loading">
                    <img src={loading} alt="loading"/>
                </div> 
            }
        </div>
    )
}

export default ImageNewComic
