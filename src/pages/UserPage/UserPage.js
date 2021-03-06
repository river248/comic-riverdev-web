/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
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
import { connect } from 'react-redux'
import { actFetchFullUser } from 'actions/userAction'
import Alert from 'components/Alert/Alert'
import { loadingComic } from 'actions/loading'
import Footer from 'components/Footer/Footer'

function UserPage(props) {

    const {
        user,
        loadingComic, fetchFullUser
    } = props
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

    const history = useHistory()
    const token = getToken()

    useEffect(() => {
        loadingComic(true)
        if (user._id && token)
            loadingComic(false)

    }, [user])

    const hanldeLogout = () => {
        fetchLogout().then(response => {
            history.replace('/')
            removeUserSession()
        })
    }


    const handleChangeUsername = () => {
        setAlert({show: false, message: ''})
        if (username.length < 5 || username.length > 50)
            setError({status: true, message: '(*) T??n ng?????i d??ng ph???i ??t nh???t 5 k?? t??? v?? kh??ng qu?? 50 k?? t??? !'})
        else
            if (token) {
                setError({status: true, message:'??ang c???p nh???t...'})
                setShow({...show, icon: false})
                updateUser(token, { name: username}).then(res => {
                    fetchFullUser(token)
                    setError({status: false, message:''})
                    setShow({...show, name: false})
                    setUserName('')
                    setAlert({show: true, message: '?????i t??n th??nh c??ng!'})
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
                    updateUser(token, { avatar: url}).then(res => {
                        setLoading(false)
                        setShow({...show, avatar: false})
                        fetchFullUser(token)
                        setAlert({show: true, message: '?????i ???nh ?????i di???n th??nh c??ng!'})
                    })
                })
                .catch((error) => console.log(error))
            })
    }

    const handleChangPassword = () => {
        setAlert({show: false, message: ''})
        if(password.length < 8 || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
            setError2({ status: true, message: 'M???t kh???u ph???i c?? ??t nh???t 8 k?? t???, 1 ch??? hoa, 1 ch??? th?????ng, 1 ch??? s??? v?? 1 k?? t??? ?????c bi???t!'})
        if(password !== confirmPassword) {
            setError2({ status: true, message: 'X??c nh???n m???t kh???u kh??ng tr??ng kh???p!'})
        }
            
        if(password.length > 7 && password === confirmPassword && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            setError2({ status: false, message: ''})
            setLoading2(true)
            fetchResetPassword({password: password, confirmPassword: confirmPassword}, token)
                .then(res => {
                    fetchFullUser(token)
                    setLoading2(false)
                    setPassword('')
                    setConfirmPassword('')
                    setShow({...show, password: false})
                    setAlert({show: true, message: '?????i m???t kh???u th??nh c??ng!'})
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
        <>
        <Container>
            <Alert status={alert.show} message={alert.message}/>
            <Row>
                <h1 className="user-page-title">Th??ng Tin Ng?????i D??ng</h1>
            </Row>
            <Row className="row-user-page">
                <div className="user-page-avatar">
                    <img src={user.avatar} alt="avatar"/>
                    { !show.avatar && <AiFillEdit onClick={() => handleShowChange(1)}/>}
                </div>
                { (show.avatar && !loading) && <> <input type="file" accept="image/*" className="change-avatar" required onChange={handleChangeImage}/>
                <button className="change-password-btn-2" onClick={handleChangeAvatar}>?????i</button>
                <button className="change-password-btn-3" onClick={() => setShow({...show, avatar: false})}>H???y</button> </> }
                { loading && <span className="error-message">??ang c???p nh???t...</span>}
            </Row>
            <Row>
                <div className="user-page-user-info">
                    <FaUserAlt className="user-icon"/>
                    <span className="user-label">T??n ng?????i d??ng: </span>
                    { !show.name ?
                        <span className="user-page-username">{user.name}<AiFillEdit onClick={() => handleShowChange(2)}/></span>
                    : <>
                    <input placeholder="T??n m???i" value={username} min={5} max={50} onChange={(e) => setUserName(e.target.value)}/>
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
                { !show.password && <button className="change-password-btn" onClick={() => handleShowChange(3)}>?????i m???t kh???u</button>}
                { (show.password && !loading) && <>
                <input className="change-password-inp" type="password" value={password} placeholder="M???t kh???u m???i" onChange={(e) => setPassword(e.target.value)}/>
                <input className="change-password-inp" type="password" value={confirmPassword} placeholder="X??c nh???n" onChange={(e) => setConfirmPassword(e.target.value)}/>
                { error2.status && <span className="error-message">{error2.message}</span>}
                <span className="change-password-txt">(*) ?????i m???t kh???u s??? kh??ng th??? ????ng nh???p b???ng google ???????c n???a !</span>
                <button className="change-password-btn-2" onClick={handleChangPassword}>?????i</button>
                <button className="change-password-btn-3" onClick={() => setShow({...show, password: false})}>H???y</button> </>}
                { loading2 && <span className="error-message">??ang c???p nh???t...</span>}
            </Row>
            <Row>
                <button onClick={hanldeLogout} className="logout-btn">
                    ????ng xu???t
                </button>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingComic : (status) => {
            dispatch(loadingComic(status))
        },
        fetchFullUser : (token) => {
            dispatch(actFetchFullUser(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
