import { SENDMESSAGE, CURRENTRECEIVER, GETMESSAGES, GETMESSAGESCOUNT, SETMESSAGEFETCHING, SETMESSAGESREAD, RESETMESSAGECOUNT, SETRECEIVERMESSAGECOUNT } from "./types"
import { MessageAPI, UserAPI } from "../api"
import { getUserMessages, setCurrentReceiver, setMessageFetching, setMessagesCount } from "./actions"
import { getContacts } from "./contactReducer"

const initialState = {
    messages: [],
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
        case CURRENTRECEIVER:
            return {
                ...state,
                receiver: action.payload
            }
        case GETMESSAGES:
            return {
                ...state,
                messages: action.payload.toAdd ? [...state.messages, ...action.payload.text] : action.payload.text
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
        default:
            return state
    }
}

export const getMessages = (sender, receiver, page, toAdd, limit) => {
    return (dispatch) => {
        MessageAPI.getMessages(sender, receiver, page, limit)
            .then(data => {
                dispatch(setMessagesCount(data.totalCount))
                dispatch(getUserMessages(data.messages, toAdd))
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
