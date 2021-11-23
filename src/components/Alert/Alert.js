import React, { useState, useEffect } from 'react'
import { Toast } from 'react-bootstrap'
import './Alert.scss'

function Alert({ status, message }) {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(status)
    }, [status, message])

    return (
        <Toast  onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    )
}

export default React.memo(Alert)
