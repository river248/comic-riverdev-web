import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useHistory } from 'react-router-dom'
import { fetchNewComics } from 'actions/ApiCall/chapterAPI'
import ImageNewComic from './ImageNewComic'

import './NewComic.scss'

function NewComic() {

    const [comics, setComics] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetchNewComics().then(data => {
            setComics(data)
        })
    }, [])

    console.log('new')
    
    return (
        <div className="new-comic-container">

            { comics.map(comic => (
            <div key={comic._id} className="new-comic-container-item">
                <ImageNewComic comicID={comic.comicID} number={comic.comicInfo.number} chap={comic.chap} title={comic.comicInfo.title}/>
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

export default NewComic
