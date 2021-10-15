import React from 'react'
import DetailComic from 'components/DetailComic/DetailComic'
import ListChapter from 'components/ListChapter/ListChapter'
import Comments from 'components/Comments/Comments'
import PostComment from 'components/PostComment/PostComment'
import { Container, Row } from 'react-bootstrap'
import { GiStarFormation } from 'react-icons/gi'
import { FaComments } from 'react-icons/fa'

import './DetailPage.scss'

function DetailPage() {

    return (
        <Container fluid="md">
            <Row>
                <DetailComic/>
            </Row>
            <Row>
                <h1><GiStarFormation/> Danh sách chương</h1>
                <ListChapter/>
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
