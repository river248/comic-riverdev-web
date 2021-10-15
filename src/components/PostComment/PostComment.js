import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'

import './PostComment.scss'

function PostComment() {
    return (
        <div className="post-comment-container">
            <textarea placeholder="Nội dung bình luận"></textarea>
            <RiSendPlaneFill/>
        </div>
    )
}

export default PostComment
