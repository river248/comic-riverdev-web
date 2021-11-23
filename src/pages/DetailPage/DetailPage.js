/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import DetailComic from 'components/DetailComic/DetailComic'
import ListChapter from 'components/ListChapter/ListChapter'
import Comments from 'components/Comments/Comments'
import PostComment from 'components/PostComment/PostComment'
import { Container, Row } from 'react-bootstrap'
import { GiStarFormation } from 'react-icons/gi'
import { FaComments } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import './DetailPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchDetailComic, actFetchInteractions, clearDetailComic } from 'actions/comicAction'
import { loadingChapter, loadingComic } from 'actions/loading'

function DetailPage() {

    const comic = useSelector(state => state.comic.comic)
    const interactions = useSelector(state => state.comic.interactions)

    const dispatch = useDispatch()

    let { id } = useParams()

    useEffect(() => {
        dispatch(loadingComic(true))
        dispatch(loadingChapter(true))
        dispatch(actFetchDetailComic(id))
        dispatch(actFetchInteractions(id))
        return () => dispatch(clearDetailComic())

    }, [id])

    return (
        <Container fluid="md">
            <Row>
                <DetailComic comic={comic} interactions={interactions}/>
            </Row>
            <Row>
                <h1><GiStarFormation/> Danh sách chương</h1>
                <ListChapter comic={comic}/>
            </Row>
            <Row>
                <h1><FaComments/> Bình luận ({interactions?.comments})</h1>
                <Comments comic={comic}/>
                <h3>Vui lòng đăng nhập để có thể bình luận!</h3>
                <PostComment comic={comic}/>
            </Row>
        </Container>
    )
}

export default React.memo(DetailPage)
