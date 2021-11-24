/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { actFetchAllChapterOfComic } from 'actions/comicAction'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { convertDate } from 'utils/convertDate'
import { ImBin } from 'react-icons/im'

import './ListChapter.scss'
import { loadingChapter } from 'actions/loading'
import { getToken } from 'utils/common'
import { updateChapter } from 'actions/ApiCall/adminAPI'

function ListChapter({ comic }) {

    const chapters = useSelector(state => state.comic.chapters)
    const user = useSelector(state => state.user.user)
    const [loading, setLoading ] = useState(false)
    const token = getToken()

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actFetchAllChapterOfComic(comic._id))
        dispatch(loadingChapter(false))
    }, [comic])
    
    const handleRemoveChapter = (id) => {
        setLoading(true)
        if(id && user._id && token) {
            updateChapter(id, {_destroy: true}, user.role, token).then(res => {
                dispatch(actFetchAllChapterOfComic(comic._id))
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
                        { user.isAdmin && (!loading ? <span onClick={() => handleRemoveChapter(chapter._id)}><ImBin/></span> :
                        <div className="spinner-border spinner-border-sm text-warning" role="status"/>)}
                        <span>{convertDate(chapter.createAt)}</span>
                    </div>
                    <hr/>
                </div> ))}
            { chapters.length === 0 && <div>Truyện này chưa có chương!</div>}
        </div>
    )
}

export default ListChapter
