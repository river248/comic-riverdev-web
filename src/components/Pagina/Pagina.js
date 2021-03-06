/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Pagination } from 'react-bootstrap'

import './Pagina.scss'
import useQuery from 'utils/useQuery'
import { connect } from 'react-redux'
import { actFetchQuantityPage, clearQuantityPage } from 'actions/comicAction'
import { actFetchQuantityFollowedComics, actFetchQuantityLikedComics } from 'actions/userAction'
import { getToken } from 'utils/common'
import { loadingComic } from 'actions/loading'

function Pagina(props) {

    const {
        quantityPage, user,
        fetchQuantityPage,
        fetchQuantityLikedComics,
        fetchQuantityFollowedComics,
        clearQuantityPage,
        loadingComic
    } = props

    const [pages, setPages] = useState([])

    const location = useLocation()
    const history = useHistory()
    let query = useQuery()
    
    useEffect(() => {

        switch (location.pathname) {
            case '/':
                fetchQuantityPage('')
                break
            case '/home':
                fetchQuantityPage('')
                break
            case '/category':    
                fetchQuantityPage(query.get('tag'))
                break
            case '/history/liked':
                if(getToken())
                    fetchQuantityLikedComics(getToken())
                break
            case '/history/followed':
                if(getToken())
                    fetchQuantityFollowedComics(getToken())
                break
            default:
                break
        }
        
        return () => clearQuantityPage()
        
    }, [location.search, location.pathname, user])

    useEffect(() => {

        if(location.search === '' || query.get('page')*1 < 4) {
            if(quantityPage >= 3) setPages([1, 2, 3])
            if(quantityPage === 2) setPages([1, 2])
        } else {
            let clone = []
            for(let i = 2; i > -1; i--)
                clone.push(query.get('page')*1 - i)
            setPages([...clone])
        }
        if(quantityPage === 0 && (
            location.pathname === '/history/liked' ||
            location.pathname === '/history/followed' ||
            location.pathname === '/history/read') ) {
            loadingComic(false)
        }
        if(quantityPage === -1 && (
            location.pathname === '/history/liked' ||
            location.pathname === '/history/followed' ||
            location.pathname === '/history/read') ) {
            loadingComic(true)
        }

    }, [quantityPage])

    const handleNextPage = () => {

        if(location.search !== '') {
            if(query.get('page')*1 > pages[1] && query.get('page')*1 < quantityPage) {

                let clone = []
                for(let i = 0; i < 3; i++)
                    clone.push(pages[i] + 1)
                setPages([...clone])

                switch (location.pathname) {
                    case '/':
                        history.push(`/home?page=${query.get('page')*1+1}`)
                        break
                    case '/home':
                        history.push(`/home?page=${query.get('page')*1+1}`)
                        break
                    case '/category':
                        history.push(`/category?tag=${query.get('tag')}&page=${query.get('page')*1+1}`)
                        break
                    default:
                        break
                }

            }
            if(query.get('page')*1 < pages[2]) {
                switch (location.pathname) {
                    case '/':
                        history.push(`/home?page=${query.get('page')*1+1}`)
                        break
                    case '/home':
                        history.push(`/home?page=${query.get('page')*1+1}`)
                        break
                    case '/category':
                        history.push(`/category?tag=${query.get('tag')}&page=${query.get('page')*1+1}`)
                        break
                    default:
                        break
                }
            }
        } else {
            switch (location.pathname) {
                case '/':
                    history.push('/home?page=2')
                    break
                case '/home':
                    history.push('/home?page=2')
                    break
                case '/category':
                    history.push(`/category?tag=${query.get('tag') ? query.get('tag') : '616af71268f59ad44354b30f'}&page=2`)
                    break
                default:
                    break
            }
        }
    }

    const handlePrevPage = () => {

        if(location.search !== '') {
            if(query.get('page')*1 === pages[0] && query.get('page')*1 > 1) {

                let clone = []
                for(let i = 0; i < 3; i++)
                    clone.push(pages[i] - 1)
                setPages([...clone])

                switch (location.pathname) {
                    case '/':
                        history.push(`/home?page=${query.get('page')*1-1}`)
                        break
                    case '/home':
                        history.push(`/home?page=${query.get('page')*1-1}`)
                        break
                    case '/category':
                        history.push(`/category?tag=${query.get('tag')}&page=${query.get('page')*1-1}`)
                        break
                    default:
                        break
                }
            }
            if(query.get('page')*1 <= pages[2] && query.get('page')*1 > pages[0]) {
                switch (location.pathname) {
                    case '/':
                        history.push(`/home?page=${query.get('page')*1-1}`)
                        break
                    case '/home':
                        history.push(`/home?page=${query.get('page')*1-1}`)
                        break
                    case '/category':
                        history.push(`/category?tag=${query.get('tag')}&page=${query.get('page')*1-1}`)
                        break
                    default:
                        break
                }
            }
    
        }

        
    }

    const handleThisPage= (value) => {

        switch (location.pathname) {
            case '/':
                history.push(`/home?page=${value}`)
                break
            case '/home':
                history.push(`/home?page=${value}`)
                break
            case '/category':
                history.push(`/category?tag=${query.get('tag') ? query.get('tag') : '616af71268f59ad44354b30f'}&page=${value}`)
                break
            default:
                break
        }

    }

    const handleNextMultipage = () => {
        if(quantityPage - pages[2] >= 3) {
            let clone = []
            for(let i = 0; i < 3; i++)
                clone.push(pages[i] + 3)
            setPages([...clone])
        } else {
            let clone = []
            for(let i = 0; i < 3; i++)
                clone.push(pages[i] + quantityPage - pages[2])
            setPages([...clone])
        }
    }

    const handlePrevMultipage = () => {
        if(pages[0] - 3 >= 1) {
            let clone = []
            for(let i = 0; i < 3; i++)
                clone.push(pages[i] - 3)
            setPages([...clone])
        } else {
            let clone = []
            for(let i = 0; i < 3; i++)
                clone.push(pages[i] - (pages[0] - 1))
            setPages([...clone])
        }
    }

    return (
        <>
        { quantityPage > 1 && 
        <Pagination>
            { quantityPage > 5 && <Pagination.First className='page-item-first' onClick={handlePrevMultipage}/>}

            { quantityPage > 3 && <Pagination.Prev className='page-item-second' onClick={handlePrevPage}/> }

            { location.search && pages.map(page => (
            <Pagination.Item key={page}
                className={ query.get('page')*1 === page ? 'active' : '' }
                onClick={() => handleThisPage(page)}>{page}
            </Pagination.Item>))}

            { !location.search && pages.map(page => (
            <Pagination.Item key={page}
                className={ page === 1 ? 'active' : '' }
                onClick={() => handleThisPage(page)}>{page}
            </Pagination.Item>))}

            { quantityPage > 3 && <Pagination.Next className='page-item-third' onClick={handleNextPage}/> }

            { quantityPage > 5 && <Pagination.Last className='page-item-last' onClick={handleNextMultipage}/>}
        </Pagination>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        quantityPage: state.comic.quantityPage,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuantityPage : (data) => {
            dispatch(actFetchQuantityPage(data))
        },
        fetchQuantityLikedComics : (token) => {
            dispatch(actFetchQuantityLikedComics(token))
        },
        fetchQuantityFollowedComics : (token) => {
            dispatch(actFetchQuantityFollowedComics(token))
        },
        clearQuantityPage : () => {
            dispatch(clearQuantityPage(-1))
        },
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Pagina))
