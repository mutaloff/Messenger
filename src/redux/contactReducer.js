import { UserAPI } from "../api"
import { createContacts, searchContact } from "./actions"
import { CREATECONTACT, SEARCHCONTACT } from "./types"


const initialState = {
    contacts: []
}

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATECONTACT:
            return {
                ...state,
                contacts: action.payload
            }
        case SEARCHCONTACT:
            return {
                ...state,
                contacts: action.payload
            }
        default:
            return state
    }
}

export const getContacts = (login) => {
    return (dispatch) => {
        UserAPI.getContacts(login).then(data => dispatch(createContacts(data)));
    }
}


export const addUser = (userData) => {
    return (dispatch) => {
        UserAPI.addUser(userData.login, userData.password, userData.firstname, userData.lastname)
    }
}

export const searchUser = (login) => {
    return (dispatch) => {
        UserAPI.searchUser(login).then(data => dispatch(searchContact(data)))
    }
}