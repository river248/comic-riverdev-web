/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import loading from 'resources/loading.png'
import { storage } from 'firebase/index'
import { ref, getDownloadURL } from 'firebase/storage'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadingNewComic } from 'actions/loading'

function ImageNewComic({comicID, number, chap, title}) {

    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        if(number)
            getDownloadURL(ref(storage, `comics/truyen${number}/thumbnail.jpg`))
            .then(url => {
                setImage(url)
                dispatch(loadingNewComic(false))
            })
            .catch((error) => console.log(error))

        return () => setImage('')
    }, [comicID, chap])

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

export default React.memo(ImageNewComic)
