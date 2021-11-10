import React, { useEffect, useState } from 'react'
import { fetchFullUser, fetchLogout } from 'actions/ApiCall/userAPI'
import jwtDecode from 'jwt-decode'
import { getToken, removeUserSession } from 'utils/common'
import { useHistory } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

import './UserPage.scss'

function UserPage() {

    const [userInfo, setUserInfo] = useState({name: ''})
    const history = useHistory()

    useEffect(() => {
        const token = getToken()
        const userData = jwtDecode(token)
        fetchFullUser(userData.data._id, token).then(user =>
            setUserInfo(user)
        )
    }, [])

    const hanldeLogout = () => {
        fetchLogout().then(response => {
            history.replace('/')
            removeUserSession()
            window.location.reload()
            alert(response.message)
        })
    }
    return (
        <Container>
            <Row>
                <h1 className="user-page-title">Thông Tin Người Dùng</h1>
            </Row>
            <Row>
                <div className="user-page-user-info">
                    <span>Tên người dùng: </span>
                    <span>Tên người dùng: </span>
                </div>
            </Row>
            <Row>
                <div className="user-page-user-info">
                    <span>Email: </span>
                    <span>Tên người dùng: </span>
                </div>
            </Row>
            <Row>
                <div className="user-page-user-info">
                    <span>Tên người dùng: </span>
                    <span>Tên người dùng: </span>
                </div>
            </Row>
        </Container>
    )
}

export default UserPage
