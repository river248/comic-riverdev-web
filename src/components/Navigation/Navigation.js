/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { MdCategory } from 'react-icons/md'
import { IoNotifications } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import { connect } from 'react-redux'
import './Navigation.scss'
import { getToken, removeUserSession } from 'utils/common'
import { actFetchFullUser, actfetchNotifications, getFullUser, seenNotification, showNotification } from 'actions/userAction'
import { fetchLogout, updateNotification } from 'actions/ApiCall/userAPI'
import Notification from 'components/Notification/Notification'
import { actFetchNewComics } from 'actions/comicAction'
import { loadingNewComic } from 'actions/loading'

function Navigation(props) {

    const {
        user, yet, show,
        fetchFullUser, getFullUser, getNotifications, toggleNotification, actSeenNotification,
        fetchNewComics, loadingNewComic
    } = props
    const location = useLocation()
    const history = useHistory()
    const [time, setTime] = useState(0)
    const ref = useRef()

    const token = getToken()

    useEffect(() => {

        if(token !== null) {
            fetchFullUser(token)
        }

        return () => getFullUser({})

    }, [token])

    useEffect(() => {
        if (token !== null) {
            getNotifications(1, token)
        }

        const timer = setTimeout(() => {
            setTime(time+5)
        }, 5000)

        return () => clearTimeout(timer)
    },[time])

    useEffect(() => {
        if (token !== null && yet > 0) {
            fetchNewComics()
            loadingNewComic(false)
        }

    },[yet])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (show && ref.current && !ref.current.contains(e.target)) {
                toggleNotification(false)
            }
        }
      
        document.addEventListener("mousedown", checkIfClickedOutside)
      
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [show])

    const hanldeLogout = () => {
        fetchLogout().then(response => {
            history.replace('/')
            removeUserSession()
        })
    }

    const handleNotification = () => {
        toggleNotification(!show)
        if (user && token) {
            updateNotification(token)
            actSeenNotification()
        }
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
            </div>
            <div className="navigation-right-container">
                {!getToken() && <Link to='/login' className="navbar-item">
                        <FaUserCircle/>
                        <span>Tài khoản</span>
                </Link>}
                {getToken() && <>
                <div ref={ref} className="notification">
                    <div className="user-notification" onClick={handleNotification}>
                        <span>Thông báo</span>
                        <IoNotifications/>
                        { (yet > 0) && <div className={ (yet <= 99) ? "quantity-notifications" : "quantity-notifications quantity-notifications-2"}>{yet}</div>}
                    </div>
                    { show && <Notification useID={user._id} token={token}/> }
                </div>
                <div className="user-avatar">
                    <span className="username">{user?.name}</span>
                    <img src={user?.avatar} alt='avatar'/>
                    <div className="user-dropdown">
                        { user?.isAdmin && <span onClick={() => history.push('/admin/new-comic')}>Quản lý truyện</span>}
                        <span onClick={() => history.push('/user')}>Thông tin</span>
                        <span onClick={() => history.push('/history/read')}>Lịch sử</span>
                        <span onClick={hanldeLogout}>Đăng xuất</span>
                    </div>
                </div>
                </>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        yet: state.user.yet,
        show: state.user.show
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchFullUser : (userID, token) => {
            dispatch(actFetchFullUser(userID, token))
        },
        getFullUser : () => {
            dispatch(getFullUser({}))
        },
        getNotifications : (userID, page, token) => {
            dispatch(actfetchNotifications(userID, page, token))
        },
        toggleNotification: (status) => {
            dispatch(showNotification(status))
        },
        actSeenNotification : () => {
            dispatch(seenNotification())
        },
        fetchNewComics : () => {
            dispatch(actFetchNewComics())
        },
        loadingNewComic : (status) => {
            dispatch(loadingNewComic(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Navigation))
