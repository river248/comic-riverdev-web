/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import ImagesComic from './ImagesComic'
import useQuery from 'utils/useQuery'

import './ReadingComic.scss'
import { connect } from 'react-redux'
import { actFetchFullChapter, actFetchQuantityChapter } from 'actions/comicAction'
import { loadingChapter } from 'actions/loading'
import { addHistory } from 'actions/ApiCall/userAPI'
import { getToken } from 'utils/common'
import { updateComics } from 'actions/ApiCall/comicAPI'

function ReadingComic(props) {

    const {
        chapter, user, quantityChapter, comic,
        fetchFullChapter, fetchQuantityChapter, loadingChapter
    } = props
    const history = useHistory()

    let query = useQuery()

    useEffect(() => {
        loadingChapter(true)
        fetchFullChapter(query.get('comic'), query.get('chap'))
        fetchQuantityChapter(query.get('comic'))

        if(getToken() && user._id && comic._id) {
        
            const timer = setTimeout(() => {
                const data = {
                    userID: user._id,
                    comicID: query.get('comic'),
                    chap: query.get('chap')
                }
                addHistory(data, getToken()).then()

                updateComics(comic._id, {views: comic.views+1})
              }, 5000);

            return () => clearTimeout(timer);
        }

    }, [query.get('chap'), comic])

    return (
        <>
        { chapter.chap !== 0 && <>
            <h1 className="reading-comic-title">{chapter.title}</h1>
            <div className="reading-header">
                <button onClick={() => history.push(`/home/detail-comic/${query.get('comic')}`)}>
                    <AiOutlineRollback/>
                    Quay lại
                </button>
                <span className="current-chapter">Chương {chapter.chap}</span>
            </div>

            <div className="reading-comic-img">
                {chapter.image.map((image, index) => (
                    <ImagesComic
                        key={index}
                        comicNumber={chapter.number}
                        chap={chapter.chap}
                        image={image}
                    />
                ))}
            </div>
            <div className="reading-comic-chap">
                { chapter.chap !==1 &&
                    <button onClick={() => history.push(`/home/reading?comic=${query.get('comic')}&chap=${chapter.chap-1}`)}>
                        Chương trước
                    </button> }

                <span className="current-chapter">Chương {chapter.chap}</span>

                { chapter.chap < quantityChapter &&
                    <button onClick={() => history.push(`/home/reading?comic=${query.get('comic')}&chap=${chapter.chap+1}`)}>
                        Chương sau
                    </button> }
            </div>
        </>}
        
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        chapter: state.comic.chapter,
        comic: state.comic.comic,
        quantityChapter: state.comic.quantityChapter,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingChapter : (status) => {
            dispatch(loadingChapter(status))
        },
        fetchFullChapter : (comicID, chap) => {
            dispatch(actFetchFullChapter(comicID, chap))
        },
        fetchQuantityChapter : (comicID) => {
            dispatch(actFetchQuantityChapter(comicID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ReadingComic))
