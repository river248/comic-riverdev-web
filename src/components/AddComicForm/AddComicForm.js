/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { comicData } from 'utils/comicData'
import { storage} from 'firebase/index'
import { ref, uploadBytes } from 'firebase/storage'
import { loadingComic } from 'actions/loading'
import { getToken } from 'utils/common'
import { createNewComic } from 'actions/ApiCall/adminAPI'
import Alert from 'components/Alert/Alert'

function AddComicForm(props) {

    const {
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


    const token = getToken()
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
            setAlert({show: true, message: '???? th??m truy???n m???i!'})
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
                <label>T??n truy???n :</label>
                <input placeholder="T??n truy???n (*)" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            { id === "new-comic" && <div className="input-item">
                <label>Th??? lo???i :</label>
                <div className="list-tags-container">
                    { categories.map(category => 
                    <div key={category._id} className="list-tags">
                        <input type="checkbox" name={category._id} checked={tags.includes(category._id)} value={category._id} onChange={() => handleChecked(category._id)}/>
                        <label htmlFor={category._id}>{category.name}</label>
                    </div>)}
                </div>
            </div>}
            <div className="input-item">
                <label>T??c gi??? :</label>
                <input placeholder="T??c gi???" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="input-item">
                <label>M?? t??? :</label>
                <textarea placeholder="M?? t???" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <input type="file" accept="image/*" onChange={handleChangeImage}/>

            <span>(*) : Kh??ng ???????c b??? tr???ng!</span>
            {error && <span>Vui l??ng kh??ng b??? tr???ng!</span>}
            <button >
            { !loading ? <span onClick={handleSubmit}>Th??m</span> :
                <div className="spinner-border spinner-border-sm text-warning" role="status"/> }
            </button>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.comic.tags,
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
