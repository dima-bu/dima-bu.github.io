import moment from 'moment';
import translate from './translate.js';
import {isNumber, indexOf, toNumber, isNaN} from 'lodash';

moment.locale('ru');

var DateHelper = {
    days: {
        now: moment().startOf('day'),
        tomorrow : moment().add(1, 'day').startOf('day'),
        dayAfterTomorrow : moment().add(2, 'day').startOf('day')
    },

    getCurrentTime(){
       return  moment().add(15, 'minute').format('HH:mm')
    },
    getDropdownDates(){
        var arr = [
            {
                label: translate('CURRENT_TIME'),
                value: 'current'
            },
            {
                label: translate('TODAY') + ' - ' + this.days.now.format('DD MMMM'),
                value: this.days.now.format()
            },
            {
                label: translate('TOMORROW') + ' - ' + this.days.tomorrow.format('DD MMMM'),
                value: this.days.tomorrow.format()
            },
            {
                label: translate('DAY_AFTER_TOMORROW') + ' - ' + this.days.dayAfterTomorrow.format('DD MMMM'),
                value: this.days.dayAfterTomorrow.format()
            }
        ];

        return  arr;
    },

    //time - строка в формате HH:mm
    isValidTime(time){
        var timeArr = time.split(':').join('').split(''),
            result = true;
        timeArr.forEach((item, index, arr)=> {

            if(isNumber(toNumber(item)) && !isNaN(toNumber(item))) {
                switch (index) {
                    case 0:
                        if (indexOf([0,1,2], toNumber(item)) === -1) {
                            result = false;
                            return;
                        }
                    case 1:
                        if (item + arr[index+1] >= 24) {
                            result = false;
                            return;
                        }
                    case 2:
                        if (indexOf([0,1,2,3,4,5], toNumber(item)) === -1) {
                            result = false;
                            return;
                        }
                    case 3:
                        if (item + arr[index+1] >= 60) {
                            result = false;
                            return;
                        }
                }
            }
        });

        return result;
    }

}

export default DateHelper