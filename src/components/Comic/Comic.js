import React from 'react'
import thumbnail from 'resources/thumbnail.jpg'
import './Comic.scss'

function Comic() {
    return (
        <div className="comic-container">
            <div className="comic-image">
                <img src={thumbnail} alt=""/>
            </div>
            <div className="comic-info">
                <span>Phục Thiên Thánh Chủ</span>
                <span>Chapter 1</span>
            </div>
        </div>
    )
}

export default Comic
