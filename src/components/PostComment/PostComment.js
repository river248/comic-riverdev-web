import { postComment } from 'actions/ApiCall/userAPI'
import { actComments, actFetchInteractions } from 'actions/comicAction'
import React, { useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { connect } from 'react-redux'
import { getToken } from 'utils/common'

import './PostComment.scss'

function PostComment(props) {
    
    const {
        comic,
        user,
        getComments, fetchInteractions
    } = props

    const [content, setContent] = useState('')

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
                postComment(data, getToken()).then(() => {
                    fetchInteractions(comic._id)
                    getComments(comic._id, 1)
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

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComments : (comicID, page) => {
            dispatch(actComments(comicID, page))
        },
        fetchInteractions : (comicID) => {
            dispatch(actFetchInteractions(comicID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PostComment))
