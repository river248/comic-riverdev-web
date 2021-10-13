import React from 'react'
import { BiSearch } from 'react-icons/bi'

import './Search.scss'

function Search() {
    return (
        <div className="search-container">
            <input placeholder="Search..."/>
            <BiSearch/>
        </div>
    )
}

export default Search
