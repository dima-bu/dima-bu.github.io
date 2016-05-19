import http from './http.js';
import EventStore from './event_store';

var Movie = {
    last_popular: [],
    _estimate: {},
    estimate: function () {
        var params = {
        };

        return http.send('/550?api_key=edafd66587f9b1ee007e2eda9007e228', params).then((resp)=> {
            debugger;
            //this._estimate = resp;
            //this.events.resolve('estimateUpdate', resp);
            //this.events.resolve('update', this);
        });
    }
}

export default  Movie;