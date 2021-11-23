/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import './Footer.scss'

function Footer() {

    const [style, setStyle] = useState('footer-container')

    useEffect(() => {
        
        if (document.documentElement.offsetHeight < 731)
            setStyle('footer-container footer-position')
        else
            setStyle('footer-container')
    }, [document.documentElement.offsetHeight])

    return (
        <div className={style}>
            <span>HiGiCo - Gì Cũng Có</span>
            <span>Liên hệ: springriver248@gmail.com</span>
            <span>Copyright &copy; 2021</span>
        </div>
    )
}

export default Footer
