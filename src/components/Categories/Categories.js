/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import sasuke from 'resources/sasuke.png'
import { Link } from 'react-router-dom'

import './Categories.scss'
import { connect } from 'react-redux'
import { actFetchAllTag } from 'actions/comicAction'

function Categories({ categories, fetchAllTag }) {

    useEffect(() => {
        fetchAllTag()
    }, [])

    return (
        <>
        {categories.length > 0 && <div className="categories-container">
            { categories.map(category => (
                <div key={category._id} className="category-container">
                    <Link to={`/category?tag=${category._id}&page=${1}`}>{category.name}</Link>
                </div> ))}
            <img src={sasuke} alt='sasuke'/>
        </div>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.comic.tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTag : () => {
            dispatch(actFetchAllTag())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Categories))
