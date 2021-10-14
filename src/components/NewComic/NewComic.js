import React from 'react'
import thumbnail from 'resources/thumbnail.jpg'
import './NewComic.scss'

function NewComic() {
    return (
        <div className="new-comic-container">

            <div className="new-comic-container-title">MỚI CẬP NHẬT</div>

            <div className="new-comic-container-item">
                <div className="new-comic-image">
                    <img src={thumbnail} alt=""/>
                </div>
                <div className="new-comic-info">
                    <div>
                        <span>Phục Thiên Thánh Chủ 123123123</span>
                        <span>Tác giả: đang cập nhập</span>
                        <span>Chapter 1</span>
                    </div>
                    <span className="comic-time-post">1 giờ trước</span>
                </div>
            </div>

            <div className="new-comic-container-item">
                <div className="new-comic-image">
                    <img src={thumbnail} alt=""/>
                </div>
                <div className="new-comic-info">
                    <div>
                        <span>Phục Thiên Thánh Chủ 123123123</span>
                        <span>Tác giả: đang cập nhập</span>
                        <span>Chapter 1</span>
                    </div>
                    <span className="comic-time-post">1 giờ trước</span>
                </div>
            </div>
            
        </div>
    )
}

export default NewComic
