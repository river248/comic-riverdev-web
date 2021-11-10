import { postComment } from 'actions/ApiCall/userAPI'
import { actComments, actFetchInteractions } from 'actions/comicAction'
import React, { useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from 'utils/common'

import './PostComment.scss'

function PostComment({ comic }) {
    
    const [content, setContent] = useState('')
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const handleComment = (value) => {
        setContent(value)
    }

    const handlePostComment = () => {
        if(getToken()) {
            if(content) {
                const data = {
                    comicID: comic._id,
                    userID: user._id,
                    content: content
                }
                postComment(data, getToken()).then(res => {
                    dispatch(actFetchInteractions(comic._id))
                    dispatch(actComments(comic._id, 1))
                })
            }                       
        } else alert('Vui lòng đăng nhập để bình luận !')
        setContent('')
           
    }

    return (
        <div className="post-comment-container">
            <textarea placeholder="Nội dung bình luận" value={content} onChange={(e) => handleComment(e.target.value)}></textarea>
            <RiSendPlaneFill onClick={handlePostComment}/>
        </div>
    )
}

export default React.memo(PostComment)
