/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { actFetchAllChapterOfComic } from 'actions/comicAction'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { convertDate } from 'utils/convertDate'

import './ListChapter.scss'

function ListChapter({ comic }) {

    const chapters = useSelector(state => state.comic.chapters)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actFetchAllChapterOfComic(comic._id))
    }, [comic])
    
    return (
        <div className="list-chapter-container">
            { chapters.map(chapter => (
                <div key={chapter._id}>
                    <div  className="chapter-title">
                        <span onClick={() => history.push(`/home/reading?comic=${comic._id}&chap=${chapter.chap}`)}>Chương {chapter.chap}</span>
                        <span>{convertDate(chapter.createAt)}</span>
                    </div>
                    <hr/>
                </div> ))}
        </div>
    )
}

export default ListChapter
