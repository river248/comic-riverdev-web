/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { actComments, actFetchInteractions } from 'actions/comicAction'
import { useDispatch, useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdSend } from 'react-icons/md'

import './Comments.scss'
import { removeComment, updateComment } from 'actions/ApiCall/userAPI'
import { getToken } from 'utils/common'

function Comments({ comic }) {

    const [page, setPage] = useState(1)
    const [content, setContent] = useState('')
    const comments = useSelector(state => state.comic.comments)
    const user = useSelector(state => state.user.user)
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(comic._id) {
            dispatch(actComments(comic._id, page))
        }
    }, [comic._id, page])

    const handleLoadMore = () => {
        setPage(page+1)
    }

    const handleUpdateComment = (value) => {
        const data = {
            content: content
        }
        updateComment(value, data, getToken()).then(res => {
            dispatch(actComments(comic._id, page))
            dispatch(actFetchInteractions(comic._id))
            setShow(false)
        })
    }

    const handleRemoveComment = (value) => {
        removeComment(value, getToken()).then(res => {
            dispatch(actComments(comic._id, page))
            dispatch(actFetchInteractions(comic._id))
        })
    }

    const handleEditComment = (value) => {
        setShow(true)
        setContent(value)
    }

    return (
        <>
        { comments.map((comment, index) => (
        <div key={index} className="comments-container">
            <img src={comment.user.avatar} alt="avatar"/>
            { !show && <div className="comment-content">
                <div className="user-info">
                    <span>{comment.user.name} - </span>
                    <ReactTimeAgo locale="en-US" date={comment.createAt}/>
                </div>
                <span className="content">{comment.content}</span>
            </div>}
            { show && <>
                <textarea className="edit-content-comment" value={content} onChange={(e) => setContent(e.target.value)}/>
                <MdSend  onClick={() => handleUpdateComment(comment._id)}/>
            </>}
            { (user._id === comment?.userID) && <div className="user-action">
                <FiMoreHorizontal/>
                <div>
                    <span onClick={() => handleEditComment(comment.content)}>Chỉnh sửa</span>
                    <span onClick={() => handleRemoveComment(comment._id)}>Xóa</span>
                </div>
            </div>}
        </div>))}
        {/* <button onClick={handleLoadMore}>Xem thêm</button> */}
        </>
    )
}

export default React.memo(Comments)
