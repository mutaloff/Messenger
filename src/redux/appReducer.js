import { SETPAGE, SETPOPUPOPTION, SETREADYHANDLERDATA, SETREADYPOINT } from "./types"

const initialState = {
    page: 'messages/',
    popupOption: null,
    readyPoint: false,
    readyData: null
}



export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETPAGE:
            return {
                ...state,
                page: action.payload
            }
        case SETPOPUPOPTION:
            return {
                ...state,
                popupOption: action.payload
            }
        case SETREADYPOINT:
            return {
                ...state,
                readyPoint: action.payload
            }
        case SETREADYHANDLERDATA:
            return {
                ...state,
                readyData: action.payload
            }
        default:
            return state
    }
}
