import axios from 'axios'

class RequestApi {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.VUE_APP_API_URL + '/api',
            timeout: 10000
        })
        this.api.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    }

    call({ method = 'GET', url, data, params, timeout = 10000 }) {
        return new Promise((resolve, reject) => {
            let options = {
                method,
                url,
                params,
                data,
                timeout
            }
            this.api(options)
                .then(response => resolve(response.data))
                .catch(error => {
                    reject({
                        message: `error.${error.response?.data?.code || 'default'}`,
                        errorData: error.response?.data,
                        response: error.response
                    })
                })
        })
    }

    setAuthData(data) {
        this.api.defaults.headers.common.Authorization = `Bearer ${data.token}`
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('id', data.userId)
        localStorage.setItem('name', data.name)
        localStorage.setItem('surname', data.surname)
    }

    resetAuthData() {
        delete this.api.defaults.headers.common.Authorization
        localStorage.removeItem('jwt')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('surname')
    }
}

export default RequestApi