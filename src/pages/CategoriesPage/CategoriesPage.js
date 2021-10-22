/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import ListComic from 'components/ListComic/ListComic'
import { GiStarSwirl } from 'react-icons/gi'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import naruto from 'resources/naruto.png'

import './CategoriesPage.scss'
import Categories from 'components/Categories/Categories'
import Pagina from 'components/Pagina/Pagina'
import { fetchDetailTag } from 'actions/ApiCall/tagAPI'

function CategoriesPage() {

    const [tagName, setTagName] = useState({name: 'Ngôn tình'})
    const image = useRef(null)

    let query = new URLSearchParams(useLocation().search)

    useEffect(() => {
        if(query.get('tag') !== null)
            fetchDetailTag(query.get('tag')).then(tag => {
                setTagName(tag)
            })
    }, [query.get('tag')])

    return (
        <Container fluid>
            <Row>
                <Col lg={3} md={4} sm={12}>
                    <h2 className="all-categories">Tất cả</h2>
                    <Categories/>
                    <img src={naruto} alt='naruto' className='category-image' ref={image}/>
                </Col>
                <Col lg={9} md={8} sm={12}>
                    <h1 className="category-title"><GiStarSwirl/>{tagName.name}</h1>
                    <ListComic id="category-height"/>
                    <Pagina/>
                </Col>
            </Row>
        </Container>
    )
}

export default CategoriesPage
