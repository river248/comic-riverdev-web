import { GET_HEIGHT } from "utils/constants"

export const getHeightChange = (height) => {
    return {
        type: GET_HEIGHT,
        payload: height
    }
}