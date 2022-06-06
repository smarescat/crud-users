import AuthApi from "./auth";
import UsersApi from "./users";
import RequestApi from './request';

class Api {
    constructor() {
        this.request = new RequestApi();
    }

    setAuthData(data) {
        this.request.setAuthData(data)
    }

    resetAuthData() {
        this.request.resetAuthData()
    }

    auth() {
        return new AuthApi(this.request)
    }

    users() {
        return new UsersApi(this.request);
    }
}

export default new Api()