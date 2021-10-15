import React, { useState } from 'react'
import Comic from 'components/Comic/Comic'

import './ListComic.scss'

function ListComic() {

    const [comics, setComics] = useState([1, 2, 3, 4, 5, 6])
    
    return (
        <div className="list-comic-container">
            { comics.map(comic => (
            <div key={comic} className="comic-item">
                <Comic/>
            </div>)) }
        </div>
    )
}

export default ListComic
