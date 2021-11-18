/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useHistory } from 'react-router-dom'
import ImageNewComic from './ImageNewComic'

import './NewComic.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchNewComics } from 'actions/comicAction'
import { loadingNewComic } from 'actions/loading'

function NewComic() {

    const comics = useSelector(state => state.comic.newComics)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadingNewComic(true))
        dispatch(actFetchNewComics())
    }, [])
    
    return (
        <div className="new-comic-container">

            { comics.map(comic => (
            <div key={comic._id} className="new-comic-container-item">
                <ImageNewComic
                    comicID={comic.comicID}
                    number={comic.comicInfo.number}
                    chap={comic.chap}
                    title={comic.comicInfo.title}
                    thumbnail={comic.comicInfo.thumbnail}
                />
                <div className="new-comic-info">
                    <div>
                        <span onClick={() => history.push(`home/detail-comic/${comic.comicID}`)}>{comic.comicInfo.title}</span>
                        <span>Tác giả: {comic.comicInfo.author}</span>
                        <span onClick={() => history.push(`home/reading?comic=${comic.comicID}&chap=${comic.chap}`)}>Chương {comic.chap}</span>
                    </div>
                    <span className="comic-time-post">
                        <ReactTimeAgo locale="en-US" date={comic.createAt}/>
                    </span>
                </div>
            </div>))}
            
        </div>
    )
}

export default React.memo(NewComic)
