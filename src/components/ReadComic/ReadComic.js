/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { loadingComic } from 'actions/loading'
import { storage } from 'firebase/index'
import { getDownloadURL, ref } from 'firebase/storage'
import { ImBin } from 'react-icons/im'
import loadingImg from 'resources/loading.png'

import './ReadComic.scss'
import { getToken } from 'utils/common'
import { removeReadComic } from 'actions/ApiCall/userAPI'
import { actFetchReadComics } from 'actions/userAction'
import useQuery from 'utils/useQuery'

function ReadComic(props) {

    const {
        comic,
        user,
        loadingComic, fetchReadComics
    } = props

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const token = getToken()

    const history = useHistory()
    const query = useQuery()

    useEffect(() => {
        let isSubcribe = true
        getDownloadURL(ref(storage, `comics/truyen${comic.number}/${comic.thumbnail}`))
        .then(url => {
            if (isSubcribe)
                setImage(url)
            loadingComic(false)
        })
        .catch((error) => console.log(error))

        return () => {
            isSubcribe = false
            setImage('')
        }
    }, [comic])

    const handleRemoveReadComic = (comicID, chap) => {
        setLoading(true)
        if(user._id && token) {
            removeReadComic(user._id, comicID, chap, token).then(() => {
                if(query.get('page'))
                    fetchReadComics(user._id, query.get('page'), token)
                else
                    fetchReadComics(user._id, 1, token)
                setLoading(false)
            })
        }
    }

    return (
        <div className="read-comic-container">
            <div className="read-comic-image">
                { image ? <>
                    <img src={image} alt={comic.comicID} onClick={() => history.push(`/home/reading?comic=${comic.comicID}&chap=${comic.chap}`)}/>
                    <div className="remove-read-comic" onClick={() => handleRemoveReadComic(comic.comicID, comic.chap)}>
                        { !loading ? <ImBin/> :
                        <div className="spinner-border text-warning" role="status"/> }
                    </div>
                    </>
                    : 
                    <div className="loading">
                        <img src={loadingImg} alt="loading"/>
                    </div> 
                }
            </div>
            <div className="read-comic-info">
                <span onClick={() => history.push(`/home/detail-comic/${comic.comicID}`)}>{comic.title}</span>
                <span onClick={() => history.push(`/home/reading?comic=${comic.comicID}&chap=${comic.chap}`)}>Chương {comic.chap}</span>
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
        fetchReadComics : (userID, page, token) => {
            dispatch(actFetchReadComics(userID, page, token))
        },
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadComic)
