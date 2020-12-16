import { extendObservable } from 'mobx';

class Store {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            Username: ''
        })
    }
}

export default  new Store();
