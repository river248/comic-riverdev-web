/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { Link, useHistory } from 'react-router-dom'
import naruto from 'resources/naruto.png'

import './Login.scss'
import { fetchGoogleLogin, fetchLogin } from 'actions/ApiCall/userAPI'
import { setUserSession } from 'utils/common'
import { Spinner } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import { validateEmail } from 'utils/validateEmail'

function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const emailInputRef = useRef(null)
    const loginContainerRef = useRef(null)
    const loginBoxRef = useRef(null)
    const [error, setError] = useState({status: false, message: ''})

    const history = useHistory()

    const handleSubmit = () => {

        const validate = validateEmail(email)
        setLoading(true)
        if (!validate) {
            setError({
                status: true,
                message: 'Invalid Email!'
            })
            setLoading(false)
        } else {
            const data = {email: email, password: password}
            fetchLogin(data).then(response => {

                setUserSession(response.accessToken, response.refreshToken)
                loginBoxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                loginContainerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                setTimeout(() => {
                    props.history.push('/')
                    // window.location.reload()
                }, 1500)
                setLoading(false)
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

    }

    const handleGoBack = () => {
        loginBoxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
        loginContainerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
        setTimeout(() => {
            history.push('/')
        }, 1500)
    }

    const handleSuccessGoogleLogin = (res) => {
        const tokenId = res.tokenId
        const data = {tokenId: tokenId}
        setLoading(true)
        fetchGoogleLogin(data).then(response => {

            setUserSession(response.accessToken, response.refreshToken)
            loginBoxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
            loginContainerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
            setTimeout(() => {
                props.history.push('/')
            }, 1500)
            setLoading(false)
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

    const handleFailureGoogleLogin = () => {
        alert("Some errors were occur when login")
    }

    return (
        <div className="login-page-container" ref={loginContainerRef}>
            <div className="fake-container" onClick={handleGoBack}/>
            <img src={naruto} alt='naruto' className="image-naruto"/>
            <div className="login-box" ref={loginBoxRef}>
                <span>Log in</span>
                <div className="user-box">
                    <input ref={emailInputRef} value={email} onChange={e => setEmail(e.target.value)} required/>
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required/>
                    <label>Password</label>
                    { (!showPassword && password) && <BsFillEyeFill onClick={() => setShowPassword(true)}/> }
                    { showPassword && <BsFillEyeSlashFill onClick={() => setShowPassword(false)}/>}
                </div>
                { error.status && <span className="login-error">{error.message}</span> }
                <Link to="/forgot-password">Forgot password?</Link>
                <Link to="/register">Don't have account? Sign Up</Link>
                { !loading && <button className="login-btn" onClick={handleSubmit}>
                    <span/><span/><span/><span/>
                    Log in
                </button> }
                <GoogleLogin
                    clientId='630055118244-ct9llftpn800j7g70nlprjibbe2ea0la.apps.googleusercontent.com'
                    onSuccess={handleSuccessGoogleLogin}
                    onFailure={handleFailureGoogleLogin}
                    cookiePolicy={'single_host_origin'}
                    className="google-login-btn"/>
                { loading && <Spinner animation="border" variant="warning"/>}
            </div>
        </div>
    )
}

export default Login
