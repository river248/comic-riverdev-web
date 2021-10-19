/* eslint-disable react-hooks/exhaustive-deps */
import { fetchFullChapter } from 'actions/ApiCall'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImagesComic from './ImagesComic'

import './ReadingComic.scss'

function ReadingComic() {

    const [chapter, setChapter] = useState({_id: '', comicID: '', chap: 0, image: [], number: 0, title: ''})

    const { chap } = useParams()

    useEffect(() => {
        fetchFullChapter(chap).then(data => {
            setChapter(data)
        })
    }, [])

    return (
        <>
        <h1 className="reading-comic-title">{chapter.title}</h1>
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
            { chapter.chap !==1 && <button>Chương trước</button> }
            <span>Chương {chapter.chap}</span>
            <button>Chương sau</button>
        </div>
        </>
    )
}

export default ReadingComic
