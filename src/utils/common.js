// export const getUser = () => {
//     const userStr = localStorage.getItem('user')
//     if(userStr) return JSON.parse(userStr)
//     else return null
// }

export const getToken = () => {
    return localStorage.getItem('accessToken') || null
}

export const setUserSession = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
}

export const removeUserSession = () => {
    localStorage.removeItem('accessToken')
}