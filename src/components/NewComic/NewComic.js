import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import loading from 'resources/loading.png'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'

import './NewComic.scss'

function NewComic() {

    const [image, setImage] = useState('')

    useEffect(() => {
        getDownloadURL(ref(storage, 'comics/truyen1/thumbnail.jpg'))
        .then((url) => setImage(url))
        .catch((error) => console.log(error))
    }, [])


    return (
        <div className="new-comic-container">

            <div className="new-comic-container-title">MỚI CẬP NHẬT</div>

            <div className="new-comic-container-item">
                <div className="new-comic-image">
                    { image ? <img src={image} alt=""/> : 
                        <div className="loading">
                            <img src={loading} alt="loading"/>
                        </div> 
                    }
                </div>
                <div className="new-comic-info">
                    <div>
                        <span>Phục Thiên Thánh Chủ 123123123</span>
                        <span>Tác giả: đang cập nhập</span>
                        <span>Chapter 1</span>
                    </div>
                    <span className="comic-time-post">
                        <ReactTimeAgo locale="en-US" date={1630341258225}/>
                    </span>
                </div>
            </div>

            <div className="new-comic-container-item">
                <div className="new-comic-image">
                    { image ? <img src={image} alt=""/> : 
                        <div className="loading">
                            <img src={loading} alt="loading"/>
                        </div> 
                    }
                </div>
                <div className="new-comic-info">
                    <div>
                        <span>Phục Thiên Thánh Chủ 123123123</span>
                        <span>Tác giả: đang cập nhập</span>
                        <span>Chapter 1</span>
                    </div>
                    <span className="comic-time-post">
                        <ReactTimeAgo locale="en-US" date={1630341258225}/>
                    </span>
                </div>
            </div>
            
        </div>
    )
}

export default NewComic
