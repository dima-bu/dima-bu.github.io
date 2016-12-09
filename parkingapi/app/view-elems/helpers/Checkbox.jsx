import React from 'react';
import ReactDOM from 'react-dom';
import Check from './../icons/check.jsx';
import {isFunction} from 'lodash';

var Checkbox = React.createClass({

    onChangeHandler (e) {
        if(isFunction(this.props.onChangeHandler)){
            this.props.onChangeHandler(e.target.checked);
        }
    },

    render() {
        let checkClass = 'checking_item checking_item-inline ' + this.props.cssClass;

        return <div className={checkClass}>
            <input className="checking_input" type="checkbox" id={this.props.idAttr} onChange={this.onChangeHandler} checked = {this.props.checked || false} />
            <div className="checking_input-pseudo-wrapper">
                <div className="checking_input-pseudo">
                    <Check className="check-sm check-icon g-icon"/>
                </div>
            </div>
        </div>
    }

})

export default Checkbox;
