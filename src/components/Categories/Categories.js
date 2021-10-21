import { fetchAllTag } from 'actions/ApiCall/tagAPI'
import React, { useEffect, useState } from 'react'

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
                    <input type="checkbox"/>
                    <span>{category.name}</span>
                </div> ))}
        </div>
    )
}

export default Categories
