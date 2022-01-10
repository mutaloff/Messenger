import { CURRENTRECEIVER, GETMESSAGES, SEARCHCONTACT, SENDMESSAGE } from "./types";
import { CREATECONTACT, AUTHCONTACT, LOGOUTCONTACT, CHECKCONTACT } from "./types";

export function sendMessage(text) {
    return {
        type: SENDMESSAGE,
        payload: text
    }
}


export function createContacts(contacts) {
    return {
        type: CREATECONTACT,
        payload: contacts
    }
}


export function authContact(login) {
    return {
        type: AUTHCONTACT,
        payload: login
    }
}

export function logoutContact() {
    return {
        type: LOGOUTCONTACT,
    }
}

export function checkContact(login) {
    return {
        type: CHECKCONTACT,
        payload: login
    }
}

export function searchContact(login) {
    return {
        type: SEARCHCONTACT,
        payload: login
    }
}

export function setCurrentReceiver(receiverData) {
    return {
        type: CURRENTRECEIVER,
        payload: receiverData
    }
}

export function getUserMessages(text) {
    return {
        type: GETMESSAGES,
        payload: text
    }
}

