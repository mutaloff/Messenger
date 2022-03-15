import { UserAPI } from "../api"
import { createContacts, searchContact } from "./actions"
import { CREATECONTACT, SEARCHCONTACT, SETSUBSCRIPTION, UPDATELEAVINGTIME, RESETMESSAGECOUNT, ADDTOFOLDERS } from "./types"


const initialState = {
    contacts: [],
    subscription: false,
}

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATECONTACT:
            return {
                ...state,
                contacts: action.payload
            }
        case SETSUBSCRIPTION:
            return {
                ...state,
                subscription: action.payload
            }
        case UPDATELEAVINGTIME:
            return {
                ...state,
                contacts: changeLeavingTime(state.contacts, action.payload)
            }
        case SEARCHCONTACT:
            return {
                ...state,
                contacts: action.payload
            }
        case RESETMESSAGECOUNT:
            return {
                ...state,
                contacts: setMessageCountZero(state.contacts, action.payload)
            }
        default:
            return state
    }
}

export const changeLeavingTime = (contacts, login) => {
    return contacts.map(contact => {
        if (contact.login === login) {
            contact.last_entrance = Date.now()
        }
        return contact
    })
}

export const setMessageCountZero = (contacts, login) => {
    return contacts.map(contact => {
        if (contact.login === login) {
            contact.messages_count = 0
        }
        return contact
    })
}

export const getContacts = (login) => {
    return (dispatch) => {
        UserAPI.getContacts(login).then(data => dispatch(createContacts(data)))
    }
}

export const addUser = (userData) => {
    UserAPI.addUser(userData.login, userData.password, userData.firstname, userData.lastname)
}

export const searchUser = (login) => {
    return (dispatch) => {
        UserAPI.searchUser(login).then(data => dispatch(searchContact(data)))
    }
}