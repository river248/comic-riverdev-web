import React, { useEffect, useState } from 'react'
import { fetchFullUser, fetchLogout } from 'actions/ApiCall/userAPI'
import jwtDecode from 'jwt-decode'
import { getToken, removeUserSession } from 'utils/common'
import { useHistory } from 'react-router-dom'

function UserPage() {

    const [userInfo, setUserInfo] = useState({name: ''})
    const history = useHistory()

    useEffect(() => {
        const token = getToken()
        const userData = jwtDecode(token)
        fetchFullUser(userData.data._id, token).then(user =>
            setUserInfo(user)
        )
    }, [])

    const hanldeLogout = () => {
        fetchLogout().then(response => {
            history.replace('/')
            removeUserSession()
            window.location.reload()
            alert(response.message)
        })
    }
    return (
        <div>
            <button onClick={hanldeLogout}>Logout</button>
            {userInfo.name}
        </div>
    )
}

export default UserPage
