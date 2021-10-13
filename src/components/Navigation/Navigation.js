import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { MdEmail, MdCategory } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'

import './Navigation.scss'

function Navigation() {
    return (
        <div className="navigation-container">
            <div className="navigation-left-container">
                <NavLink to="/home" activeClassName="navbar-active" className="navbar-item">
                        <AiFillHome/>
                        <span>Trang chủ</span>
                </NavLink>
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
                <Link to="/login" className="navbar-item">
                        <FaUserCircle/>
                        <span>Đăng nhập</span>
                </Link>
            </div>
        </div>
    )
}

export default Navigation
