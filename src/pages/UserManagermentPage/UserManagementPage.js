/* eslint-disable react-hooks/exhaustive-deps */
import { actFetchAllUsers, removeThisUser } from 'actions/adminAction'
import Footer from 'components/Footer/Footer'
import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getToken } from 'utils/common'
import { convertDate } from 'utils/convertDate'
import { ImBin } from 'react-icons/im'
import RemoveUserBox from 'components/Modal/RemoveUserBox'

import './UserManagement.scss'

function UserManagementPage({ users, removeUser, fetchAllUsers, removeUserFunc }) {

    const token = getToken()

    useEffect(() => {
        if (token)
            fetchAllUsers()
    }, [])

    const handleRemoveUser = (id, email, username) => {
        removeUserFunc({
            show: true,
            id: id,
            email: email,
            username: username
        })
    }

    return (
        <>
        <Container>
            <Row>
                <h1 className='user-manager-title'>Quản lý người dùng</h1>
            </Row>
            { (users.length > 0) ? users.map(user => (
                <div className='user-info-container' key={user._id}>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>Ngày tham gia: {convertDate(user.createAt)}</span>
                    <span onClick={() => handleRemoveUser(user._id, user.email, user.name)}><ImBin/></span>
                </div>
            )) :                 
            <div className='user-info-container'>
                Chưa có thành viên nào hết !
            </div>}
        </Container>
        { removeUser.show && <RemoveUserBox/>}
        <Footer/>
        </>
    )
}

const mapStateToProps = (state) =>{
    return {
        users: state.admin.users,
        removeUser: state.admin.removeUser
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
export default connect(mapStateToProps, mapDispatchToProps) (UserManagementPage)
