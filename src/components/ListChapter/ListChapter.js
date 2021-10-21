/* eslint-disable react-hooks/exhaustive-deps */
import { fetchAllChapterOfComic } from 'actions/ApiCall/chapterAPI'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { convertDate } from 'utils/convertDate'

import './ListChapter.scss'

function ListChapter({ comic }) {

    const [chapters, setChapters] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        fetchAllChapterOfComic(comic._id).then(chapters => {
            setChapters(chapters)
        })
    }, [comic])
    
    return (
        <div className="list-chapter-container">
            { chapters.map(chapter => (
                <div key={chapter._id}>
                    <div  className="chapter-title">
                        <span onClick={() => history.push(`/reading?comic=${comic._id}&chap=${chapter.chap}`)}>Chương {chapter.chap}</span>
                        <span>{convertDate(chapter.createAt)}</span>
                    </div>
                    <hr/>
                </div> ))}
        </div>
    )
}

export default ListChapter
