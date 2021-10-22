import React, { useEffect, useState } from 'react'
import sasuke from 'resources/sasuke.png'
import { fetchAllTag } from 'actions/ApiCall/tagAPI'
import { Link } from 'react-router-dom'

import './Categories.scss'

function Categories() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchAllTag().then(categories => {
            setCategories(categories)
        })
    }, [])

    return (
        <div className="categories-container">
            { categories.map(category => (
                <div key={category._id} className="category-container">
                    <Link to={`/category?tag=${category._id}&page=${1}`}>{category.name}</Link>
                </div> ))}
            <img src={sasuke} alt='sasuke'/>
        </div>
    )
}

export default Categories
