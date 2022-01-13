import { SENDMESSAGE, CURRENTRECEIVER, GETMESSAGES, GETUNREADMESSAGESCOUNT, UPDATEUNREADMESSAGES } from "./types"
import { MessageAPI } from "../api"
import { getUserMessages } from "./actions"

const initialState = {
    messages: [],
    receiver: null,
    unreadMessages: []
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
                messages: action.payload
            }

        default:
            return state
    }
}

export const getMessages = (sender, receiver) => {
    return (dispatch) => {
        MessageAPI.getMessages(sender, receiver).then(data => {
            dispatch(getUserMessages(data))
        });
    }
}

export const setMessage = (sender, receiver, text) => {
    return (dispatch) => {
        MessageAPI.setMessage(sender, receiver, text)
    }
}

export const setReadMessages = (senderLogin, receiverlogin) => {
    return (dispatch) => {
        MessageAPI.setReadMessages(senderLogin, receiverlogin)
    }
}

