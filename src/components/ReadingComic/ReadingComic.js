/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import ImagesComic from './ImagesComic'
import useQuery from 'utils/useQuery'

import './ReadingComic.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchFullChapter, actFetchQuantityChapter } from 'actions/comicAction'

function ReadingComic() {

    const chapter = useSelector(state => state.comic.chapter)
    const quantityChapter = useSelector(state => state.comic.quantityChapter)

    const history = useHistory()
    const dispatch = useDispatch()

    let query = useQuery()

    useEffect(() => {
        dispatch(actFetchFullChapter(query.get('comic'), query.get('chap')))
        dispatch(actFetchQuantityChapter(query.get('comic')))
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

                { chapter.chap < quantityChapter &&
                    <button onClick={() => history.push(`/home/reading?comic=${query.get('comic')}&chap=${chapter.chap+1}`)}>
                        Chương sau
                    </button> }
            </div>
        </>}
        
        </>
    )
}

export default ReadingComic
