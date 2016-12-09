import http from './http.js';
import {filter, map, cloneDeep} from 'lodash';
import Order from './order-model.js';

var Options = {
    _tariffOptions: {},
    getTariffOptions: function() {
        if (this._tariffOptions[http.context]) {
            let selectedOptions = [];
            selectedOptions = map(this._tariffOptions[http.context], (option) => {
                var myOption =  cloneDeep(option);
                if (Order.hasOption(option.id)) {
                    myOption.checked = true;
                }
                return myOption;
            });
            return selectedOptions;

        }
    },
    getSelectedOptions: function () {
        return new Promise((resolve, reject) => {
            var self = this;
            if (this._tariffOptions[http.context].length) {

                var selectedOptions = map(self._tariffOptions[http.context], (option) => {
                    var myOption =  cloneDeep(option);
                    if (Order.hasOption(option.id)) {
                        myOption.checked = true;
                    }

                    return myOption;
                });

                resolve(selectedOptions);
                return;
            }
            this.initTariffOptions().then(function() {
                var selectedOptions = map(self._tariffOptions[http.context], (option) => {
                    var myOption =  cloneDeep(option);
                    if (Order.options.indexOf(option.id) >= 0) {
                        myOption.checked = true;
                    }

                    return myOption;
                });

                resolve(selectedOptions);
            }).catch(function() {
                resolve([]);
            });

        });

    },
    initTariffOptions: function () {
        var self = this;

        if (this._tariffOptions[http.context]) {
            return Promise.resolve(self._tariffOptions[http.context]);
        }

        return http.send('/api/client/web/1.0/tariff/options').then(function (resp) {
            self._tariffOptions[http.context] = resp;
            return resp
        })
    }
}

export default Options;
