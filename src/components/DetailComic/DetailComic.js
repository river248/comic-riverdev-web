import React, { useState, useEffect} from 'react'
import loading from 'resources/loading.png'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'
import { FaHeart, FaEye } from 'react-icons/fa'
import { GiOpenBook } from 'react-icons/gi'
import { AiFillLike } from 'react-icons/ai'

import './DetailComic.scss'

function DetailComic() {
    
    const [image, setImage] = useState('')

    useEffect(() => {
        getDownloadURL(ref(storage, 'comics/truyen1/thumbnail.jpg'))
        .then((url) => setImage(url))
        .catch((error) => console.log(error))
    }, [])

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
                <span>Phục Thiên Thánh Chủ</span>
                <span>Tác giả: Đang cập nhật</span>
                <span>Tình trạng: Chưa hoàn thành</span>
                <span>
                    Mô tả: Truyện tranh Võ Đang Kỳ Hiệp được cập nhật nhất và đầy đủ nhất tại TruyenQQTop.Com. Hãy ghé thăm TruyenQQTop.Com mỗi ngày để được đọc các chương mới nhất của Võ Đang Kỳ Hiệp.
                </span>
                <div className="detail-comic-statistic">
                    <span>Thống kê:</span>
                    <span><AiFillLike/> 569</span>
                    <span><FaHeart/> 2,804</span>
                    <span><FaEye/> 387,465</span>
                </div>
                <div className="detail-comic-tag">
                    <div className="detail-comic-tag-item">
                        Action
                    </div>
                </div>
                <div className="detail-comic-actions">
                    <button><GiOpenBook/>Đọc từ đầu</button>
                    <button><FaHeart/> Theo dõi</button>
                    <button><AiFillLike/> Thích</button>
                </div>
            </div>
        </div>
    )
}

export default DetailComic
