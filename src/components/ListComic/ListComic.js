import React from 'react'
import Comic from 'components/Comic/Comic'

import './ListComic.scss'

function ListComic() {
    return (
        <div className="list-comic-container">
            <div className="comic-item">
                <Comic/>
            </div>
            <div className="comic-item">
                <Comic/>
            </div>
            <div className="comic-item">
                <Comic/>
            </div>
            <div className="comic-item">
                <Comic/>
            </div>
            <div className="comic-item">
                <Comic/>
            </div>
            <div className="comic-item">
                <Comic/>
            </div>
        </div>
    )
}

export default ListComic
