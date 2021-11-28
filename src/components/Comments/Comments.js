/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { actComments, actFetchInteractions } from 'actions/comicAction'
import { connect } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdSend } from 'react-icons/md'

import './Comments.scss'
import { removeComment, updateComment } from 'actions/ApiCall/userAPI'
import { getToken } from 'utils/common'

function Comments(props) {

    const {
        comic,
        user, comments,
        getComments, fetchInteractions
    } = props

    const [page, setPage] = useState(1)
    const [content, setContent] = useState('')
    
    const [show, setShow] = useState(false)

    useEffect(() => {
        if(comic._id) {
            getComments(comic._id, page)
        }
    }, [comic._id, page])

    const handleLoadMore = () => {
        setPage(page+1)
    }

    const handleUpdateComment = (value) => {
        const data = {
            content: content
        }
        updateComment(value, data, getToken()).then(() => {
            getComments(comic._id, page)
            fetchInteractions(comic._id)
            setShow(false)
        })
    }

    const handleRemoveComment = (value) => {
        removeComment(value, getToken()).then(() => {
            getComments(comic._id, page)
            fetchInteractions(comic._id)
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

const mapStateToProps = (state) => {
    return {
        comments: state.comic.comments,
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Comments))
