/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { storage} from 'firebase/index'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { loadingComic } from 'actions/loading'
import { actFetchQuantityChapter, actFetchUnfinishedComic } from 'actions/comicAction'
import loadingImage from 'resources/loading.png'
import { getToken } from 'utils/common'
import { createNewChapter } from 'actions/ApiCall/adminAPI'
import { updateComics } from 'actions/ApiCall/comicAPI'
import Alert from 'components/Alert/Alert'

function AddChapterForm(props) {

    const {
        chapters, comics, user,
        loadingComic, fetchQuantityChapter, fetchUnfinishedComic
    } = props

    const [error, setError] = useState (false)
    const [comicID, setComicID] = useState('')
    const [number, setNumber] = useState(0)
    const [thumbnail, setThumbnail] = useState('')
    const [images, setImages] = useState([])
    const [imagesName, setImagesName] = useState([])
    const [loading, setLoading] = useState({chapter: false, image: false})
    const [chapter, setChapter] = useState(0)
    const [status, setStatus] = useState({isFinished: false, name: 'Chưa hoàn thành'})
    const [alert, setAlert] = useState({ show: false, message: ''})

    const token = getToken()

    useEffect(() => {
        if(comics.length > 0) {
            fetchQuantityChapter(comics[0]._id)
            setNumber(comics[0].number)
            setComicID(comics[0]._id)
            getDownloadURL(ref(storage, `comics/truyen${comics[0].number}/${comics[0].thumbnail}`))
            .then(url => {
                setThumbnail(url)
                loadingComic(false)
            })
            .catch((error) => console.log(error))
        }
    }, [comics])

    useEffect(() => {
        setLoading({ ...loading, chapter: true})
            if(chapters > -1) {
                setLoading({ ...loading, chapter: false})
                setChapter(chapters+1)
            }
    }, [chapters])

    const handleChangeImage = e => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i]
            newImage['id'] = Math.random();
            setImagesName((prevState) => [...prevState, e.target.files[i].name])
            setImages((prevState) => [...prevState, newImage])
        }
    }

    const handleSubmit = () => {
        setAlert({show: false, message: ''})
        if (images.length > 0 && user.isAdmin) {
            setLoading({ chapter: true, image: true})
            const data = {
                comicID: comicID,
                image: imagesName
            }

            if(status.isFinished) {
                createNewChapter(data, user.isAdmin, token).then( res => {
                    uploadImages()
                    fetchUnfinishedComic()
                    loadingComic(true)
                    setImages([])
                    setAlert({show: true, message: 'Đã thêm chương mới'})
                }).catch(error => console.log(error))
                updateComics(data.comicID, {status: 'Đã hoàn thành'})
                setStatus({isFinished: false, name: 'Chưa hoàn thành'})
            } else {
                setLoading({ chapter: true, image: true})
                createNewChapter(data, user.isAdmin, token).then( res => {
                    uploadImages()
                    fetchUnfinishedComic()
                    loadingComic(true)
                    setImages([])
                    setAlert({show: true, message: 'Đã thêm chương mới'})
                }).catch(error => console.log(error))
                setStatus({isFinished: false, name: 'Chưa hoàn thành'})
            }

            setError(false)
        } else {
            setError(true)
        }
        
    }

    const uploadImages = () => {

        setLoading(true)
        images.map((image) => {
            const storageRef = ref(storage, `comics/truyen${number}/chap${chapter}/${image.name}`)
            uploadBytes(storageRef, image).then((snapshot) => {
                setLoading({ chapter: false, image: false})
            })
        })
    }

    const handleChangeComic = (value) => {
        setThumbnail('')
        setComicID(value)
        setLoading({ chapter: true, image: true })
        for(let i = 0; i < comics.length; i++)
            if(comics[i]._id === value) {
                setNumber(comics[i].number)
                getDownloadURL(ref(storage, `comics/truyen${comics[i].number}/${comics[i].thumbnail}`))
                    .then(url => {
                        setLoading({ ...loading, image: false })
                        setThumbnail(url)
                    })
                    .catch((error) => console.log(error))
            }
        fetchQuantityChapter(value)
    }

    return (
        <>
        <Alert status={alert.show} message={alert.message}/>
        <div className="add-comic">
            <div className="image-current-comic">
                { thumbnail ? <img src={thumbnail} alt="higico"/>: 
                    <div className="loading">
                        <img src={loadingImage} alt="loading"/>
                    </div> 
                }
            </div>
            <div className="input-item">
                <label>Chọn truyện :</label>
                { comics.length > 0 && <select value={comicID} onChange={(e) => handleChangeComic(e.target.value)}>
                    {comics.map(comic => (<option key={comic._id} value={comic._id}>{comic.title}</option>))}
                </select>}
            </div>

            <div className="input-item">
                <label>Chương :</label>
                <input type="number" min={1} value={chapter} readOnly onChange={(e) => setChapter(e.target.value)}/>
            </div>
            
            <div className="input-radio-item">
                <label>Chưa hoàn thành :</label>
                <input type="radio" checked={!status.isFinished} onChange={() => setStatus({isFinished: false, name: 'Chưa hoàn thành'})}/>
                <label>Đã hoàn thành :</label>
                <input type="radio" checked={status.isFinished} onChange={() => setStatus({isFinished: true, name: 'Đã hoàn thành'})}/>
            </div>
            
            <input type="file" accept="image/*" onChange={handleChangeImage} multiple/>

            <span>(*) : Không được bỏ trống!</span>
            {error && <span>Vui lòng không bỏ trống!</span>}
            <button >
            { (!loading.chapter && !loading.image) ? <span onClick={handleSubmit}>Thêm</span> :
                <div className="spinner-border spinner-border-sm text-warning" role="status"/> }
            </button>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        chapters: state.comic.quantityChapter,
        comics: state.comic.comics,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        fetchQuantityChapter : (comicID) => {
            dispatch(actFetchQuantityChapter(comicID))
        },
        fetchUnfinishedComic : () => {
            dispatch(actFetchUnfinishedComic())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChapterForm)
