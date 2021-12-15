/* eslint-disable react-hooks/exhaustive-deps */
import { loadingComic } from 'actions/loading'
import { actFetchReadComics, getReadComics } from 'actions/userAction'
import ReadComic from 'components/ReadComic/ReadComic'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getToken } from 'utils/common'
import useQuery from 'utils/useQuery'

import './ListReadComics.scss'

function ListReadComics(props) {

    const {
        comics, user, quantityPage,
        fetchReadComics,
        loadingComic,
        getReadComics

    } = props

    const token = getToken()

    let query = useQuery()
    const location = useLocation()

    useEffect(() => {

        if(token) {
            if(query.get('page')) {
                loadingComic(true)
                fetchReadComics(query.get('page'), token)
            }
            else {
                loadingComic(true)
                fetchReadComics(1, token)
            }
        }

        return () => {
            const data = { comics: [], quatitypage: -1 }
            getReadComics(data)
        }

    }, [location.search, user])

    return (
        <div className="list-read-comic-container">
            { quantityPage > 0 && comics.map(comic => (
            <div key={comic._id} className="read-comic-item">
                <ReadComic comic={comic}/>
            </div>))}
            { quantityPage === 0 &&
            <div className="no-result">
                Chưa có truyện!
            </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        comics: state.user.comics,
        user: state.user.user,
        quantityPage: state.comic.quantityPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReadComics : (page, token) => {
            dispatch(actFetchReadComics(page, token))
        },
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        getReadComics : (data) => {
            dispatch(getReadComics(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListReadComics)
