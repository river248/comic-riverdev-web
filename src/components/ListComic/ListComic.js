import React, { useState, useEffect } from 'react'
import Comic from 'components/Comic/Comic'
import { fetchAllComic } from 'actions/ApiCall/comicAPI'

import './ListComic.scss'

function ListComic() {

    const [comics, setComics] = useState([])
    
    useEffect(() => {
        fetchAllComic(1).then(comics => {
            setComics(comics)
        })
    }, [])
    return (
        <div className="list-comic-container">
            { comics.map(comic => (
            <div key={comic._id} className="comic-item">
                <Comic comic={comic}/>
            </div>)) }
        </div>
    )
}

export default ListComic
