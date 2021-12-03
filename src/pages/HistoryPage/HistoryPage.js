import React, { useState } from 'react'
import ListComic from 'components/ListComic/ListComic'
import Pagina from 'components/Pagina/Pagina'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import './HistoryPage.scss'
import ListReadComics from 'components/ListReadComics/ListReadComics'
import { connect } from 'react-redux'
import { getToken } from 'utils/common'
import { removeAllReadComic } from 'actions/ApiCall/userAPI'
import { actFetchReadComics } from 'actions/userAction'
import Footer from 'components/Footer/Footer'

function HistoryPage(props) {

    const {
        comics, user,
        fetchReadComics
    } = props

    const [loading, setLoading] = useState(false)
    const token = getToken()
    const { id } = useParams()

    const handleRemoveAllHistory = () => {
        setLoading(true)
        if(user._id && token)
            removeAllReadComic(user._id, token).then(() => {
                fetchReadComics(user._id, 1, token)
                setLoading(false)
            })
    }

    return (
        <>
        <Container>
            <Row>
                <Col className='history-col'>
                    <NavLink to="/history/read" className="history-nav" activeClassName="history-nav-active">Truyện đã đọc</NavLink>
                </Col>
                <Col className='history-col'>
                    <NavLink to="/history/liked" className="history-nav" activeClassName="history-nav-active">Đã thích</NavLink>
                </Col>
                <Col className='history-col'>
                    <NavLink to="/history/followed" className="history-nav" activeClassName="history-nav-active">Đã theo dõi</NavLink>
                </Col>
            </Row>
            <Row>
                { (id === 'liked' || id === 'followed') && <>
                <ListComic/>
                <Pagina/>
                </>}
                { id === 'read' && <>
                    <ListReadComics/>
                    <Pagina/>
                </>}
            </Row>
            { comics.length > 0 &&
            <Row>
                <div className="remove-all-read-comics" onClick={handleRemoveAllHistory}>
                    { !loading ? <span>Xóa lịch sử xem</span> :
                    <div className="spinner-border text-warning" role="status"/> }
                </div>
            </Row>}
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        comics: state.user.comics,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReadComics : (userID, page, token) => {
            dispatch(actFetchReadComics(userID, page, token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)
