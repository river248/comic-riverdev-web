// export const getUser = () => {
//     const userStr = localStorage.getItem('user')
//     if(userStr) return JSON.parse(userStr)
//     else return null
// }

export const getToken = () => {
    return localStorage.getItem('accessToken') || null
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken') || null
}

export const setUserSession = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}

export const removeUserSession = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}