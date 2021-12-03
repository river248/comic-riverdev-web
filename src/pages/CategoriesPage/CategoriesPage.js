/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ListComic from 'components/ListComic/ListComic'
import { GiStarSwirl } from 'react-icons/gi'
import { Col, Container, Row } from 'react-bootstrap'
import naruto from 'resources/naruto.png'

import './CategoriesPage.scss'
import Categories from 'components/Categories/Categories'
import Pagina from 'components/Pagina/Pagina'
import useQuery from 'utils/useQuery'
import { connect } from 'react-redux'
import { actFetchDetailTag } from 'actions/comicAction'
import Footer from 'components/Footer/Footer'

function CategoriesPage(props) {

    const {
        tagName, heightComponent,
        fetchDetailTag
    } = props

    let query = useQuery()

    useEffect(() => {
        if(query.get('tag') !== null)
            fetchDetailTag(query.get('tag'))
    }, [query.get('tag')])

    return (
        <>
        <Container fluid>
            <Row className="category-page-row">
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
        <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        tagName: state.comic.tag,
        heightComponent: state.getHeight
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailTag : (page) => {
            dispatch(actFetchDetailTag(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage)
