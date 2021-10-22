import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useHistory } from 'react-router-dom'
import { fetchNewComics } from 'actions/ApiCall/comicAPI'
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


    return (
        <div className="new-comic-container">

            { comics.map(comic => (
            <div key={comic._id} className="new-comic-container-item">
                <ImageNewComic comicID={comic._id} number={comic.number} chap={comic.chapter[0].chap} title={comic.title}/>
                <div className="new-comic-info">
                    <div>
                        <span onClick={() => history.push(`home/detail-comic/${comic._id}`)}>{comic.title}</span>
                        <span>Tác giả: {comic.author}</span>
                        <span onClick={() => history.push(`home/reading?comic=${comic._id}&chap=${comic.chapter[0].chap}`)}>Chương {comic.chapter[0].chap}</span>
                    </div>
                    <span className="comic-time-post">
                        <ReactTimeAgo locale="en-US" date={comic.updateAt}/>
                    </span>
                </div>
            </div>))}
            
        </div>
    )
}

export default NewComic
