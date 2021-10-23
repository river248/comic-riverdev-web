/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ListComic from 'components/ListComic/ListComic'
import { GiStarSwirl } from 'react-icons/gi'
import { Col, Container, Row } from 'react-bootstrap'
import naruto from 'resources/naruto.png'

import './CategoriesPage.scss'
import Categories from 'components/Categories/Categories'
import Pagina from 'components/Pagina/Pagina'
import { fetchDetailTag } from 'actions/ApiCall/tagAPI'
import useQuery from 'utils/useQuery'
import { useSelector } from 'react-redux'

function CategoriesPage() {

    const [tagName, setTagName] = useState({name: 'Ngôn tình'})
    const heightComponent = useSelector(state => state.getHeight)
    let query = useQuery()

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
                    { heightComponent >= 955 && <img src={naruto} alt='naruto' className='category-image'/>}
                    { heightComponent >= 1435 && <img src={naruto} alt='naruto' className='category-image-2'/>}
                </Col>
                <Col lg={9} md={8} sm={12}>
                    <h1 className="category-title"><GiStarSwirl/>{tagName.name}</h1>
                    <ListComic/>
                    <Pagina/>
                </Col>
            </Row>
        </Container>
    )
}

export default CategoriesPage
