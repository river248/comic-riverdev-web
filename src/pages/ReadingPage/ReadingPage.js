/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { actFetchDetailComic } from 'actions/comicAction'
import ReadingComic from 'components/ReadingComic/ReadingComic'
import { Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import useQuery from 'utils/useQuery'

function ReadingPage({ fetchDetailComic }) {

    const query = useQuery()

    useEffect(() => {
        fetchDetailComic(query.get('comic'))
    }, [query.get('chap')])

    return (
        <Container fluid="md">
            <Row>
                <ReadingComic/>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailComic : (comicID) => {
            dispatch(actFetchDetailComic(comicID))
        }
    }
}
export default connect(null, mapDispatchToProps)(ReadingPage)
