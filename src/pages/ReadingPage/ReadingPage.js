import ReadingComic from 'components/ReadingComic/ReadingComic'
import React from 'react'
import { Container, Row } from 'react-bootstrap'

function ReadingPage() {
    return (
        <Container fluid="md">
            <Row>
                <ReadingComic/>
            </Row>
        </Container>
    )
}

export default ReadingPage
