import { SETPAGE } from "./types"

const initialState = {
    page: 'messages/'
}



export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETPAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state
    }
}