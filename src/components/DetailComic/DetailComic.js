/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import loading from 'resources/loading.png'
import { FaHeart, FaEye } from 'react-icons/fa'
import { GiOpenBook } from 'react-icons/gi'
import { AiFillLike } from 'react-icons/ai'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'
import { useHistory } from 'react-router-dom'

import './DetailComic.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loadingComic } from 'actions/loading'
import { getToken } from 'utils/common'
import { followComic, likeComic } from 'actions/ApiCall/userAPI'
import { actFetchFollowStatus, actFetchLikeStatus } from 'actions/userAction'

function DetailComic({ comic }) {
    
    const [image, setImage] = useState('')
    const user = useSelector(state => state.user.user)
    const likeStatus = useSelector(state => state.user.likeStatus)
    const followStatus = useSelector(state => state.user.followStatus)

    const token = getToken()
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
        if(user._id && comic._id) {
            dispatch(actFetchFollowStatus(user._id, comic._id, token))
            dispatch(actFetchLikeStatus(user._id, comic._id, token))
        }
    }, [comic])

    const handleFollow = () => {
        if(getToken()) {
            followComic(user._id, comic._id, token).then(res => {
                dispatch(actFetchFollowStatus(user._id, comic._id, token))
            })
        }
        else
            alert(`Please login!`)
    }

    const handleLike = () => {
        if(token) {
            likeComic(user._id, comic._id, token).then(res => {
                dispatch(actFetchLikeStatus(user._id, comic._id, token))
            })
        }
        else
            alert(`Please login!`)
    }

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
                    <input id="follow" type="checkbox" checked={followStatus} readOnly/>
                    <button id="follow-btn" onClick={handleFollow}><FaHeart/> {followStatus? 'Hủy theo dõi' : 'Theo dõi'}</button >
                    <input id="like" type="checkbox" checked={likeStatus} readOnly/>
                    <button id="like-btn" onClick={handleLike}><AiFillLike/> {likeStatus? 'Bỏ thích' : 'Thích'}</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DetailComic)
