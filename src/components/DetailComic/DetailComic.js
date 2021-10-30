/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import loading from 'resources/loading.png'
import { FaHeart, FaEye } from 'react-icons/fa'
import { GiOpenBook } from 'react-icons/gi'
import { AiFillLike } from 'react-icons/ai'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'
import { useHistory } from 'react-router-dom'

import './DetailComic.scss'
import { useDispatch } from 'react-redux'
import { loadingComic } from 'actions/loading'

function DetailComic({ comic }) {
    
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(comic.thumbnail !== undefined) {
            getDownloadURL(ref(storage, `comics/${comic.thumbnail}`))
            .then(url => {
                setImage(url)
                dispatch(loadingComic(false))
            })
            .catch((error) => console.log(error))
        }

    }, [comic])

    return (
        <div className="detail-comic-container">
            <div className="detail-comic-image">
                { image ? <img src={image} alt=""/> : 
                    <div className="loading">
                        <img src={loading} alt="loading"/>
                    </div> 
                }
            </div>
            <div className="detail-comic-info">
                <span>{comic.title}</span>
                <span>Tác giả: {comic.author}</span>
                <span>Tình trạng: {comic.status}</span>
                <span>
                    Mô tả: {comic.description}
                </span>
                <div className="detail-comic-statistic">
                    <span>Thống kê:</span>
                    <span><AiFillLike/> 569</span>
                    <span><FaHeart/> 2,804</span>
                    <span><FaEye/> 387,465</span>
                </div>
                <div className="detail-comic-tag">
                    { comic.tags.map(tag => (
                        <div key={tag._id} className="detail-comic-tag-item" onClick={() => history.push(`/category?tag=${tag._id}&page=1`)}>
                            {tag.name}
                        </div>
                    )) }

                </div>
                <div className="detail-comic-actions">
                    <button onClick={() => history.push(`/home/reading?comic=${comic._id}&chap=1`)}><GiOpenBook/>Đọc từ đầu</button>
                    <button><FaHeart/> Theo dõi</button>
                    <button><AiFillLike/> Thích</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DetailComic)
