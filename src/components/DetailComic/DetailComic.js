/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import loading from 'resources/loading.png'
import { FaHeart, FaEye } from 'react-icons/fa'
import { GiOpenBook } from 'react-icons/gi'
import { MdModeEditOutline } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { storage } from "firebase/index"
import { ref, getDownloadURL } from 'firebase/storage'
import { useHistory } from 'react-router-dom'

import './DetailComic.scss'
import { connect } from 'react-redux'
import { loadingComic } from 'actions/loading'
import { getToken } from 'utils/common'
import { followComic, likeComic } from 'actions/ApiCall/userAPI'
import { actFetchFollowStatus, actFetchLikeStatus } from 'actions/userAction'
import { actFetchInteractions } from 'actions/comicAction'
import EditComic from 'components/Modal/EditComic'

function DetailComic(props) {
    
    const {
        comic, interactions,
        user, likeStatus, followStatus, chapters,
        loadingComic,
        fetchLikeStatus,
        fetchFollowStatus,
        fetchInteractions
    } = props
    
    const [image, setImage] = useState('')
    const [loadingLike, setLoadingLike] = useState(false)
    const [loadingFollow, setLoadingFollow] = useState(false)
    const [showBox, setShowBox] = useState(false)
    const [content, setContent] = useState('')
    const [value, setValue] = useState('')

    const token = getToken()
    const history = useHistory()

    useEffect(() => {
        let isSubcribe = true
        if(comic.thumbnail !== undefined) {
            getDownloadURL(ref(storage, `comics/truyen${comic.number}/${comic.thumbnail}`))
            .then(url => {
                if(isSubcribe)
                    setImage(url)
                loadingComic(false)
            })
            .catch((error) => console.log(error))
        }
        if(user._id && comic._id) {
            fetchFollowStatus(user._id, comic._id, token)
            fetchLikeStatus(user._id, comic._id, token)
        }

        return () => {
            isSubcribe = false
            setImage('')
        }
    }, [comic, user])

    const handleFollow = () => {
        if(getToken()) {
            setLoadingFollow(true)
            followComic(user._id, comic._id, token).then(() =>{
                fetchFollowStatus(user._id, comic._id, token)
                fetchInteractions(comic._id)
                setLoadingFollow(false)
            })
        }
        else
            alert('Vui lòng đăng nhập để thực hiện tính năng này !')
    }

    const handleLike = () => {
        if(token) {
            setLoadingLike(true)
            likeComic(user._id, comic._id, token).then(res => {
                fetchLikeStatus(user._id, comic._id, token)
                fetchInteractions(comic._id)
                setLoadingLike(false)
            })
        }
        else
            alert('Vui lòng đăng nhập để thực hiện tính năng này !')
    }

    const handleEdit = (val1, val2) => {
        setContent(val1)
        setValue(val2)
        setShowBox(true)
    }

    return (
        <>
        {showBox && <EditComic comicID={comic._id} number={comic.number} setShowBox={setShowBox} content={content} valuePar={value}/>}
        <div className="detail-comic-container">
            <div className="detail-comic-image">
                { image ? <>
                    <img src={image} alt=""/>
                    {user.isAdmin && <MdModeEditOutline onClick={() => handleEdit('Ảnh', '$%^')} className="edit-thumnail-icon"/> }
                    </>: 
                    <div className="loading">
                        <img src={loading} alt="loading"/>
                    </div> 
                }
            </div>
            <div className="detail-comic-info">
                <span>{comic.title} {user.isAdmin && <MdModeEditOutline onClick={() => handleEdit('Tên truyện',comic.title)} className="edit-icon"/>}</span>
                <span>Tác giả: {comic.author} {user.isAdmin && <MdModeEditOutline onClick={() => handleEdit('Tác giả',comic.author)} className="edit-icon"/>}</span>
                <span>Tình trạng: {comic.status} {user.isAdmin && <MdModeEditOutline onClick={() => handleEdit('Trạng thái',comic.status)} className="edit-icon"/>}</span>
                <span>
                    Mô tả: {comic.description} {user.isAdmin && <MdModeEditOutline onClick={() => handleEdit('Mô tả',comic.description)} className="edit-icon"/>}
                </span>
                <div className="detail-comic-statistic">
                    <span>Thống kê:</span>
                    <span><AiFillLike/> {interactions.likes}</span>
                    <span><FaHeart/> {interactions.follows}</span>
                    <span><FaEye/> {comic.views}</span>
                </div>
                <div className="detail-comic-tag">
                    { comic.tags.map(tag => (
                        <div key={tag._id} className="detail-comic-tag-item" onClick={() => history.push(`/category?tag=${tag._id}&page=1`)}>
                            {tag.name}
                        </div>
                    )) }

                </div>
                <div className="detail-comic-actions">
                    { chapters.length > 0 && <button onClick={() => history.push(`/home/reading?comic=${comic._id}&chap=1`)}><GiOpenBook/>Đọc từ đầu</button> }
                    <input id="follow" type="checkbox" checked={followStatus} readOnly/>
                    <button id="follow-btn" onClick={handleFollow}>
                        { !loadingFollow ? <><FaHeart/> {followStatus? 'Hủy theo dõi' : 'Theo dõi'}</> :
                        <div className="spinner-border spinner-border-sm text-warning" role="status"/> }
                    </button >
                    <input id="like" type="checkbox" checked={likeStatus} readOnly/>
                    <button id="like-btn" onClick={handleLike}>
                        { !loadingLike ? <><AiFillLike/> {likeStatus? 'Bỏ thích' : 'Thích'}</> :
                        <div className="spinner-border spinner-border-sm text-warning" role="status"/>}
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        likeStatus: state.user.likeStatus,
        followStatus: state.user.followStatus,
        chapters: state.comic.chapters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        fetchLikeStatus : (userID, comicID, token) => {
            dispatch(actFetchLikeStatus(userID, comicID, token))
        },
        fetchFollowStatus : (userID, comicID, token) => {
            dispatch(actFetchFollowStatus(userID, comicID, token))
        },
        fetchInteractions : (comicID) => {
            dispatch(actFetchInteractions(comicID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DetailComic))
