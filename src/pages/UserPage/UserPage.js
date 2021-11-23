/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { fetchLogout, fetchResetPassword, updateUser } from 'actions/ApiCall/userAPI'
import { getToken, removeUserSession } from 'utils/common'
import { useHistory } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import { AiFillEdit, AiOutlineSend, AiTwotoneMail } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { storage} from 'firebase/index'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import './UserPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchFullUser } from 'actions/userAction'
import Alert from 'components/Alert/Alert'

function UserPage() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [show, setShow] = useState({name: false, password: false, avatar: false, icon: false})
    const [error, setError] = useState({ status: false, message: '' })
    const [error2, setError2] = useState({ status: false, message: '' })
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [alert, setAlert] = useState({ show: false, message: ''})

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const token = getToken()

    const hanldeLogout = () => {
        fetchLogout().then(response => {
            history.replace('/')
            removeUserSession()
        })
    }


    const handleChangeUsername = () => {
        setAlert({show: false, message: ''})
        if (username.length < 5 || username.length > 50)
            setError({status: true, message: '(*) Tên người dùng phải ít nhất 5 kí tự và không quá 50 ký tự !'})
        else
            if (user._id && token) {
                setError({status: true, message:'Đang cập nhật...'})
                setShow({...show, icon: false})
                updateUser(user._id, token, { name: username}).then(res => {
                    dispatch(actFetchFullUser(user._id, token))
                    setError({status: false, message:''})
                    setShow({...show, name: false})
                    setUserName('')
                    setAlert({show: true, message: 'Đổi tên thành công!'})
                })
            }
    }

    const handleChangeAvatar = () => {
        setAlert({show: false, message: ''})
        if(avatar) {
            uploadAvatar()
        }

    }

    const handleChangeImage = e => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    }

    const uploadAvatar = () => {
        setLoading(true)
        const storageRef = ref(storage, `users/${user.email}/${avatar.name}`)
        uploadBytes(storageRef, avatar).then((snapshot) => {
            console.log('Uploaded a blob or file!')
        }).then(() => {
            getDownloadURL(ref(storage, `users/${user.email}/${avatar.name}`))
                .then(url => {
                    updateUser(user._id, token, { avatar: url}).then(res => {
                        setLoading(false)
                        setShow({...show, avatar: false})
                        dispatch(actFetchFullUser(user._id, token))
                        setAlert({show: true, message: 'Đổi ảnh đại diện thành công!'})
                    })
                })
                .catch((error) => console.log(error))
            })
    }

    const handleChangPassword = () => {
        setAlert({show: false, message: ''})
        if(password.length < 8)
            setError2({ status: true, message: 'Mật khẩu phải có ít nhất 8 kí tự!'})
        if(password !== confirmPassword) {
            setError2({ status: true, message: 'Xác nhận mật khẩu không trùng khớp!'})
        }
            
        if(password.length > 7 && password === confirmPassword) {
            setError2({ status: false, message: ''})
            setLoading2(true)
            fetchResetPassword(user._id, {password: password, confirmPassword: confirmPassword}, token)
                .then(res => {
                    dispatch(actFetchFullUser(user._id, token))
                    setLoading2(false)
                    setPassword('')
                    setConfirmPassword('')
                    setShow({...show, password: false})
                    setAlert({show: true, message: 'Đổi mật khẩu thành công!'})
                })
        }
    }

    const handleShowChange = (value) => {
        setAlert({show: false, message: ''})
        if(value === 1)
            setShow({...show, avatar: true})
        if(value === 2)
            setShow({...show, name: true, icon: true})
        if(value === 3)
            setShow({...show, password: true})
    }
    return (
        <Container>
            <Alert status={alert.show} message={alert.message}/>
            <Row>
                <h1 className="user-page-title">Thông Tin Người Dùng</h1>
            </Row>
            <Row className="row-user-page">
                <div className="user-page-avatar">
                    <img src={user.avatar} alt="avatar"/>
                    { !show.avatar && <AiFillEdit onClick={() => handleShowChange(1)}/>}
                </div>
                { (show.avatar && !loading) && <> <input type="file" accept="image/*" className="change-avatar" required onChange={handleChangeImage}/>
                <button className="change-password-btn-2" onClick={handleChangeAvatar}>Đổi</button>
                <button className="change-password-btn-3" onClick={() => setShow({...show, avatar: false})}>Hủy</button> </> }
                { loading && <span className="error-message">Đang cập nhật...</span>}
            </Row>
            <Row>
                <div className="user-page-user-info">
                    <FaUserAlt className="user-icon"/>
                    <span className="user-label">Tên người dùng: </span>
                    { !show.name ?
                        <span className="user-page-username">{user.name}<AiFillEdit onClick={() => handleShowChange(2)}/></span>
                    : <>
                    <input placeholder="Tên mới" value={username} min={5} max={50} onChange={(e) => setUserName(e.target.value)}/>
                    { show.icon && <div className="username-icon">
                        <AiOutlineSend onClick={handleChangeUsername}/>
                        <MdCancel onClick={() => setShow({...show, name: false, icon: false})}/>
                    </div>}
                     </>}
                </div>
                { error.status && <span className="error-message">{error.message}</span>}
            </Row>
            <Row>
                <div className="user-page-user-info">
                    <span className="user-label">Email: </span>
                    <AiTwotoneMail className="user-icon"/>
                    <span>{user.email}</span>
                </div>
            </Row>
            <Row className="change-password-box">
                { !show.password && <button className="change-password-btn" onClick={() => handleShowChange(3)}>Đổi mật khẩu</button>}
                { (show.password && !loading) && <>
                <input className="change-password-inp" type="password" value={password} placeholder="Mật khẩu mới" onChange={(e) => setPassword(e.target.value)}/>
                <input className="change-password-inp" type="password" value={confirmPassword} placeholder="Xác nhận" onChange={(e) => setConfirmPassword(e.target.value)}/>
                { error2.status && <span className="error-message">{error2.message}</span>}
                <span className="change-password-txt">(*) Đổi mật khẩu sẽ không thể đăng nhặp bằng google được nữa !</span>
                <button className="change-password-btn-2" onClick={handleChangPassword}>Đổi</button>
                <button className="change-password-btn-3" onClick={() => setShow({...show, password: false})}>Hủy</button> </>}
                { loading2 && <span className="error-message">Đang cập nhật...</span>}
            </Row>
            <Row>
                <button onClick={hanldeLogout} className="logout-btn">
                    Đăng xuất
                </button>
            </Row>
        </Container>
    )
}

export default UserPage
