import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getToken } from 'utils/common'
import { actFetchAllUsers, removeThisUser } from 'actions/adminAction'
import { removeUser } from 'actions/ApiCall/adminAPI'

import './RemoveUserBox.scss'

function RemoveUserBox({ removeUserInfo, fetchAllUsers, removeUserFunc }) {

    const [loading, setLoading] = useState(false)
    const containerRef = useRef(null)
    const boxRef = useRef(null)

    const token = getToken()

    const handleCancel = () => {
        boxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
        containerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
        setTimeout(() => {
            removeUserFunc({show: false, id: '', email: '', username: ''})
        }, 1500)
    }

    const handleAccept = () => {
        if(token) {
            setLoading(true)
            const data = {
                userID: removeUserInfo.id
            }
            removeUser(data, token).then(() => {
                fetchAllUsers(token)
                setLoading(false)
                removeUserFunc({show: false, id: '', email: '', username: ''})
            })
        }
    }

    return (
        <div ref={containerRef} className="remove-user-container">
            <div ref={boxRef} className="remove-user-box">
                <div className="remove-user-title">Thông báo</div>
                {(removeUserInfo.id && removeUserInfo.email && removeUserInfo.username) &&
                <div className="remove-user-box-content">
                    Bạn có chắc chắn muốn xóa <b>{removeUserInfo.username}</b> ?
                </div>}
                {!loading && <div className="remove-user-btn">
                    <button onClick={handleCancel}>Hủy</button>
                    <button onClick={handleAccept}>Xác nhận</button>
                </div>}
                {loading && <div className="remove-user-btn">
                    <div className="spinner-border text-warning" role="status"/>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        removeUserInfo: state.admin.removeUser
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchAllUsers : (token) => {
            dispatch(actFetchAllUsers(token))
        },
        removeUserFunc : (data) => {
            dispatch(removeThisUser(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveUserBox)
