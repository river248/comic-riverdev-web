import React from 'react'
import ListComic from 'components/ListComic/ListComic'
import Pagina from 'components/Pagina/Pagina'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import './HistoryPage.scss'
import ListReadComics from 'components/ListReadComics/ListReadComics'

function HistoryPage() {

    const { id } = useParams()

    return (
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
        </Container>
    )
}

export default HistoryPage
