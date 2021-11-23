/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { storage } from "firebase/index"
import loadingImage from 'resources/loading.png'
import { useHistory, useLocation } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'
import { ImBin } from 'react-icons/im'

import './Comic.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loadingComic, loadingNewComic } from 'actions/loading'
import { getToken } from 'utils/common'
import { softRemoveComic } from 'actions/ApiCall/adminAPI'
import useQuery from 'utils/useQuery'
import { actFetchAllComic, actFetchAllComicOfTag, actFetchNewComics } from 'actions/comicAction'

function Comic({ comic }) {

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    let query = useQuery()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
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
            softRemoveComic(comic._id, data, user.isAdmin, token).then(res => {
                setLoading(false)
                switch (location.pathname) {
                    case '/':
                        dispatch(loadingNewComic(true))
                        dispatch(actFetchNewComics())
                        if(query.get('page') !== null) {
                            dispatch(loadingComic(true))
                            dispatch(actFetchAllComic(query.get('page')))
                        }
                        else {
                            dispatch(loadingComic(true))
                            dispatch(actFetchAllComic(1))
                        }
                        break
                    case '/home':
                        dispatch(loadingNewComic(true))
                        dispatch(actFetchNewComics())
                        if(query.get('page') !== null) {
                            dispatch(loadingComic(true))
                            dispatch(actFetchAllComic(query.get('page')))
                        }
                        else {
                            dispatch(loadingComic(true))
                            dispatch(actFetchAllComic(1))
                        }
                        break
                    case '/category':
                        if(query.get('page') !== null) {
                            dispatch(loadingComic(true))
                            dispatch(actFetchAllComicOfTag(query.get('tag'), query.get('page')))
                        }
                        else {
                            dispatch(loadingComic(true))
                            dispatch(actFetchAllComicOfTag('616af71268f59ad44354b30f', 1))
                        }
                        break
                    default:
                        break
                }
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
