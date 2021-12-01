/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { storage } from "firebase/index"
import loadingImage from 'resources/loading.png'
import { useHistory, useLocation } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'
import { ImBin } from 'react-icons/im'

import './Comic.scss'
import { connect } from 'react-redux'
import { loadingComic, loadingNewComic } from 'actions/loading'
import { getToken } from 'utils/common'
import { softRemoveComic } from 'actions/ApiCall/adminAPI'
import useQuery from 'utils/useQuery'
import { actFetchAllComic, actFetchAllComicOfTag, actFetchNewComics } from 'actions/comicAction'
import { actfetchNotifications } from 'actions/userAction'

function Comic(props) {

    const {
        comic, user,
        loadingComic,
        loadingNewComic,
        fetchNewComics,
        fetchAllComics,
        fetchAllComicsOfTag,
        fetchNotifications
    } = props

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    let query = useQuery()

    const history = useHistory()
    const location = useLocation()
    const token = getToken()

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
        if(user._id && token) {
            setLoading(true)
            const data = { _destroy: true }
            softRemoveComic(comic._id, data, user.isAdmin, token).then(res => {
                setLoading(false)
                fetchNotifications(user._id, 1, token)
                switch (location.pathname) {
                    case '/':
                        loadingNewComic(true)
                        fetchNewComics()
                        if(query.get('page') !== null) {
                            loadingComic(true)
                            fetchAllComics(query.get('page'))
                        }
                        else {
                            loadingComic(true)
                            fetchAllComics(1)
                        }
                        break
                    case '/home':
                        loadingNewComic(true)
                        fetchNewComics()
                        if(query.get('page') !== null) {
                            loadingComic(true)
                            fetchAllComics(query.get('page'))
                        }
                        else {
                            loadingComic(true)
                            fetchAllComics(1)
                        }
                        break
                    case '/category':
                        if(query.get('page') !== null) {
                            loadingComic(true)
                            fetchAllComicsOfTag(query.get('tag'), query.get('page'))
                        }
                        else {
                            loadingComic(true)
                            fetchAllComicsOfTag('616af71268f59ad44354b30f', 1)
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
        loadingNewComic : (status) => {
            dispatch(loadingNewComic(status))
        },
        fetchNewComics : (comics) => {
            dispatch(actFetchNewComics())
        },
        fetchAllComics : (page) => {
            dispatch(actFetchAllComic(page))
        },
        fetchAllComicsOfTag : (tag, page) => {
            dispatch(actFetchAllComicOfTag(tag, page))
        },
        fetchNotifications : (userID, page, token) => {
            dispatch(actfetchNotifications(userID, page, token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Comic))
