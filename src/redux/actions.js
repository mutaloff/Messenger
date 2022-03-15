import { CURRENTRECEIVER, GETMESSAGES, SEARCHCONTACT, SENDMESSAGE, GETMESSAGESCOUNT, SETMESSAGESREAD, SETPOPUPOPTION, RESETMESSAGECOUNT, SETRECEIVERMESSAGECOUNT, ADDTOFOLDERS, SETREADYPOINT, SETREADYHANDLERDATA } from "./types";
import { CREATECONTACT, AUTHCONTACT, LOGOUTCONTACT, CHECKCONTACT, SETSUBSCRIPTION } from "./types";
import { GETUSERINFORMATION, SETPAGE, UPDATELEAVINGTIME, SETMESSAGEFETCHING } from "./types";

export function sendMessage(data) {
    return {
        type: SENDMESSAGE,
        payload: data
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

export function getUserMessages(text, toAdd) {
    return {
        type: GETMESSAGES,
        payload: { text, toAdd }
    }
}

export function setMessagesCount(page) {
    return {
        type: GETMESSAGESCOUNT,
        payload: page
    }
}

export function getUserInfo(data) {
    return {
        type: GETUSERINFORMATION,
        payload: data
    }
}

export function setPage(page) {
    return {
        type: SETPAGE,
        payload: page
    }
}

export function updateLeavingTime(login) {
    return {
        type: UPDATELEAVINGTIME,
        payload: login
    }
}

export function setUserSubscription(subscription) {
    return {
        type: SETSUBSCRIPTION,
        payload: subscription
    }
}

export function setMessageFetching(isFetching) {
    return {
        type: SETMESSAGEFETCHING,
        payload: isFetching
    }
}

export function setMessagesRead() {
    return {
        type: SETMESSAGESREAD
    }
}

export function setPopupOption(option) {
    return {
        type: SETPOPUPOPTION,
        payload: option
    }
}

export function resetMessageCount(login) {
    return {
        type: RESETMESSAGECOUNT,
        payload: login
    }
}

export function setReceiverMessageCount(count) {
    return {
        type: SETRECEIVERMESSAGECOUNT,
        payload: count
    }
}

export function setReadyPoint(isReady) {
    return {
        type: SETREADYPOINT,
        payload: isReady
    }
}

export function setReadyData(data) {
    return {
        type: SETREADYHANDLERDATA,
        payload: data
    }
}