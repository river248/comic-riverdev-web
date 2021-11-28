/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'

function ImageComic({comicID, number, thumbnail}) {

    const [url, setUrl] = useState('')

    useEffect(() => {
        let isSubcribe = true
        if(comicID && number && thumbnail) {
            getDownloadURL(ref(storage, `comics/truyen${number}/${thumbnail}`))
                .then(url => {
                    if(isSubcribe)
                        setUrl(url)
                })
                .catch((error) => console.log(error))
        }
        return () => {
            setUrl('')
            isSubcribe = false
        }
    }, [comicID])

    return (
        <>
            {url ? <div className="image-search-item"><img src={url} alt=""/></div> : <div className="load-image"/>}
        </>
    )
}

export default ImageComic
