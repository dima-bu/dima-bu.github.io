import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from './../helpers/Checkbox.jsx';
import {findIndex} from 'lodash'
import Order from './../../sdk/order-model.js'
import translate from './../../sdk/translate.js';

var OptionItem = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.checked || false
        };
    },
    optionChangeHandler (e) {

        let checkIndex = findIndex(Order.options, (item) => {
            return item === this.props.idAttr;
        });

        if (checkIndex >=0) {
            Order.removeOption(this.props.idAttr);
            //Order.options.splice(checkIndex, 1);
        } else {
            Order.addOption(this.props.idAttr);
            //Order.options.push(this.props.idAttr);
        }

        this.setState({checked: e});

    },

    getType(){
        if (this.props.type === 'fixed') {
            return translate('CURR')
        }

        if (this.props.type === 'percent') {
            return '%'
        }
    },

    render() {

        return <label className="area-section -transparent -label">
                <div className="row-wrapper">
                    <div className="cell-wrapper -full -left-pad">
                        <div className="option-title">{this.props.title}</div>
                    </div>
                    <div className="cell-wrapper -narrow">
                        <div className="option-price">{this.props.price} {this.getType()}</div>
                    </div>
                    <div className="cell-wrapper  -narrow -left-pad">
                        <Checkbox cssClass="-std" idAttr={this.props.idAttr} checked={this.state.checked} onChangeHandler={this.optionChangeHandler}/>
                    </div>
                </div>
            </label>
    }
})

export default OptionItem;
