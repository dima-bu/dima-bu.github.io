import http from './http.js';

class Data {
    constructor () {
        this.data = false;
    }

    static getData(days, items) {
        return http.send('?days='+days+'&Items='+items);
    }
}

export default Data;