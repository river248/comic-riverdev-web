/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import loading from 'resources/loading.png'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'
import { useDispatch } from 'react-redux'
import { loadingChapter } from 'actions/loading'

function ImagesComic({comicNumber, chap, image}) {

    const [img, setImg] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
            getDownloadURL(ref(storage, `comics/truyen${comicNumber}/chap${chap}/${image}.jpg`))
            .then(url => {
                setImg(url)
                dispatch(loadingChapter(false))
            })
            .catch((error) => console.log(error))
        
        return () => setImg('')
    }, [chap])

    return (
        <>
            { img && <img src={img} alt={image}/> }
            { !img &&
                <div className="loading">
                    <img src={loading} alt="loading"/>
                </div> }
        </>
    )
}

export default React.memo(ImagesComic)
