/* eslint-disable react-hooks/exhaustive-deps */
import { actfetchNotifications, showNotification } from 'actions/userAction'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ImageNotification from './ImageNotification'
import parse from 'html-react-parser'
import './Notification.scss'
import { useHistory } from 'react-router-dom'

function Notification(props) {

    const {
        userID, token, notifications, quantityPage,
        fetchNotifications, toggleNotification
    } = props

    const [page, setPage] = useState(1)
    const history = useHistory()

    useEffect(() => {
        if (userID && token)
            fetchNotifications(page, token)
    }, [quantityPage, page])

    const handleThisNotification = (comicID, chap) => {
        toggleNotification(false)
        history.push(`/home/reading?comic=${comicID}&chap=${chap}`)
    }
    return (
        <div className="notification-container">
            { (notifications.length > 0) ? notifications.map(notification => (
            <div className="notification-item" key={notification._id} onClick={() => handleThisNotification(notification.comicID, notification.chap)}>
                <div className="notification-image">
                    <ImageNotification number={notification.number} thumbnail={notification.thumbnail}/>
                </div>
                <div className="notification-content">
                    <span>{parse(notification.content)}</span>
                    {/* <span>{notification.createAt}</span> */}
                </div>
            </div>)) : <div className="no-content">Không có thông báo</div>}
            { (quantityPage > page) && <button onClick={() => setPage(page+1)}>Xem tiếp</button> }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notifications: state.user.notifications,
        quantityPage: state.user.quantityPageNotification
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotifications : (page, token) => {
            dispatch(actfetchNotifications(page, token))
        },
        toggleNotification : (status) => {
            dispatch(showNotification(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Notification))
