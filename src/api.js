import * as axios from 'axios';
import { url } from './config';

const BASE_URL = url;

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    return config
})

instance.interceptors.response.use((config) => {
    return config
}, (async error => {
    if (error.response.status == 401) {
        const originalReq = error.config;
        axios.post(BASE_URL + 'refresh', localStorage.getItem('jwt'), { withCredentials: true }).then(response => {
            localStorage.setItem('jwt', response.data.accessToken)
            return instance.request(originalReq)
        }).catch()
    }
}))

export const UserAPI = {
    addUser(login, password, firstname, lastname) {
        return instance.post('/users/add', {
            login,
            password,
            firstname,
            lastname
        }).catch(err => console.log(err));
    },
    getContacts(login) {
        return instance.post('/users/get-contacts', { login }).then(response => {
            return response.data
        })
    },
    getUser(login) {
        return instance.get(`/users/@${login}`).then(response => {
            return response.data
        })
    },
    checkUser(login) {
        return instance.get('/users/check/@' + login).then(response => {
            return response.data
        })
    },
    searchUser(login) {
        return instance.get('/search/@' + login).then(response => {
            return response.data
        })
    },
    searchLabels(login, label) {
        return instance.post(BASE_URL + 'search-by-labels', { login, label }).then(response => {
            return response.data
        })
    },
    checkSubscription(ownerLogin, contactLogin) {
        return instance.post(BASE_URL + 'check-subscription', { ownerLogin, contactLogin }).then(response => {
            return response.data
        })
    },
    subscribe(ownerLogin, contactLogin) {
        return instance.post(BASE_URL + 'set-subscription', { ownerLogin, contactLogin }).then(response => {
            return response.data
        })
    },
    unsubscribe(ownerLogin, contactLogin) {
        return instance.post(BASE_URL + 'set-unsubscription', { ownerLogin, contactLogin }).then(response => {
            return response.data
        })
    },
    setLeavingTime(login) {
        return instance.post(BASE_URL + 'set-leaving-time', { login })
    },
    setPrivate(login, isPrivate) {
        return instance.post(BASE_URL + 'set-private', { login, isPrivate })
    },
    createFolder(login, folder) {
        return instance.post(BASE_URL + 'create-folder', { login, folder }).then(response => {
            return response.data
        })
    },
    setAvatar(login, avatar) {
        return instance.post(BASE_URL + 'set-avatar', { login, avatar })
    },
    setStatus(login, status) {
        return instance.post(BASE_URL + 'set-status', { login, status })
    },
    setEmail(login, email) {
        return instance.post(BASE_URL + 'set-email', { login, email })
    },
    setEmailPassword(login, emailPassword) {
        return instance.post(BASE_URL + 'set-email-password', { login, emailPassword })
    },
    setEmailReceive(login, emailReceive) {
        return instance.post(BASE_URL + 'set-email-receive', { login, emailReceive })
    },
    updateLabels(ownerLogin, contactLogin, labels) {
        return instance.post(BASE_URL + 'update-labels', { ownerLogin, contactLogin, labels })
    }
}

export const AuthAPI = {
    authUser(login, password, isRemember) {
        return instance.post('/login', {
            login, password, isRemember
        }).then(response => {
            return response.data
        })
    },
    logoutUser(login) {
        return instance.post('/logout', { login }).then(response => {
            window.location.reload()
            return response.data
        })
    },
    checkAuth() {
        return axios.post(BASE_URL + 'refresh', { accessToken: localStorage.getItem('jwt') }, { withCredentials: true }).then(response => {
            if (response.data === 200) window.location.reload()
            return response.data
        })
    }
}

export const MessageAPI = {
    setMessage(senderLogin, receiverLogin, text) {
        return instance.post('/set-message', { senderLogin, receiverLogin, text }).then(response => {
            return response.data
        })
    },
    setAssignment(senderLogin, receiverLogin, name, text, term) {
        return instance.post('/set-assignment', { senderLogin, receiverLogin, name, text, term }).then(response => {
            return response.data
        })
    },
    setAssignmentDone(id, condition) {
        return instance.post('/set-done', { id, condition }).then(response => {
            return response.data
        })
    },
    getMessages(senderLogin, receiverLogin, page, limit, searchText, isSpam) {
        return instance.post('/get-messages', { senderLogin, receiverLogin, page, limit, searchText, isSpam }).then(response => {
            return response.data
        })
    },
    getAssignment(senderLogin, receiverLogin) {
        return instance.post('/get-assignment', { senderLogin, receiverLogin }).then(response => {
            return response.data
        })
    },
    setReadMessages(senderLogin, receiverLogin) {
        return instance.post('/set-read', { senderLogin, receiverLogin })
    },
    setImportance(ownerLogin, contactLogin, importance) {
        return instance.post('/set-importance', { ownerLogin, contactLogin, importance })
    },
    deleteMessages(id, messages, senderLogin, receiverLogin) {
        return instance.post('/delete-messages', { id, messages, senderLogin, receiverLogin })
    },
    updateSpam(id) {
        return instance.post('/update-spam', { id })
    }
}