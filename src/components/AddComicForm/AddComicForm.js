/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { comicData } from 'utils/comicData'
import { storage} from 'firebase/index'
import { ref, uploadBytes } from 'firebase/storage'
import { loadingComic } from 'actions/loading'
import { createNewComic } from 'actions/ApiCall/adminAPI'
import Alert from 'components/Alert/Alert'

function AddComicForm(props) {

    const {
        token,
        nextComic,
        categories,
        loadingComic
    } = props
    const [thumbnail, setThumbnail] = useState(null)
    const [error, setError] = useState (false)
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ show: false, message: ''})

    const { id } = useParams()

    useEffect(() => {
        if(categories.length > 0 && nextComic > 0)
            loadingComic(false)
    }, [categories, nextComic])

    const handleChangeImage = e => {
        if (e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    }

    const handleSubmit = () => {
        setAlert({show: false, message: ''})
        setLoading(true)
        if(thumbnail && title && (tags.length > 0)) {
            setThumbnail(null)
            const data = comicData(title, tags, thumbnail.name, author, description)
            createNewComic(data, token).then(res => {
                uploadThumbnail()
            })
            setTitle('')
            setTags([])
            setAuthor('')
            setDescription('')
            setError(false)
        } else {
            setError(true)
        }
        
    }

    const uploadThumbnail = () => {
        setLoading(true)
        const storageRef = ref(storage, `comics/truyen${nextComic}/${thumbnail.name}`)
        uploadBytes(storageRef, thumbnail).then((snapshot) => {
            setAlert({show: true, message: 'Đã thêm truyện mới!'})
            setLoading(false)
        })
    }

    const handleChecked = (id) => {
        setTags(prev => {
            const isChecked = tags.includes(id)
            if(isChecked) {
                return tags.filter(tag => tag !== id)
            } else {
                return [...prev, id]
            }
        })
    }
    
    return (
        <>
        <Alert status={alert.show} message={alert.message}/>
        <div className="add-comic">
            <div className="input-item">
                <label>Tên truyện :</label>
                <input placeholder="Tên truyện (*)" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            { id === "new-comic" && <div className="input-item">
                <label>Thể loại :</label>
                <div className="list-tags-container">
                    { categories.map(category => 
                    <div key={category._id} className="list-tags">
                        <input type="checkbox" name={category._id} checked={tags.includes(category._id)} value={category._id} onChange={() => handleChecked(category._id)}/>
                        <label htmlFor={category._id}>{category.name}</label>
                    </div>)}
                </div>
            </div>}
            <div className="input-item">
                <label>Tác giả :</label>
                <input placeholder="Tác giả" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="input-item">
                <label>Mô tả :</label>
                <textarea placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <input type="file" accept="image/*" onChange={handleChangeImage}/>

            <span>(*) : Không được bỏ trống!</span>
            {error && <span>Vui lòng không bỏ trống!</span>}
            <button >
            { !loading ? <span onClick={handleSubmit}>Thêm</span> :
                <div className="spinner-border spinner-border-sm text-warning" role="status"/> }
            </button>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.comic.tags,
        token: state.user.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComicForm)
