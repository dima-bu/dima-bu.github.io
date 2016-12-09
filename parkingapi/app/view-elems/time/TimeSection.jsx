import React from 'react';
import ReactDOM from 'react-dom';
import Order from './../../sdk/order-model.js';
import Dropdown from 'react-dropdown';
import DateHelper from './../../sdk/date.js';
import MaskedInput from 'react-maskedinput';
import moment from 'moment';
import {findIndex, isString} from 'lodash';
import translate from './../../sdk/translate.js';
import TimeInput from 'react-time-input';
import InputElement from './../helpers/InputElement.js';

var DateSelector = React.createClass({

    getInitialState () {
        if (Order.timeObj.day) {
            return {
                disableTimeInput: false
            }
        }

        return {
            disableTimeInput: true
        }
    },

    //componentDidMount () {
    //    if (!Order.timeObj.time) {
    //        Order.timeObj.time = DateHelper.getCurrentTime();
    //    }
    //
    //    this.refs.timeInput.value = Order.timeObj.day;
    //
    //},

    //componentDidUpdate () {
    //    if (!Order.timeObj.time) {
    //        Order.timeObj.time = DateHelper.getCurrentTime();
    //        this.refs.timeInput.value = Order.timeObj.time;
    //
    //    } else {
    //
    //        this.refs.timeInput.value = Order.timeObj.time;
    //
    //        if(this.refs.timeInput && this.refs.timeInput) {
    //            setTimeout(()=>{this.refs.timeInput.focus()}, 20);
    //        }
    //
    //    }
    //},

    onSelectTime (e) {

        if (e.value === 'current') {
            Order.timeObj.day = null;
            this.setState({
                disableTimeInput: true
            });
        } else {
            Order.timeObj.day = moment(e.value).format();

            if (!Order.timeObj.time) {
                Order.timeObj.time = DateHelper.getCurrentTime();
            }


            this.setState({
                disableTimeInput: false
            });

        }

    },


    timeInputOnChange (val) {

        if (val.length === 5) {
            Order.timeObj.time = val;
        }
    },

    getTimeInput () {

        return <TimeInput
            initTime={Order.timeObj.time || DateHelper.getCurrentTime()}
            disabled={this.state.disableTimeInput ? 'disabled' : ''}
            className={`s-input -time ${this.state.disableTimeInput ? 'disabled' : ''}`}
            onTimeChange={this.timeInputOnChange}
            mountFocus='true'
        />
    },

    render () {
        var val;
        var options = DateHelper.getDropdownDates();

        if (Order.timeObj.day) {
            var value = Order.timeObj.day;
            var findIndexOpt = findIndex(options, {'value': value});
            val = options[findIndexOpt];
        } else {
            val = options[0];
        }

        return <div className="row-wrapper -time-select clearfix row-sm">
            <div className="time-left-col">
                <Dropdown options={DateHelper.getDropdownDates()} value={val} autoBlur="true" onChange={this.onSelectTime}/>
            </div>
            <div className="time-right-col">
                {this.getTimeInput()}
            </div>
        </div>
    }
});

var TimeSection = React.createClass({

    getOrderTimeBlock () {

        if (!this.props.isActive) {
            if (Order.timeObj && Order.timeObj.day) {

                return <div className="cell-wrapper -narrow">
                    <div className="time-section_time-order g-brand-text -preorder">{Order.getTimeString()}</div>
                </div>
            }
            return <div className="cell-wrapper -narrow">
                <div className="time-section_time-order ">{translate('CURRENT_TIME')}</div>
            </div>
        }

        return false;

    },

    getDateSelector () {
        if (this.props.isActive) {
            return <DateSelector/>
        }
    },

    showFullSection () {
        if (this.props.isLocked) {
            return false;
        }

        if (!this.props.isActive) {
            this.props.setActiveSection('time');
        }
    },

    render () {
        return <section className={`area-section ${!this.props.isLocked ? 'g-pointer' : ''}`} onClick={this.showFullSection}>
            <div className="row-wrapper">
                <div className="cell-wrapper -full">
                    <h3 className="area-section_title -pure -time g-uppercase">{translate('WHEN')}</h3>
                </div>
                {this.getOrderTimeBlock()}
            </div>
            {this.getDateSelector()}
        </section>
    }
});

export default TimeSection;