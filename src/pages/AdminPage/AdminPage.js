/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { actFetchAllTag, actFetchQuantityComic, actFetchUnfinishedComic, clearComics } from 'actions/comicAction'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'

import './AdminPage.scss'
import { connect } from 'react-redux'
import AddComicForm from 'components/AddComicForm/AddComicForm'
import AddChapterForm from 'components/AddComicForm/AddChapterForm'
import { loadingComic } from 'actions/loading'
import Footer from 'components/Footer/Footer'

function AdminPage(props) {

    const {
        quantityComics,
        loadingComic, fetchAllTags, fetchQuantityComic, fetchUnfinishedComic
    } = props
    const { id } = useParams()

    useEffect(() => {
        if(id === 'new-comic') {
            loadingComic(true)
            fetchAllTags()
            fetchQuantityComic()
        }

        if(id === 'new-chapter') {
            loadingComic(true)
            fetchUnfinishedComic()
        }
        
        return () => clearComics([])

    }, [id])


    return (
        <>
        <Container>
            <Row>
                <Col className='admin-nav-col'>
                    <NavLink to="/admin/new-comic" activeClassName="admin-nav-active" className="admin-nav">Thêm truyện</NavLink>
                </Col>
                <Col className='admin-nav-col'>
                    <NavLink to="/admin/new-chapter" activeClassName="admin-nav-active" className="admin-nav">Thêm chương</NavLink>
                </Col>
                {/* <Col className='admin-nav-col'>
                    <NavLink to="/admin/new-tag" activeClassName="admin-nav-active" className="admin-nav">Thêm thể loại</NavLink>
                </Col> */}
            </Row>
            <Row>
                { id === 'new-comic' && <AddComicForm nextComic={quantityComics + 1}/>}
                { id === 'new-chapter' && <AddChapterForm/>}
            </Row>
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        quantityComics: state.comic.quantityComics
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        fetchAllTags : () => {
            dispatch(actFetchAllTag())
        },
        fetchQuantityComic : () => {
            dispatch(actFetchQuantityComic())
        },
        fetchUnfinishedComic : () => {
            dispatch(actFetchUnfinishedComic())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
