/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DetailComic from 'components/DetailComic/DetailComic'
import ListChapter from 'components/ListChapter/ListChapter'
import Comments from 'components/Comments/Comments'
import PostComment from 'components/PostComment/PostComment'
import { Container, Row } from 'react-bootstrap'
import { GiStarFormation } from 'react-icons/gi'
import { FaComments } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import './DetailPage.scss'
import { connect } from 'react-redux'
import { actFetchDetailComic, actFetchInteractions, clearDetailComic } from 'actions/comicAction'
import { loadingChapter, loadingComic } from 'actions/loading'
import Modal from 'components/Modal/Modal'
import Footer from 'components/Footer/Footer'

function DetailPage(props) {

    const {
        comic, interactions, user,
        loadingComic,
        loadingChapter,
        fetchDetailComic,
        fetchInteractions
    } = props

    const [show, setShow] = useState(false)

    let { id } = useParams()

    useEffect(() => {
        loadingComic(true)
        loadingChapter(true)
        fetchDetailComic(id)
        fetchInteractions(id)
        return () => clearDetailComic()

    }, [id])

    return (
        <>
        { show && <Modal comicID={comic._id} setShow={setShow}/>}
        <Container fluid="md">
            <Row>
                <DetailComic comic={comic} interactions={interactions}/>
            </Row>
            { user.isAdmin && <Row>
                <button className="edit-detail-comic" onClick={() => setShow(true)}>Chỉnh sửa thể loại</button>
            </Row>}
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
        <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        comic: state.comic.comic,
        interactions: state.comic.interactions,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        loadingChapter : (status) => {
            dispatch(loadingChapter(status))
        },
        fetchDetailComic : (comicID) => {
            dispatch(actFetchDetailComic(comicID))
        },
        fetchInteractions : (comicID) => {
            dispatch(actFetchInteractions(comicID))
        },
        clearDetailComic : () => {
            dispatch(clearDetailComic([]))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DetailPage))
