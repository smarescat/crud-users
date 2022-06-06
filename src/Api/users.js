export default class UsersApi {
    constructor(request) {
        this.baseUrl = '/users'
        this.request = request
    }

    getUsers() {
        const url = this.baseUrl
        return this.request.call({url, method: 'GET'});
    }

    getUser(userId) {
        const url = `${this.baseUrl}/${userId}`
        return this.request.call({url, method: 'GET'})
    }

    create(data) {
        const url = this.baseUrl
        return this.request.call({url, method: 'POST', data});
    }

    update(userId, data) {
        const url = `${this.baseUrl}/${userId}`
        return this.request.call({url, method: 'PATCH', data})
    }

    delete(userId) {
        const url = `${this.baseUrl}/${userId}`
        return this.request.call({url, method: 'DELETE'})
    }
}