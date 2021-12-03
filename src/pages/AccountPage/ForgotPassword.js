import { fetchForgotPassword } from 'actions/ApiCall/userAPI'
import React, { useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { validateEmail } from 'utils/validateEmail'
import './Signup.scss'
import Alert from 'components/Alert/Alert'
import Footer from 'components/Footer/Footer'

function ForgotPassword() {

    const [email, setEmail] = useState('')
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

    const handleSubmit = () => {
        setLoading(true)
        setAlert({show: false, message: ''})
        const validate = validateEmail(email)
        if (!validate) {
            setError({status: true, message: 'Invalid Email!'})
            setLoading(false)
        } else {
            fetchForgotPassword({email: email}).then(res => {
                setLoading(false)
                setAlert({show: true, message: 'Vui lòng check mail để lấy mật khẩu!'})
                setEmail('')
                setTimeout(() => {
                    history.push('/login')
                }, 4000)
            }).catch(err => {
                setError({status: true, message: err.response.data})
                setLoading(false)
            })
        }

    }

    return (
        <>
        <Alert status={alert.show} message={alert.message}/>
        <div className="register-page-container " ref={signupContainerRef}>
            <div className="fake-container" onClick={handleGoBack}/>
            <div className="register-box forgot-password-box" ref={signupBoxRef}>
                <span>Forgot Password</span>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' required/>
                { error.status && <span className="register-error">{error.message}</span> }
                <Link to="/login">Go Back</Link>
                { !loading && <button onClick={handleSubmit}>
                    Send
                </button> }
                { loading && <Spinner animation="border" variant="warning"/>}
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default ForgotPassword
