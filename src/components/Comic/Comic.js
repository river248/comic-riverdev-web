/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { storage } from "firebase/index"
import loadingImage from 'resources/loading.png'
import { useHistory } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'
import { ImBin } from 'react-icons/im'

import './Comic.scss'
import { connect } from 'react-redux'
import { loadingComic } from 'actions/loading'
import { actConfirm, } from 'actions/userAction'
import { useLocation } from 'react-router-dom'

function Comic(props) {

    const {
        comic, user,
        loadingComic,
        actConfirm
    } = props

    const [image, setImage] = useState('')

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        let isSubcribe = true
        getDownloadURL(ref(storage, `comics/truyen${comic.number}/${comic.thumbnail}`))
        .then(url => {
            if(isSubcribe)
                setImage(url)
            loadingComic(false)
        })
        .catch((error) => console.log(error))

        return () => {
            setImage('')
            isSubcribe = false
        }
    }, [comic])

    const handleRemoveThisComic = () => {
        actConfirm({
            show: true,
            comicID: comic._id,
            chap: 0,
            title: comic.title,
            chapterID: ''
        })
        
    }

    return (
        <div className="comic-container">
            <div className="comic-image">
                { image ? <img src={image} alt={comic.title} onClick={() => history.push(`/home/detail-comic/${comic._id}`)}/>: 
                    <div className="loading">
                        <img src={loadingImage} alt="loading"/>
                    </div> 
                }
                { (location.pathname !== '/history/liked' && location.pathname !== '/history/followed') && image && <ReactTimeAgo locale="en-US" date={comic.createAt}/>}
                { (image && user?.isAdmin) &&
                 <div className="remove-comic" onClick={handleRemoveThisComic}><ImBin/></div>}
            </div>
            <div className="comic-info">
                <span onClick={() => history.push(`/home/detail-comic/${comic._id}`)}>{comic.title}</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        actConfirm : (data) => {
            dispatch(actConfirm(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Comic))
