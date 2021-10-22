/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Comic from 'components/Comic/Comic'
import { useLocation  } from 'react-router-dom'
import { fetchAllComic, fetchAllComicOfTag } from 'actions/ApiCall/comicAPI'

import './ListComic.scss'

function ListComic({id}) {

    const [comics, setComics] = useState([])
    
    let query = new URLSearchParams(useLocation().search)
    const location = useLocation()

    useEffect(() => {
        if(location.pathname === '/home') {
            if(query.get('page') !== null)
                fetchAllComic(query.get('page')).then(comics => {
                    setComics(comics)
                })
            else
                fetchAllComic(1).then(comics => {
                    setComics(comics)
                })
        } else {
            if(query.get('page') !== null)
            fetchAllComicOfTag(query.get('tag'), query.get('page')).then(comics => {
                setComics(comics)
            })
            else
                fetchAllComicOfTag('616af71268f59ad44354b30f', 1).then(comics => {
                    setComics(comics)
                })
        }
    }, [location.search, query.get('page')])
    
    return (
        <div id={id} className="list-comic-container">
            { comics.map(comic => (
            <div key={comic._id} className="comic-item">
                <Comic comic={comic}/>
            </div>)) }
        </div>
    )
}

export default ListComic
