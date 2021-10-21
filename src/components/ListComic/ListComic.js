/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Comic from 'components/Comic/Comic'
import { useLocation  } from 'react-router-dom'
import { fetchAllComic } from 'actions/ApiCall/comicAPI'

import './ListComic.scss'

function ListComic() {

    const [comics, setComics] = useState([])
    
    let query = new URLSearchParams(useLocation().search)
    const location = useLocation()

    useEffect(() => {

        if(query.get('page') !== null)
            fetchAllComic(query.get('page')).then(comics => {
                setComics(comics)
            })
        else
            fetchAllComic(1).then(comics => {
                setComics(comics)
            })

    }, [location.pathname, query.get('page')])
    
    return (
        <div className="list-comic-container">
            { comics.map(comic => (
            <div key={comic._id} className="comic-item">
                <Comic comic={comic}/>
            </div>)) }
        </div>
    )
}

export default ListComic
