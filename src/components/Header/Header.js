import React from 'react'
import Search from 'components/Search/Search'
import poster from 'resources/poster.png'

import './Header.scss'

function Header() {
    return (
        <div className="header-container">
            <img src={poster} alt="poster"/>
            <Search/>
        </div>
    )
}

export default Header
