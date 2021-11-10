/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { actFetchDetailComic } from 'actions/comicAction'
import ReadingComic from 'components/ReadingComic/ReadingComic'
import { Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import useQuery from 'utils/useQuery'

function ReadingPage() {

    const disptach = useDispatch()
    const query = useQuery()

    useEffect(() => {
        disptach(actFetchDetailComic(query.get('comic')))
    }, [query.get('chap')])

    return (
        <Container fluid="md">
            <Row>
                <ReadingComic/>
            </Row>
        </Container>
    )
}

export default ReadingPage
