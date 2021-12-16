/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import SlideShow from 'components/SlideShow/SlideShow'
import { Col, Container, Row } from 'react-bootstrap'

import './HomePage.scss'
import NewComic from 'components/NewComic/NewComic'
import ListComic from 'components/ListComic/ListComic'
import Pagina from 'components/Pagina/Pagina'
import Footer from 'components/Footer/Footer'
import { actGetAccessToken } from 'actions/userAction'
import { connect } from 'react-redux'

function HomePage() {

    // useEffect(() => {
    //     getAccessToken()
    // }, [])

    return (
        <>
        <Container fluid>
            <Row className="header-page-row">
                <Col lg={9} md={8} sm={12}>
                    <SlideShow/>
                    {/* <ListComic/> */}
                    <Pagina/>
                </Col>
                <Col lg={3} md={4} sm={12}>
                    <div className="new-comic-title">MỚI CẬP NHẬT</div>
                    {/* <NewComic/> */}
                </Col>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getAccessToken : () => {
//             dispatch(actGetAccessToken())
//         }
//     }
// }

export default HomePage
