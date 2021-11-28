import { actSearchComic } from 'actions/comicAction'
import React, { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { ImCancelCircle } from 'react-icons/im'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ImageComic from './ImageComic'

import './Search.scss'

function Search({ comics, quantityPage, searchComic }) {
    const [key, setKey] = useState('')
    const [page, setPage] = useState(1)
    const [displayResult, setDisplayResult] = useState(false)

    const history = useHistory()

    const typingTimeOutRef = useRef(null)
    const searchRef = useRef(null)

    const handleValueChange = (value) => {
        setKey(value)

        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            searchComic(value, page)
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
        searchComic(key, page+1)
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

const mapStateToProps = (state) => {
    return {
        comics: state.comic.searchComics,
        quantityPage: state.comic.quantitySearchPage
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        searchComic : (key, page) => {
            dispatch(actSearchComic(key, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search))
