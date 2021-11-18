/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { actFetchAllTag, actFetchQuantityComic, actFetchUnfinishedComic, clearComics } from 'actions/comicAction'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'

import './AdminPage.scss'
import { useDispatch } from 'react-redux'
import AddComicForm from 'components/AddComicForm/AddComicForm'
import AddChapterForm from 'components/AddComicForm/AddChapterForm'
import { useSelector } from 'react-redux'
import { loadingComic } from 'actions/loading'

function AdminPage() {

    const dispatch = useDispatch()
    const quantityComics = useSelector(state => state.comic.quantityComics)
    const { id } = useParams()

    useEffect(() => {
        if(id === 'new-comic') {
            dispatch(loadingComic(true))
            dispatch(actFetchAllTag())
            dispatch(actFetchQuantityComic())
        }

        if(id === 'new-chapter') {
            dispatch(loadingComic(true))
            dispatch(actFetchUnfinishedComic())
        }
        
        return () => clearComics([])

    }, [id])


    return (
        <Container>
            <Row>
                <Col className='admin-nav-col'>
                    <NavLink to="/admin/new-comic" activeClassName="admin-nav-active" className="admin-nav">Thêm truyện</NavLink>
                </Col>
                <Col className='admin-nav-col'>
                    <NavLink to="/admin/new-chapter" activeClassName="admin-nav-active" className="admin-nav">Thêm chương</NavLink>
                </Col>
                <Col className='admin-nav-col'>
                    <NavLink to="/admin/new-tag" activeClassName="admin-nav-active" className="admin-nav">Thêm thể loại</NavLink>
                </Col>
            </Row>
            <Row>
                { id === 'new-comic' && <AddComicForm nextComic={quantityComics + 1}/>}
                { id === 'new-chapter' && <AddChapterForm/>}
            </Row>
        </Container>
    )
}

export default AdminPage
