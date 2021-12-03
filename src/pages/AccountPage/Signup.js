/* eslint-disable react-hooks/exhaustive-deps */
import { fetchRegister } from 'actions/ApiCall/userAPI'
import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

import './Signup.scss'
import Alert from 'components/Alert/Alert'
import Footer from 'components/Footer/Footer'
function Signup() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({status: false, message: ''})
    const [alert, setAlert] = useState({ show: false, message: ''})

    const signupContainerRef = useRef(null)
    const signupBoxRef = useRef(null)
    const history = useHistory()


    const handleGoBack = () => {
        signupBoxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
        signupContainerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
        setTimeout(() => {
            history.push('/')
        }, 1500)
    }

    const handleRegister = () => {
        setAlert({show: false, message: ''})
        const data = { name: name, email: email, password: password, confirmPassword: confirmPassword }
        setLoading(true)
        fetchRegister(data).then(res => {
            setLoading(false)
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setName('')
            setError({
                status: false,
                message: ''
            })
            setAlert({show: true, message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận!'})
            setTimeout(() => {
                history.push('/login')
            }, 4000)
        }).catch(error => {
            setLoading(false)
            if(error.response.status === 401 || error.response.status === 400)
                setError({
                    status: true,
                    message: error.response.data.message
                })
            else
                setError({
                    status: true,
                    message: 'Something went wrong. Please try again later.'
                })
        })
    }
    
    return (
        <>
        <Alert status={alert.show} message={alert.message}/>
        <div className="register-page-container" ref={signupContainerRef}>
            <div className="fake-container" onClick={handleGoBack}/>
            <div className="register-box" ref={signupBoxRef}>
                <span>Sign up</span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' max={50} min={15} required/>
                <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' max={50} min={5} required/>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required/>
                <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm password' required/>
                { error.status && <span className="register-error">{error.message}</span> }
                <Link to="/login">Go Back</Link>
                { !loading && <button onClick={handleRegister}>
                    Sign up
                </button> }
                { loading && <Spinner animation="border" variant="warning"/>}
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Signup
