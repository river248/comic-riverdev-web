/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { actFetchAllChapterOfComic } from 'actions/comicAction'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { convertDate } from 'utils/convertDate'
import { ImBin } from 'react-icons/im'

import './ListChapter.scss'
import { loadingChapter } from 'actions/loading'
import { getToken } from 'utils/common'
import { updateChapter } from 'actions/ApiCall/adminAPI'
import { actfetchNotifications } from 'actions/userAction'

function ListChapter(props) {

    const {
        comic,
        chapters, user,
        loadingChapter,
        fetchAllChaptersOfComic,
        fetchNotifications
    } = props

    const [loading, setLoading ] = useState(false)
    const token = getToken()

    const history = useHistory()

    useEffect(() => {
        fetchAllChaptersOfComic(comic._id)
        loadingChapter(false)
    }, [comic])
    
    const handleRemoveChapter = (id) => {
        setLoading(true)
        if(id && user._id && token) {
            updateChapter(id, {_destroy: true}, user.role, token).then(res => {
                fetchAllChaptersOfComic(comic._id)
                fetchNotifications(user._id, 1, token)
                setLoading(false)
            })
        }
    }

    return (
        <div className="list-chapter-container">
            { chapters.map(chapter => (
                <div key={chapter._id}>
                    <div  className="chapter-title">
                        <span onClick={() => history.push(`/home/reading?comic=${comic._id}&chap=${chapter.chap}`)}>Chương {chapter.chap}</span>
                        { user.isAdmin && <> {
                        !loading ? <span onClick={() => handleRemoveChapter(chapter._id)}><ImBin/></span> :
                        <div className="spinner-border spinner-border-sm text-warning" role="status"/>}</>}
                        <span>{convertDate(chapter.createAt)}</span>
                    </div>
                    <hr/>
                </div> ))}
            { chapters.length === 0 && <div>Truyện này chưa có chương!</div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        chapters: state.comic.chapters,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingChapter : (status) => {
            dispatch(loadingChapter(status))
        },
        fetchAllChaptersOfComic : (comicID) => {
            dispatch(actFetchAllChapterOfComic(comicID))
        },
        fetchNotifications : (userID, page, token) => {
            dispatch(actfetchNotifications(userID, page, token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChapter)
