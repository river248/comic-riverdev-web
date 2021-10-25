import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import naruto from 'resources/naruto.png'

import './Login.scss'
function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const emailInputRef = useRef(null)
    const loginContainerRef = useRef(null)
    const loginBoxRef = useRef(null)
    const [error, setError] = useState({status: false, message: ''})

    const history = useHistory()

    const handleSubmit = () => {
        if(email === '' || password === '') {
            setError({status: true, message: 'Please fill in this form!'})
        } else
            if (password.length < 8) setError({status: true, message: 'Pasword must least 8 characters!'})
            else {

                loginBoxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
                loginContainerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
                setTimeout(() => {
                    props.history.push('/home')
                }, 1400)

            }

    }

    const handleGoBack = () => {
        loginBoxRef.current.style.setProperty('animation', 'slideUpDisappear 0.5s ease-in forwards')
        loginContainerRef.current.style.setProperty('animation', 'slideDownDisappear 0.5s ease-in 0.5s forwards')
        setTimeout(() => {
            history.goBack()
        }, 1000)
    }

    return (
        <div className="login-page-container" ref={loginContainerRef}>
            <div className="fake-container" onClick={handleGoBack}/>
            <img src={naruto} alt='naruto' className="image-naruto"/>
            <div className="login-box" ref={loginBoxRef}>
                <span>Login</span>
                <div className="user-box">
                    <input type="email" ref={emailInputRef} value={email} onChange={e => setEmail(e.target.value)}/>
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}/>
                    <label>Password</label>
                    { (!showPassword && password) && <BsFillEyeFill onClick={() => setShowPassword(true)}/> }
                    { showPassword && <BsFillEyeSlashFill onClick={() => setShowPassword(false)}/>}
                </div>
                { error.status && <span className="login-error">{error.message}</span> }
                <button onClick={handleSubmit}>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login
