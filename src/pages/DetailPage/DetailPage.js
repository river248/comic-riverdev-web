/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DetailComic from 'components/DetailComic/DetailComic'
import ListChapter from 'components/ListChapter/ListChapter'
import Comments from 'components/Comments/Comments'
import PostComment from 'components/PostComment/PostComment'
import { Container, Row } from 'react-bootstrap'
import { GiStarFormation } from 'react-icons/gi'
import { FaComments } from 'react-icons/fa'
import { fetchDetailComic } from 'actions/ApiCall/comicAPI'
import { useParams } from 'react-router-dom'
import './DetailPage.scss'

function DetailPage() {

    const [comic, setComic] = useState({})
    let { id } = useParams()

    useEffect(() => {
        fetchDetailComic(id).then(comic => {
            setComic(comic)
        })
    }, [])

    return (
        <Container fluid="md">
            <Row>
                <DetailComic comic={comic}/>
            </Row>
            <Row>
                <h1><GiStarFormation/> Danh sách chương</h1>
                <ListChapter comic={comic}/>
            </Row>
            <Row>
                <h1><FaComments/> Bình luận (174)</h1>
                <Comments/>
                <h3>Vui lòng đăng nhập để có thể bình luận!</h3>
                <PostComment/>
            </Row>
        </Container>
    )
}

export default DetailPage
