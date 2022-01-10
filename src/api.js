import * as axios from 'axios';


const BASE_URL = 'http://localhost:3000';

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
        axios.get(BASE_URL + '/refresh', { withCredentials: true }).then(response => {
            localStorage.setItem('jwt', response.data.accessToken)
            return instance.request(originalReq)
        }).catch(err => console.log(err))
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

    checkUser(login) {
        return instance.get('/users/check/@' + login).then(response => {
            return response.data
        })
    },
    searchUser(login) {
        return instance.get('/search/@' + login).then(response => {
            return response.data
        })
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
            return response.data
        })
    },
    checkAuth() {
        return axios.post(BASE_URL + '/refresh', { accessToken: localStorage.getItem('jwt') }, { withCredentials: true }).then(response => {
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
    getMessages(senderLogin, receiverLogin) {
        return instance.post('/get-messages', { senderLogin, receiverLogin }).then(response => {
            return response.data
        })
    }
}
