import { CURRENTRECEIVER, GETMESSAGES, SEARCHCONTACT, SENDMESSAGE, GETMESSAGESCOUNT, SETMESSAGESREAD, SENDASSIGNMENT } from "./types";
import { RESETUSERAVATAR, DELETEMESSAGES, RESETUSEREMAILRECEIVE, SETASSIGNMENTDONE, GETASSIGNMENT, GETSPAM, SETSPAMFALSE, } from "./types";
import { CREATECONTACT, AUTHCONTACT, LOGOUTCONTACT, CHECKCONTACT, SETSUBSCRIPTION, RESETUSEREMAIL, RESETUSERISPRIVATE } from "./types";
import { GETUSERINFORMATION, SETPAGE, UPDATELEAVINGTIME, SETMESSAGEFETCHING, RESETUSERSTATUS, RESETUSEREMAILPASSWORD } from "./types";
import { SETPOPUPOPTION, RESETMESSAGECOUNT, SETRECEIVERMESSAGECOUNT, SETREADYPOINT, SETREADYHANDLERDATA, SETIMPORTANCE } from "./types";
import { SETREGISTRATION, ENTRYERROR } from "./types";

export function sendMessage(data) {
    return {
        type: SENDMESSAGE,
        payload: data
    }
}

export function sendAssignment(data) {
    return {
        type: SENDASSIGNMENT,
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

export function getUserAssignment(text) {
    return {
        type: GETASSIGNMENT,
        payload: { text }
    }
}

export function getUserSpam(text) {
    return {
        type: GETSPAM,
        payload: { text }
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

export function resetImportance(login, importance) {
    return {
        type: SETIMPORTANCE,
        payload: { login, importance }
    }
}

export function resetAvatar(avatar) {
    return {
        type: RESETUSERAVATAR,
        payload: avatar
    }
}

export function resetEmail(email) {
    return {
        type: RESETUSEREMAIL,
        payload: email
    }
}

export function resetEmailPassword(emailPassword) {
    return {
        type: RESETUSEREMAILPASSWORD,
        payload: emailPassword
    }
}

export function resetEmailReceive(emailReceive) {
    return {
        type: RESETUSEREMAILRECEIVE,
        payload: emailReceive
    }
}

export function resetIsPrivate(isPrivate) {
    return {
        type: RESETUSERISPRIVATE,
        payload: isPrivate
    }
}

export function resetStatus(status) {
    return {
        type: RESETUSERSTATUS,
        payload: status
    }
}

export function deleteMessages(id) {
    return {
        type: DELETEMESSAGES,
        payload: id
    }
}

export function setAssignmentDone(id, condition) {
    return {
        type: SETASSIGNMENTDONE,
        payload: { id, condition }
    }
}

export function setSpamFalse(spam) {
    return {
        type: SETSPAMFALSE,
        payload: { spam }
    }
}

export function setRegistration() {
    return {
        type: SETREGISTRATION
    }
}

export function setEntryError(condition) {
    return {
        type: ENTRYERROR,
        payload: { condition }
    }
}