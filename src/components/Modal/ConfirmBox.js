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
        confirmStatus,
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
        if(token) {
            setLoading(true)
            if (confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID) {
                const data = { _destroy: true }
                softRemoveComic(confirmStatus.comicID, data, token).then(res => {
                    setLoading(false)
                    fetchNotifications(1, token)
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
                updateChapter(confirmStatus.chapterID, {_destroy: true}, token).then(res => {
                    fetchAllChaptersOfComic(confirmStatus.comicID)
                    fetchNotifications(1, token)
                    setLoading(false)
                    boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                    containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                    setTimeout(() => {
                        actConfirm({show: false, comicID: '', chap: 0, chapterID: '', title: ''})
                    }, 1500)
                })
            }

            if (confirmStatus.comicID && confirmStatus.chap > 0 && !confirmStatus.chapterID) {
                removeReadComic(confirmStatus.comicID, confirmStatus.chap, token).then(res => {
                    if(query.get('page'))
                        fetchReadComics(query.get('page'), token)
                    else
                        fetchReadComics(1, token)
                    setLoading(false)
                    boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                    containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                    setTimeout(() => {
                        actConfirm({show: false, comicID: '', chap: 0, chapterID: '', title: ''})
                    }, 1500)
                })
            }

            if (!confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID)
                removeAllReadComic(token).then(() => {
                    fetchReadComics(1, token)
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
                <div className="confirm-title">Th??ng b??o</div>
                {(confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    B???n c?? ch???c ch???n mu???n x??a <b>{confirmStatus.title}</b> ?
                </div>}
                {(confirmStatus.comicID && confirmStatus.chap > 0 && !confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    B???n c?? ch???c ch???n mu???n x??a <b>{confirmStatus.title} ch????ng {confirmStatus.chap}</b> kh???i l???ch s??? xem ?
                </div>}
                {(confirmStatus.comicID && confirmStatus.chap > 0 && confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    B???n c?? ch???c ch???n mu???n x??a <b>ch????ng {confirmStatus.chap}</b> ?
                </div>}
                {(!confirmStatus.comicID && confirmStatus.chap === 0 && !confirmStatus.chapterID) &&
                <div className="confirm-box-content">
                    B???n c?? ch???c ch???n mu???n x??a to??n b??? l???ch s??? truy???n ???? xem ?
                </div>}
                {!loading && <div className="confirm-btn">
                    <button onClick={handleCancel}>H???y</button>
                    <button onClick={handleAccept}>X??c nh???n</button>
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
        fetchNotifications : (page, token) => {
            dispatch(actfetchNotifications(page, token))
        },
        actConfirm : (data) => {
            dispatch(actConfirm(data))
        },
        fetchAllChaptersOfComic : (comicID) => {
            dispatch(actFetchAllChapterOfComic(comicID))
        },
        fetchReadComics : (page, token) => {
            dispatch(actFetchReadComics(page, token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBox)
