export default class AuthApi {
    constructor(request) {
        this.baseUrl = '/login'
        this.request = request
    }

    login(data) {
        const url = this.baseUrl
        return this.request.call({url, method: 'POST', data});
    } 
}