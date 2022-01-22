import { authContact, logoutContact, checkContact, getUserInfo } from "./actions"
import { AUTHCONTACT, CHECKCONTACT, GETUSERINFORMATION, LOGOUTCONTACT } from "./types"
import { AuthAPI, UserAPI } from "../api"


const initialState = {
    isAuth: false,
    login: undefined,
    userData: undefined
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
                login: undefined
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
        default:
            return state
    }
}


export const authUser = (login, password, isRemeber) => {
    return (dispatch) => {
        AuthAPI.authUser(login, password, isRemeber).then(data => {
            data.connection && localStorage.setItem('jwt', data.accessToken);
            data.connection && dispatch(authContact(login))
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
        });
    }
}

export const getUser = (login) => {
    return (dispatch) => {
        UserAPI.getUser(login).then(data => dispatch(getUserInfo(data)))
    }
}