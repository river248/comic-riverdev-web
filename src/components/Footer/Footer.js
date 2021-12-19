/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './Footer.scss'

function Footer() {

    const [style, setStyle] = useState('footer-container')

    const location = useLocation()
    
    useEffect(() => {
        if(
            location.pathname === '/history/read' ||
            location.pathname === '/history/liked' ||
            location.pathname === '/history/followed' ||
            location.pathname === '/login' ||
            location.pathname === '/forgot-password' ||
            location.pathname === '/register' ||
            location.pathname === '/user-management')
            if (document.documentElement.offsetHeight < 727)
                setStyle('footer-container footer-position')
            else
                setStyle('footer-container')
        else
            setStyle('footer-container')
    }, [document.documentElement.offsetHeight, location.pathname])

    return (
        <div className={style}>
            <span>HiGiCo - Gì Cũng Có</span>
            <span>Liên hệ: springriver248@gmail.com</span>
            <span>Copyright &copy; 2021</span>
        </div>
    )
}

export default Footer
