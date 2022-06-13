import { authContact, logoutContact, checkContact, getUserInfo, setEntryError } from "./actions"
import { RESETUSERAVATAR, RESETUSEREMAIL, RESETUSEREMAILPASSWORD, RESETUSEREMAILRECEIVE, RESETUSERISPRIVATE, RESETUSERSTATUS } from "./types"
import { AUTHCONTACT, CHECKCONTACT, GETUSERINFORMATION, LOGOUTCONTACT, SETREGISTRATION, ENTRYERROR } from "./types"
import { AuthAPI, UserAPI } from "../api"


const initialState = {
    isAuth: false,
    login: undefined,
    userData: undefined,
    isRegistrated: false,
    entryError: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHCONTACT:
            return {
                ...state,
                isAuth: true,
                login: action.payload,
            }
        case LOGOUTCONTACT:
            return {
                ...state,
                isAuth: false,
                login: undefined,
                isRegistrated: false
            }
        case CHECKCONTACT:
            return {
                ...state,
                isAuth: true,
                login: action.payload,
            }
        case GETUSERINFORMATION:
            return {
                ...state,
                userData: action.payload
            }
        case RESETUSERAVATAR:
            return {
                ...state,
                userData: setUserAvatar(state.userData, action.payload)
            }
        case RESETUSERSTATUS:
            return {
                ...state,
                userData: setUserStatus(state.userData, action.payload)
            }
        case RESETUSEREMAIL:
            return {
                ...state,
                userData: setUserEmail(state.userData, action.payload)
            }
        case RESETUSEREMAILPASSWORD:
            return {
                ...state,
                userData: setUserEmailPassword(state.userData, action.payload)
            }
        case RESETUSEREMAILRECEIVE:
            return {
                ...state,
                userData: setUserEmailReceive(state.userData, action.payload)
            }
        case RESETUSERISPRIVATE:
            return {
                ...state,
                userData: setUserIsPrivate(state.userData, action.payload)
            }
        case SETREGISTRATION:
            return {
                ...state,
                isRegistrated: true
            }
        case ENTRYERROR:
            return {
                ...state,
                entryError: action.payload
            }
        default:
            return state
    }
}


export const authUser = (login, password, isRemeber) => {
    return (dispatch) => {
        AuthAPI.authUser(login, password, isRemeber).then(data => {
            data.connection && localStorage.setItem('jwt', data.accessToken);
            data.connection && dispatch(authContact(login))
            data.connection && dispatch(getUser(login))
            data.connection ? dispatch(setEntryError(false)) : dispatch(setEntryError(true))
        });
    }
}

export const logoutUser = (login) => {
    return (dispatch) => {
        AuthAPI.logoutUser(login).then(data => {
            localStorage.removeItem('jwt');
            dispatch(logoutContact())
        });
    }
}

export const checkAuth = () => {
    return (dispatch) => {
        AuthAPI.checkAuth().then(data => {
            data.connection && localStorage.setItem('jwt', data.accessToken);
            data.connection && dispatch(checkContact(data.login))
            data.connection && dispatch(getUser(data.login))
        });
    }
}

export const getUser = (login) => {
    return (dispatch) => {
        UserAPI.getUser(login).then(data => dispatch(getUserInfo(data)))
    }
}

const setUserAvatar = (data, avatar) => {
    data.avatar = avatar
    return data
}

const setUserStatus = (data, status) => {
    data.status = status
    return data
}

const setUserEmail = (data, email) => {
    data.email = email
    return data
}

const setUserEmailPassword = (data, emailPassword) => {
    data.email_password = emailPassword
    return data
}

const setUserEmailReceive = (data, emailReceive) => {
    data.receive_email = emailReceive
    return data
}

const setUserIsPrivate = (data, isPrivate) => {
    data.is_private = isPrivate
    return data
}
