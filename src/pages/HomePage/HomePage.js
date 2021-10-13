import React from 'react'
import SlideShow from 'components/SlideShow/SlideShow'
import { Col, Container, Row } from 'react-bootstrap'

import './HomePage.scss'

function HomePage() {
    return (
        <Container fluid>
            <Row>
                <Col lg={9} md={8} sm={12}>
                    <SlideShow/>
                </Col>
                <Col lg={3} md={4} sm={12}>
                    column 2
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
