/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { actFetchAllChapterOfComic } from 'actions/comicAction'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { convertDate } from 'utils/convertDate'
import { ImBin } from 'react-icons/im'

import './ListChapter.scss'
import { loadingChapter } from 'actions/loading'
import { actConfirm } from 'actions/userAction'

function ListChapter(props) {

    const {
        comic,
        chapters, user,
        loadingChapter,
        fetchAllChaptersOfComic,
        actConfirm
    } = props

    const history = useHistory()

    useEffect(() => {
        fetchAllChaptersOfComic(comic._id)
        loadingChapter(false)
    }, [comic])
    
    const handleRemoveChapter = (id, chap) => {
        actConfirm({
            show: true,
            comicID: comic._id,
            chap: chap,
            chapterID: id,
            title: ''
        })
    }

    return (
        <div className="list-chapter-container">
            { chapters.map(chapter => (
                <div key={chapter._id}>
                    <div  className="chapter-title">
                        <span onClick={() => history.push(`/home/reading?comic=${comic._id}&chap=${chapter.chap}`)}>Chương {chapter.chap}</span>
                        { user.isAdmin &&
                        <span onClick={() => handleRemoveChapter(chapter._id, chapter.chap)}><ImBin/></span>}
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
        actConfirm : (data) => {
            dispatch(actConfirm(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChapter)
