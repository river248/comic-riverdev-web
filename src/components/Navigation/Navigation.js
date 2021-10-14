import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { MdEmail, MdCategory, MdOutlineArrowDropDown } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'

import './Navigation.scss'
import Categories from 'components/Categories/Categories'

function Navigation() {

    const [toggle, setToggle] = useState(false)

    return (
        <div className="navigation-container">
            <div className="navigation-left-container">
                <NavLink to="/home" activeClassName="navbar-active" className="navbar-item" onClick={() => setToggle(false)}>
                        <AiFillHome/>
                        <span>Trang chủ</span>
                </NavLink>
                <div className="navbar-item dropdown-btn" onClick={() => setToggle(!toggle)}>
                        <MdCategory/>
                        <span>Thể loại</span>
                        <MdOutlineArrowDropDown/>
                </div>
                <NavLink to="/contact" activeClassName="navbar-active" className="navbar-item" onClick={() => setToggle(false)}>
                        <MdEmail/>
                        <span>Liên hệ</span>
                </NavLink>
            </div>
            <div className="navigation-right-container">
                <Link to="/login" className="navbar-item" onClick={() => setToggle(false)}>
                        <FaUserCircle/>
                        <span>Tài khoản</span>
                </Link>
            </div>

            { toggle && <Categories/>}
        </div>
    )
}

export default Navigation
