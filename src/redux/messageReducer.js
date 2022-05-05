import { SENDMESSAGE, CURRENTRECEIVER, GETMESSAGES, GETMESSAGESCOUNT, SETASSIGNMENTDONE, GETASSIGNMENT, GETSPAM } from "./types";
import { SETMESSAGEFETCHING, SETMESSAGESREAD, SETRECEIVERMESSAGECOUNT, DELETEMESSAGES, SENDASSIGNMENT, SETSPAMFALSE } from "./types"
import { MessageAPI, UserAPI } from "../api"
import { getUserAssignment, getUserMessages, getUserSpam, resetEmail, setCurrentReceiver, setMessageFetching, setMessagesCount } from "./actions"
import { getContacts } from "./contactReducer"

const initialState = {
    messages: [],
    assignments: [],
    spams: [],
    senderFirstname: null,
    receiver: null,
    receiverMessageCount: 0,
    totalCount: 0,
    unreadMessages: [],
    isMessagesFetching: false
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SENDMESSAGE:
            return {
                ...state,
                messages: [action.payload, ...state.messages]
            }
        case SENDASSIGNMENT:
            return {
                ...state,
                assignments: [action.payload, ...state.assignments]
            }
        case CURRENTRECEIVER:
            return {
                ...state,
                receiver: action.payload
            }
        case GETMESSAGES:
            return {
                ...state,
                messages: action.payload.toAdd ? [...state.messages, ...action.payload.text] : action.payload.text,
            }
        case GETASSIGNMENT:
            return {
                ...state,
                assignments: action.payload.text
            }
        case GETSPAM:
            return {
                ...state,
                spams: action.payload.text
            }
        case GETMESSAGESCOUNT:
            return {
                ...state,
                totalCount: action.payload
            }
        case SETMESSAGESREAD:
            return {
                ...state,
                messages: setAllMessagesRead(state.messages)
            }
        case SETMESSAGEFETCHING:
            return {
                ...state,
                isMessagesFetching: action.payload
            }
        case SETRECEIVERMESSAGECOUNT:
            return {
                ...state,
                receiverMessageCount: action.payload
            }
        case DELETEMESSAGES:
            return {
                ...state,
                messages: filterMessages(state.messages, action.payload),
                assignments: filterMessages(state.assignments, action.payload)
            }
        case SETASSIGNMENTDONE:
            return {
                ...state,
                messages: setDone(state.messages, action.payload.id, action.payload.condition),
                assignments: setDone(state.assignments, action.payload.id, action.payload.condition)
            }
        case SETSPAMFALSE:
            return {
                ...state,
                messages: addMessageSpam(state.messages, action.payload.spam),
                spams: state.spams.filter(spam => spam.id !== action.payload.spam.id)
            }
        default:
            return state
    }
}

const filterMessages = (messages, id) => {
    return messages.filter(message => {
        if (!id.some(id => id == message.id)) {
            return message
        }
    })
}

const setDone = (messages, id, condition) => {
    return messages.map(message => {
        if (message.id == id) {
            message.is_done = condition
        }
        return message
    })
}

const addMessageSpam = (messages, spam) => {
    spam.is_spam = 0
    for (let i = 0; i < messages.length; i++) {
        if (spam.id > messages[i].id) {
            messages.splice(i, 0, spam);
            return messages
        }
    }
    messages.push(spam)
    return messages

}

export const getAssignment = (sender, receiver) => {
    return (dispatch) => {
        MessageAPI.getAssignment(sender, receiver)
            .then(data => {
                dispatch(getUserAssignment(data))
            })
    }
}
export const getMessages = (sender, receiver, page, toAdd, limit, searchText, isSpam) => {
    return (dispatch) => {
        MessageAPI.getMessages(sender, receiver, page, limit, searchText, isSpam)
            .then(data => {
                if (isSpam) {
                    dispatch(getUserSpam(data.messages.filter(message => (message.sender_login === sender)).filter(message => !message.email || message.is_spam)))
                } else {
                    dispatch(getUserMessages(data.messages.filter(message => !message.is_spam), toAdd))
                }
            })
            .then(data => {
                dispatch(setMessageFetching(false))
            })
    }
}

export const setAllMessagesRead = (messages) => {
    return messages.map(message => {
        message.is_read = 1
        return message
    })
}

export const setMessage = (sender, receiver, text) => {
    return (dispatch) => {
        MessageAPI.setMessage(sender, receiver, text)
            .then(data => {
                dispatch(getContacts(sender))
            });
    }
}

export const setAssignment = (sender, receiver, name, text, term) => {
    return (dispatch) => {
        MessageAPI.setAssignment(sender, receiver, name, text, term)
            .then(data => {
                dispatch(getContacts(sender))
            });
    }
}

export const setReadMessages = (senderLogin, receiverlogin) => {
    return (dispatch) => {
        MessageAPI.setReadMessages(senderLogin, receiverlogin)
    }
}

export const setReceiver = (receiverlogin) => {
    return (dispatch) => {
        UserAPI.getUser(receiverlogin).then(data => {
            dispatch(setCurrentReceiver(data))
        })
    }
}
