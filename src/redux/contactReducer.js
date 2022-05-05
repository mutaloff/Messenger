import { UserAPI } from "../api"
import { createContacts, searchContact } from "./actions"
import { CREATECONTACT, SEARCHCONTACT, SETSUBSCRIPTION, UPDATELEAVINGTIME, RESETMESSAGECOUNT, SETIMPORTANCE } from "./types"


const initialState = {
    contacts: [],
    subscription: false,
    isSearching: false
}

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATECONTACT:
            return {
                ...state,
                contacts: action.payload,
                isSearching: false
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
                contacts: action.payload,
                isSearching: true
            }
        case RESETMESSAGECOUNT:
            return {
                ...state,
                contacts: setMessageCountZero(state.contacts, action.payload)
            }
        case SETIMPORTANCE:
            return {
                ...state,
                contacts: setContactImportance(state.contacts, action.payload.login, action.payload.importance)
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

export const setContactImportance = (contacts, login, importance) => {
    return contacts.map(contact => {
        if (contact.login === login) {
            contact.importance = importance
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

export const searchUser = (login) => {
    return (dispatch) => {
        UserAPI.searchUser(login).then(data => dispatch(searchContact(data)))
    }
}

export const searchLabels = (login, label) => {
    return (dispatch) => {
        UserAPI.searchLabels(login, label).then(data => dispatch(searchContact(data)))
    }
}