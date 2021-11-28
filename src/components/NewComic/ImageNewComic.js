/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import loading from 'resources/loading.png'
import { storage } from 'firebase/index'
import { ref, getDownloadURL } from 'firebase/storage'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadingNewComic } from 'actions/loading'

function ImageNewComic(props) {

    const {
        comicID, number, chap, title, thumbnail,
        loadingNewComic
    } = props

    const [image, setImage] = useState('')
    const history = useHistory()
    
    useEffect(() => {
        let isSubcribe = true
        if(number)
            getDownloadURL(ref(storage, `comics/truyen${number}/${thumbnail}`))
            .then(url => {
                if (isSubcribe)
                    setImage(url)
                loadingNewComic(false)
            })
            .catch((error) => console.log(error))

        return () => {
            isSubcribe = false
            setImage('')
        }
    }, [comicID, chap])

    return (
        <div className="new-comic-image">
            { image ? <img src={image} alt={title} onClick={() => history.push(`home/reading?comic=${comicID}&chap=${chap}`)}/> : 
                <div className="loading">
                    <img src={loading} alt="loading"/>
                </div> 
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingNewComic : (status) => {
            dispatch(loadingNewComic(status))
        }
    }
}

export default connect(null, mapDispatchToProps)(React.memo(ImageNewComic))
