/* eslint-disable react-hooks/exhaustive-deps */
import { updateComic } from 'actions/ApiCall/adminAPI'
import { actFetchAllTag, actFetchDetailComic } from 'actions/comicAction'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getToken } from 'utils/common'

import './Modal.scss'

function Modal(props) {

    const {
        comicID, setShow,
        user, categories,
        fetchAllTags, fetchDetailComic
    } = props

    const [tags, setTags] = useState([])
    const token = getToken()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAllTags()

        return () => fetchDetailComic(comicID)
    }, [])

    const handleChecked = (id) => {
        setTags(prev => {
            const isChecked = tags.includes(id)
            if(isChecked) {
                return tags.filter(tag => tag !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    const handleEdit = () => {
        if(tags.length > 0 && user._id && token) {
            setLoading(true)
            const data = { tagID: tags }
            updateComic(comicID, data, token).then(res => {
                setShow(false)
                setLoading(false)
            })
        }

    }

    return (
        <div className="modal-container">
            <div className="modal-box">
            <h1>Thể loại</h1>
                <div className="list-tags-container">
                    { categories.map(category => 
                    <div key={category._id} className="list-tags">
                        <input type="checkbox" name={category._id} checked={tags.includes(category._id)} value={category._id} onChange={() => handleChecked(category._id)}/>
                        <label htmlFor={category._id}>{category.name}</label>
                    </div>)}
                </div>
                { !loading ? <div className="button-container">
                    <button onClick={handleEdit}>Sửa</button>
                    <button onClick={() => setShow(false)}>Hủy</button>
                </div> :
                <span>Đang cập nhật...</span>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        categories: state.comic.tags
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchAllTags : () => {
            dispatch(actFetchAllTag())
        },
        fetchDetailComic : (comicID) => {
            dispatch(actFetchDetailComic(comicID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Modal))
