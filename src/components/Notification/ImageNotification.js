/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { storage } from 'firebase/index'
import { ref, getDownloadURL } from 'firebase/storage'

function ImageNotification({thumbnail, number}) {

    const [image, setImage] = useState('')

    useEffect(() => {
        let isSubcribe = true
        if(number && thumbnail)
            getDownloadURL(ref(storage, `comics/truyen${number}/${thumbnail}`))
            .then(url => {
                if (isSubcribe)
                    setImage(url)
            })
            .catch((error) => console.log(error))

        return () => {
            isSubcribe = false
            setImage('')
        }
    }, [number, thumbnail])

    return (
        <>
            { image ? <img src={image} alt={thumbnail}/> : 
                <div className="loading-image"/> 
            }
        </>
    )
}

export default ImageNotification
