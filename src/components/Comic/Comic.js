/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { storage } from "firebase/index"
import loadingImage from 'resources/loading.png'
import { useHistory } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'
import { ImBin } from 'react-icons/im'

import './Comic.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loadingComic } from 'actions/loading'
import { getToken } from 'utils/common'
import { updateAndSoftRemoveComic } from 'actions/ApiCall/adminAPI'

function Comic({ comic }) {

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user.user)
    const token = getToken()

    useEffect(() => {
        getDownloadURL(ref(storage, `comics/truyen${comic.number}/${comic.thumbnail}`))
        .then(url => {
            setImage(url)
            dispatch(loadingComic(false))
        })
        .catch((error) => console.log(error))

        return () => setImage('')
    }, [comic])

    const handleRemoveThisComic = () => {
        if(user._id && token) {
            setLoading(true)
            const data = { _destroy: true }
            updateAndSoftRemoveComic(comic._id, data, user.isAdmin, token).then(res => {
                setLoading(false)
            })
        }
    }

    return (
        <div className="comic-container">
            <div className="comic-image">
                { image ? <img src={image} alt={comic.title} onClick={() => history.push(`/home/detail-comic/${comic._id}`)}/>: 
                    <div className="loading">
                        <img src={loadingImage} alt="loading"/>
                    </div> 
                }
                { image && <ReactTimeAgo locale="en-US" date={comic.createAt}/>}
                { (image && user?.isAdmin) && <>
                 { !loading ? <div className="remove-comic" onClick={handleRemoveThisComic}><ImBin/></div> :
                    <div className="remove-comic">
                        <div className="spinner-border text-warning" role="status"/>
                    </div> }
                </>}
                     {/* { !loading ? <ImBin/> : */}
                     {/* <div className="spinner-border text-warning" role="status"/> } */}
                 {/* </div> } */}
            </div>
            <div className="comic-info">
                <span onClick={() => history.push(`/home/detail-comic/${comic._id}`)}>{comic.title}</span>
            </div>
        </div>
    )
}

export default React.memo(Comic)
