import React from 'react'

import './ListChapter.scss'

function ListChapter() {
    return (
        <div className="list-chapter-container">
            <div className="chapter-title">
                <span>Chương 1</span>
                <span>15/10/2021</span>
            </div>
            <hr/>
            <div className="chapter-title">
                <span>Chương 2</span>
                <span>15/10/2021</span>
            </div>
            <hr/>
            <div className="chapter-title">
                <span>Chương 3</span>
                <span>15/10/2021</span>
            </div>
            <hr/>
        </div>
    )
}

export default ListChapter
