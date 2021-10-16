import React from 'react'
import ListComic from 'components/ListComic/ListComic'
import { GiStarSwirl } from 'react-icons/gi'
import { Col, Container, Row } from 'react-bootstrap'

import './CategoriesPage.scss'
import Categories from 'components/Categories/Categories'
import Pagina from 'components/Pagina/Pagina'

function CategoriesPage() {
    return (
        <Container fluid>
            <Row>
                <Col lg={3} md={4} sm={12}>
                    <h2 className="all-categories">Tất cả</h2>
                    <Categories/>
                </Col>
                <Col lg={9} md={8} sm={12}>
                    <h1 className="category-title"><GiStarSwirl/>Shounen</h1>
                    <ListComic/>
                    <Pagina/>
                </Col>
            </Row>
        </Container>
    )
}

export default CategoriesPage
