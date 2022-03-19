import { SETPAGE, SETPOPUPOPTION, SETREADYHANDLERDATA, SETREADYPOINT } from "./types"

const initialState = {
    page: window.location.href.substring((window.location.origin + window.location.pathname).length).split('/')[1] + '/',
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
