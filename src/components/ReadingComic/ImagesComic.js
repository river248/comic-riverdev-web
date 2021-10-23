/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import loading from 'resources/loading.png'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'

function ImagesComic({comicNumber, chap, image}) {

    const [img, setImg] = useState('')

    useEffect(() => {
            getDownloadURL(ref(storage, `comics/truyen${comicNumber}/chap${chap}/${image}.jpg`))
            .then((url) => setImg(url))
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
