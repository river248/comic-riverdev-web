/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { MdEmail, MdCategory } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import './Navigation.scss'
import { getToken, removeUserSession } from 'utils/common'
import jwtDecode from 'jwt-decode'
import { actFetchFullUser } from 'actions/userAction'
import { fetchLogout } from 'actions/ApiCall/userAPI'

function Navigation() {

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const token = getToken()

    useEffect(() => {

        if(token !== null) {
            const userData = jwtDecode(token)
            dispatch(actFetchFullUser(userData.data._id, token))
        }
    }, [token])

    const hanldeLogout = () => {
        fetchLogout().then(response => {
            history.replace('/')
            removeUserSession()
        })
    }

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
                {/* <NavLink to="/contact" activeClassName="navbar-active" className="navbar-item">
                        <MdEmail/>
                        <span>Liên hệ</span>
                </NavLink> */}
            </div>
            <div className="navigation-right-container">
                {!getToken() && <Link to='/login' className="navbar-item">
                        <FaUserCircle/>
                        <span>Tài khoản</span>
                </Link>}
                {getToken() && <div className="user-avatar">
                        <span className="username">{user.name}</span>
                        <img src={user.avatar} alt='avatar'/>
                        <div className="user-dropdown">
                            { user.isAdmin && <span onClick={() => history.push('/admin/new-comic')}>Quản lý truyện</span>}
                            <span onClick={() => history.push('/user')}>Thông tin</span>
                            <span onClick={() => history.push('/history/read')}>Lịch sử</span>
                            <span onClick={hanldeLogout}>Đăng xuất</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default React.memo(Navigation)
