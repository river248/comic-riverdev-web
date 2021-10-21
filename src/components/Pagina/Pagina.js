/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Pagination } from 'react-bootstrap'

import './Pagina.scss'
import { fetchQuantityPage } from 'actions/ApiCall/comicAPI'

function Pagina() {

    const [quantityPage, setQuantityPage] = useState(0)
    const [pages, setPages] = useState([])

    const location = useLocation()
    const history = useHistory()
    let query = new URLSearchParams(useLocation().search)

    useEffect(() => {
        if(location.pathname === '/home' || location.pathname === '/')
            fetchQuantityPage().then(quantity => {
                setQuantityPage(quantity)   
            })
        if(location.pathname === '/categories')
            console.log(location)
            
    }, [location])

    useEffect(() => {
        if(location.search === '' || query.get('page')*1 < 4)
            setPages([1, 2, 3])
        else {
            let clone = []
            for(let i = 2; i > -1; i--)
                clone.push(query.get('page')*1 - i)
            setPages([...clone])
        }

    }, [])

    const handleNextPage = () => {

        if(location.search !== '') {
            if(query.get('page')*1 > pages[1] && query.get('page')*1 < quantityPage) {

                let clone = []
                for(let i = 0; i < 3; i++)
                    clone.push(pages[i] + 1)
                setPages([...clone])
                history.push(`/home?page=${query.get('page')*1+1}`)
            }
            if(query.get('page')*1 < pages[2])
                history.push(`/home?page=${query.get('page')*1+1}`)
        } else history.push('/home?page=2')
    }

    const handlePrevPage = () => {

        if(location.search !== '') {
            if(query.get('page')*1 === pages[0] && query.get('page')*1 > 1) {

                let clone = []
                for(let i = 0; i < 3; i++)
                    clone.push(pages[i] - 1)
                setPages([...clone])
                history.push(`/home?page=${query.get('page')*1-1}`)
            }
            if(query.get('page')*1 <= pages[2] && query.get('page')*1 > pages[0])
                history.push(`/home?page=${query.get('page')*1-1}`)
        }

        
    }

    return (
        <>
        { quantityPage > 1 && 
        <Pagination>
            { quantityPage > 5 && <Pagination.First className='page-item-first'/>}

            <Pagination.Prev className='page-item-second' onClick={handlePrevPage}/>

            { location.search && pages.map(page => (
            <Pagination.Item key={page}
                className={ location.search === `?page=${page}` ? 'active' : '' }
                onClick={() => history.push(`/home?page=${page}`)}>{page}
            </Pagination.Item>))}

            { !location.search && pages.map(page => (
            <Pagination.Item key={page}
                className={ page === 1 ? 'active' : '' }
                onClick={() => history.push(`/home?page=${page}`)}>{page}
            </Pagination.Item>))}

            <Pagination.Next className='page-item-third' onClick={handleNextPage}/>

            { quantityPage > 5 && <Pagination.Last className='page-item-last'/>}
        </Pagination>
        }
        </>
    )
}

export default Pagina
