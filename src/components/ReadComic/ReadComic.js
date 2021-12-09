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
import { actConfirm } from 'actions/userAction'

function ReadComic(props) {

    const {
        comic,
        loadingComic, actConfirm
    } = props

    const [image, setImage] = useState('')

    const history = useHistory()

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

    const handleRemoveReadComic = () => {
        actConfirm({
            show: true,
            comicID: comic.comicID,
            chap: comic.chap,
            chapterID: '',
            title: comic.title
        })
    }

    return (
        <div className="read-comic-container">
            <div className="read-comic-image">
                { image ? <>
                    <img src={image} alt={comic.comicID} onClick={() => history.push(`/home/reading?comic=${comic.comicID}&chap=${comic.chap}`)}/>
                    <div className="remove-read-comic" onClick={handleRemoveReadComic}>
                        <ImBin/>
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
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        actConfirm : (data) => {
            dispatch(actConfirm(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadComic)
