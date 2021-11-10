/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import ImagesComic from './ImagesComic'
import useQuery from 'utils/useQuery'

import './ReadingComic.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchFullChapter, actFetchQuantityChapter } from 'actions/comicAction'
import { loadingChapter } from 'actions/loading'
import { addHistory } from 'actions/ApiCall/userAPI'
import { getToken } from 'utils/common'
import { updateComics } from 'actions/ApiCall/comicAPI'

function ReadingComic() {

    const chapter = useSelector(state => state.comic.chapter)
    const comic = useSelector(state => state.comic.comic)
    const quantityChapter = useSelector(state => state.comic.quantityChapter)
    const user = useSelector(state => state.user.user)

    const history = useHistory()
    const dispatch = useDispatch()

    let query = useQuery()

    useEffect(() => {
        dispatch(loadingChapter(true))
        dispatch(actFetchFullChapter(query.get('comic'), query.get('chap')))
        dispatch(actFetchQuantityChapter(query.get('comic')))

        if(getToken() && user._id && comic._id) {
        
            const timer = setTimeout(() => {
                const data = {
                    userID: user._id,
                    comicID: query.get('comic'),
                    chap: query.get('chap')
                }
                addHistory(data, getToken()).then()

                updateComics(comic._id, {views: comic.views+1})
              }, 5000);

            return () => clearTimeout(timer);
        }

    }, [query.get('chap'), comic])

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

export default React.memo(ReadingComic)
