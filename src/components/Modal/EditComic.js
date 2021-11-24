/* eslint-disable react-hooks/exhaustive-deps */
import { updateComic } from 'actions/ApiCall/adminAPI'
import { actFetchDetailComic } from 'actions/comicAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from 'utils/common'
import { storage} from 'firebase/index'
import { ref, uploadBytes } from 'firebase/storage'

import './EditComic.scss'

function EditComic({content, setShowBox, comicID, number, valuePar}) {
    const [value, setValue] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [status, setStatus] = useState(valuePar)
    const [loading, setLoading] = useState(false)

    const token = getToken()
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(actFetchDetailComic(comicID))
            setValue('')
            setThumbnail(null)
            setLoading(false)
        }
    }, [])

    const handleChangeThumbail = e => {
        if (e.target.files[0]) {
            setValue('***')
            setThumbnail(e.target.files[0]);
        }
    }

    const uploadThumbnail = () => {
        setLoading(true)
        const storageRef = ref(storage, `comics/truyen${number}/${thumbnail.name}`)
        uploadBytes(storageRef, thumbnail).then((snapshot) => {
            setLoading(false)
            setShowBox(false)
        })
    }

    const handleSubmit = () => {
        if (value !== '' && value !== valuePar && user._id && token) {
            setLoading(true)
            let data = null
            switch (content) {
                case 'Tên truyện':
                    data = { title: value }
                    break
                case 'Tác giả':
                    data = { author: value }
                    break
                case 'Trạng thái':
                    data = { status: status }
                    break
                case 'Mô tả':
                    data = { description: value }
                    break
                case 'Ảnh':
                    data = { thumbnail: thumbnail.name }
                    break
                default:
                    break
            }
            updateComic(comicID, user.isAdmin, data, token).then(res => {
                if (content === 'Ảnh')
                    uploadThumbnail()
                else
                    setShowBox(false)
            })
        }
    }

    return (
        <div className="edit-comic-container">
            <div className="edit-comic-modal-box">
                <h1>{content}</h1>
                { (content !== 'Ảnh' && content !== 'Trạng thái') && <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={`${content}`}/>}
                { content === 'Ảnh' && <input type="file" accept="image/*" onChange={handleChangeThumbail}/>}
                { content === 'Trạng thái' && 
                <div className="input-radio-item">
                    <label>Chưa hoàn thành :</label>
                    <input type="radio" checked={status === 'Chưa hoàn thành' ? true : false} onChange={() => {setStatus('Chưa hoàn thành'); setValue('Chưa hoàn thành')}}/>
                    <label>Đã hoàn thành :</label>
                    <input type="radio" checked={status === 'Đã hoàn thành' ? true : false} onChange={() => {setStatus('Đã hoàn thành'); setValue('Đã hoàn thành')}}/>
                </div>}
                { !loading ? <div className="button-container">
                    <button onClick={handleSubmit}>Sửa</button>
                    <button onClick={() => setShowBox(false)}>Hủy</button>
                </div> :
                <span>Đang cập nhật...</span>}
            </div>
        </div>
    )
}

export default EditComic
