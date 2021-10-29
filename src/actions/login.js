import { LOGIN } from "utils/constants"

export const login = (status) => {
    return {
        type: LOGIN,
        payload: status
    }
}