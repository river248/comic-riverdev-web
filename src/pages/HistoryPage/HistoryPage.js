/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ListComic from 'components/ListComic/ListComic'
import Pagina from 'components/Pagina/Pagina'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import './HistoryPage.scss'
import ListReadComics from 'components/ListReadComics/ListReadComics'
import { connect } from 'react-redux'
import { actConfirm, actGetAccessToken } from 'actions/userAction'
import Footer from 'components/Footer/Footer'

function HistoryPage(props) {

    const {
        comics,
        actConfirm, getAccessToken
    } = props

    const { id } = useParams()
    
    useEffect(() => {
        getAccessToken()
    }, [])

    const handleRemoveAllHistory = () => {
        actConfirm({
            show: true,
            comicID: '',
            chap: 0,
            chapter: '',
            title: ''
        })
    }

    return (
        <>
        <Container>
            <Row>
                <Col className='history-col'>
                    <NavLink to="/history/read" className="history-nav" activeClassName="history-nav-active">Truyện đã đọc</NavLink>
                </Col>
                <Col className='history-col'>
                    <NavLink to="/history/liked" className="history-nav" activeClassName="history-nav-active">Đã thích</NavLink>
                </Col>
                <Col className='history-col'>
                    <NavLink to="/history/followed" className="history-nav" activeClassName="history-nav-active">Đã theo dõi</NavLink>
                </Col>
            </Row>
            <Row>
                { (id === 'liked' || id === 'followed') && <>
                <ListComic/>
                <Pagina/>
                </>}
                { id === 'read' && <>
                    <ListReadComics/>
                    <Pagina/>
                </>}
            </Row>
            { comics.length > 0 &&
            <Row>
                <div className="remove-all-read-comics" onClick={handleRemoveAllHistory}>
                    <span>Xóa lịch sử xem</span>
                </div>
            </Row>}
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        comics: state.user.comics,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actConfirm : (data) => {
            dispatch(actConfirm(data))
        },
        getAccessToken : () => {
            dispatch(actGetAccessToken())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)
