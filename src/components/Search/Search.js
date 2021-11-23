import { actSearchComic } from 'actions/comicAction'
import React, { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { ImCancelCircle } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ImageComic from './ImageComic'

import './Search.scss'

function Search() {
    const [key, setKey] = useState('')
    const [page, setPage] = useState(1)
    const [displayResult, setDisplayResult] = useState(false)

    const history = useHistory()
    const comics = useSelector(state => state.comic.searchComics)
    const quantityPage = useSelector(state => state.comic.quantitySearchPage)
    const typingTimeOutRef = useRef(null)
    const searchRef = useRef(null)

    const dispatch = useDispatch()

    const handleValueChange = (value) => {
        setKey(value)

        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            dispatch(actSearchComic(value, page))
            if(value === '')
                setDisplayResult(false)
            else
                setDisplayResult(true)
        }, 300)

    }

    const handleThisComic = (value) => {
        history.push(`/home/detail-comic/${value}`)
        setKey('')
        setDisplayResult(false)
    }

    const handleLoadMore = () => {
        dispatch(actSearchComic(key, page+1))
        setPage(page+1)
    }

    return (
        <div className="search-container">
            <input ref={searchRef} placeholder="Search..." value={key} onChange={(e) => handleValueChange(e.target.value)}/>
            {!displayResult ? <BiSearch/> : <ImCancelCircle onClick={() => { setKey(''); setDisplayResult(false)}}/>}
            { (comics.length > 0 && displayResult) && <div className="search-result">
                { comics.map(comic => (
                <div key={comic._id} className="search-result-item" onClick={() => handleThisComic(comic._id)}>
                    <ImageComic comicID={comic._id} number={comic.number} thumbnail={comic.thumbnail}/>
                    <span>{comic.title}</span>
                </div> ))}
                { (quantityPage > 1 && page < quantityPage) &&<button onClick={handleLoadMore}>Xem thêm</button>}
            </div>}
        </div>
    )
}

export default React.memo(Search)
