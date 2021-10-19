/* eslint-disable react-hooks/exhaustive-deps */
import { fetchAllChapterOfComic } from 'actions/ApiCall'
import React, { useState, useEffect } from 'react'
import { convertDate } from 'utils/convertDate'

import './ListChapter.scss'

function ListChapter({ comic }) {

    const [chapters, setChapters] = useState([])

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
                        <span>Chương {chapter.chap}</span>
                        <span>{convertDate(chapter.createAt)}</span>
                    </div>
                    <hr/>
                </div> ))}
        </div>
    )
}

export default ListChapter
