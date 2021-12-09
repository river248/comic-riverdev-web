import React, { useRef, useState } from 'react'
import { actConfirm, actfetchNotifications, actFetchReadComics } from 'actions/userAction'
import { connect } from 'react-redux'
import useQuery from 'utils/useQuery'
import { useLocation } from 'react-router-dom'
import { getToken } from 'utils/common'
import { actFetchAllChapterOfComic, actFetchAllComic, actFetchAllComicOfTag, actFetchNewComics } from 'actions/comicAction'
import { softRemoveComic, updateChapter } from 'actions/ApiCall/adminAPI'

import './ConfirmBox.scss'
import { removeAllReadComic, removeReadComic } from 'actions/ApiCall/userAPI'

function ConfirmBox(props) {

    const {
        user, confirmStatus,
        fetchNewComics,
        fetchAllComics,
        fetchAllComicsOfTag,
        fetchNotifications,
        fetchAllChaptersOfComic,
        fetchReadComics,
        actConfirm
    } = props

    const [loading, setLoading] = useState(false)
    const containerRef = useRef(null)
    const boxRef = useRef(null)

    let query = useQuery()

    const location = useLocation()
    const token = getToken()

    const handleCancel = () => {
        boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
        containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
        setTimeout(() => {
            actConfirm({show: false, comicID: '', chap: 0, chapterID: '', title: ''})
        }, 1500)
    }

    const handleAccept = () => {
        if(user._id && token) {
            setLoading(true)
            if (confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID) {
                const data = { _destroy: true }
                softRemoveComic(confirmStatus.content._id, data, user.isAdmin, token).then(res => {
                    setLoading(false)
                    fetchNotifications(user._id, 1, token)
                    switch (location.pathname) {
                        case '/':
                            fetchNewComics()
                            if(query.get('page') !== null)
                                fetchAllComics(query.get('page'))
                            else
                                fetchAllComics(1)
                            break
                        case '/home':
                            fetchNewComics()
                            if(query.get('page') !== null)
                                fetchAllComics(query.get('page'))
                            else
                                fetchAllComics(1)
                            break
                        case '/category':
                            if(query.get('page') !== null)
                                fetchAllComicsOfTag(query.get('tag'), query.get('page'))
                            else
                                fetchAllComicsOfTag('616af71268f59ad44354b30f', 1)
                            break
                        default:
                            break
                    }
                    boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                    containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                    setTimeout(() => {
                        actConfirm({show: false, comicID: '', chap: 0, chapterID: '', title: ''})
                    }, 1500)
                })
            }

            if (confirmStatus.comicID && confirmStatus.chap > 0 && confirmStatus.chapterID) {
                updateChapter(confirmStatus.chapterID, {_destroy: true}, user.role, token).then(res => {
                    fetchAllChaptersOfComic(confirmStatus.comicID)
                    fetchNotifications(user._id, 1, token)
                    setLoading(false)
                    boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                    containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                    setTimeout(() => {
                        actConfirm({show: false, comicID: '', chap: 0, chapterID: '', title: ''})
                    }, 1500)
                })
            }

            if (confirmStatus.comicID && confirmStatus.chap > 0 && !confirmStatus.chapterID) {
                removeReadComic(user._id, confirmStatus.comicID, confirmStatus.chap, token).then(res => {
                    if(query.get('page'))
                        fetchReadComics(user._id, query.get('page'), token)
                    else
                        fetchReadComics(user._id, 1, token)
                    setLoading(false)
                    boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                    containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                    setTimeout(() => {
                        actConfirm({show: false, comicID: '', chap: 0, chapterID: '', title: ''})
                    }, 1500)
                })
            }

            if (!confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID)
                removeAllReadComic(user._id, token).then(() => {
                    fetchReadComics(user._id, 1, token)
                    setLoading(false)
                    boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                    containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                    setTimeout(() => {
                        actConfirm({show: false, comicID: '', chap: 0, chapterID: '', title: ''})
                    }, 1500)
                })
        }
    }

    return (
        <div ref={containerRef} className="confirm-container">
            <div ref={boxRef} className="confirm-box">
                <div className="confirm-title">Thông báo</div>
                {(confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    Bạn có chắc chắn muốn xóa <b>{confirmStatus.title}</b> ?
                </div>}
                {(confirmStatus.comicID && confirmStatus.chap > 0 && !confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    Bạn có chắc chắn muốn xóa <b>{confirmStatus.title} chương {confirmStatus.chap}</b> khỏi lịch sử xem ?
                </div>}
                {(confirmStatus.comicID && confirmStatus.chap > 0 && confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    Bạn có chắc chắn muốn xóa <b>chương {confirmStatus.chap}</b> ?
                </div>}
                {(!confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    Bạn có chắc chắn muốn xóa toàn bộ lịch sử truyện đã xem ?
                </div>}
                {!loading && <div className="confirm-btn">
                    <button onClick={handleCancel}>Hủy</button>
                    <button onClick={handleAccept}>Xác nhận</button>
                </div>}
                {loading && <div className="confirm-btn">
                    <div className="spinner-border text-warning" role="status"/>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        confirmStatus: state.user.confirmStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNewComics : () => {
            dispatch(actFetchNewComics())
        },
        fetchAllComics : (page) => {
            dispatch(actFetchAllComic(page))
        },
        fetchAllComicsOfTag : (tag, page) => {
            dispatch(actFetchAllComicOfTag(tag, page))
        },
        fetchNotifications : (userID, page, token) => {
            dispatch(actfetchNotifications(userID, page, token))
        },
        actConfirm : (data) => {
            dispatch(actConfirm(data))
        },
        fetchAllChaptersOfComic : (comicID) => {
            dispatch(actFetchAllChapterOfComic(comicID))
        },
        fetchReadComics : (userID, page, token) => {
            dispatch(actFetchReadComics(userID, page, token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBox)
