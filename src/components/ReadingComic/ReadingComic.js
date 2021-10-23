/* eslint-disable react-hooks/exhaustive-deps */
import { fetchFullChapter, fetchQuantityChapter } from 'actions/ApiCall/chapterAPI'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import ImagesComic from './ImagesComic'
import useQuery from 'utils/useQuery'

import './ReadingComic.scss'

function ReadingComic() {

    const [chapter, setChapter] = useState({_id: '', chap: 0, image: [], number: 0, title: ''})
    const [quantity, setQuatity] = useState(0)
    const history = useHistory()

    let query = useQuery()

    useEffect(() => {
        fetchFullChapter(query.get('comic'), query.get('chap')).then(data => {
            setChapter(data)
        })
        fetchQuantityChapter(query.get('comic')).then(data => {
            setQuatity(data)
        })
    }, [query.get('chap')])

    return (
        <>
        { chapter.chap !== 0 && <>
            <h1 className="reading-comic-title">{chapter.title}</h1>
            <div className="reading-header">
                <button onClick={() => history.push(`/home/detail-comic/${query.get('comic')}`)}>
                    <AiOutlineRollback/>
                    Quay lại
                </button>
                <span className="current-chapter">Chương {chapter.chap}</span>
            </div>

            <div className="reading-comic-img">
                {chapter.image.map((image, index) => (
                    <ImagesComic
                        key={index}
                        comicNumber={chapter.number}
                        chap={chapter.chap}
                        image={image}
                    />
                ))}
            </div>
            <div className="reading-comic-chap">
                { chapter.chap !==1 &&
                    <button onClick={() => history.push(`/home/reading?comic=${query.get('comic')}&chap=${chapter.chap-1}`)}>
                        Chương trước
                    </button> }

                <span className="current-chapter">Chương {chapter.chap}</span>

                { chapter.chap < quantity &&
                    <button onClick={() => history.push(`/home/reading?comic=${query.get('comic')}&chap=${chapter.chap+1}`)}>
                        Chương sau
                    </button> }
            </div>
        </>}
        
        </>
    )
}

export default ReadingComic
