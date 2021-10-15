import React, {useEffect, useState} from 'react'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'

function DetailPage() {

    const [image, setImage] = useState('')

    useEffect(() => {
        getDownloadURL(ref(storage, 'comics/truyen1/thumbnail.jpg'))
        .then((url) => setImage(url))
        .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            <img src={image} alt=""/> 
        </div>
    )
}

export default DetailPage
