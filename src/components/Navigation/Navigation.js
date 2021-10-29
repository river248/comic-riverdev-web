/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { MdEmail, MdCategory } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { RiHistoryFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import './Navigation.scss'
import { getToken } from 'utils/common'
import { login } from 'actions/login'
import { fetchFullUser } from 'actions/ApiCall/userAPI'
import jwtDecode from 'jwt-decode'

function Navigation() {

    const location = useLocation()
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState(null)
    const token = getToken()
    
    const handleShowLogin = () => {
        const action = login(true)
        dispatch(action)
    }

    useEffect(() => {

        if(token !== null) {
            const userData = jwtDecode(token)
            fetchFullUser(userData.data._id, token).then(userInfo => {
                setAvatar(userInfo.avatar)
            })
        }
    }, [token])

    return (
        <div className="navigation-container">
            <div className="navigation-left-container">
                { location.pathname === '/' ? <NavLink exact to="/" activeClassName="navbar-active" className="navbar-item">
                        <AiFillHome/>
                        <span>Trang chủ</span>
                </NavLink>
                :
                <NavLink strict to="/home" activeClassName="navbar-active" className="navbar-item">
                        <AiFillHome/>
                        <span>Trang chủ</span>
                </NavLink>}
                <NavLink to="/category" activeClassName="navbar-active" className="navbar-item">
                        <MdCategory/>
                        <span>Thể loại</span>
                </NavLink>
                <NavLink to="/contact" activeClassName="navbar-active" className="navbar-item">
                        <MdEmail/>
                        <span>Liên hệ</span>
                </NavLink>
            </div>
            <div className="navigation-right-container">
                {getToken() && <NavLink to='/history' activeClassName="navbar-active" className="navbar-item">
                    <RiHistoryFill/>
                    <span>Lịch sử</span>
                </NavLink>}
                {!getToken() && <Link to='/login' className="navbar-item" onClick={handleShowLogin}>
                        <FaUserCircle/>
                        <span>Tài khoản</span>
                </Link>}
                {getToken() && <Link to="/user" className="navbar-item">
                        <img src={avatar} alt='avatar'/>
                </Link>}
            </div>
        </div>
    )
}

export default Navigation
