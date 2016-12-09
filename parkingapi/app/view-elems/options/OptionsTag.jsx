import React from 'react';
import ReactDOM from 'react-dom';
import Close from './../icons/close.jsx';
import Order from './../../sdk/order-model.js';
import translate from './../../sdk/translate.js';

var OptionTag = React.createClass({

    removeThisOption (e) {
        if(this.props.isLocked) {
            return false;
        }
        e.preventDefault();

        Order.removeOption(this.props.idAttr);
    },

    preventDef(e){
        e.preventDefault();
        e.stopPropagation();
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
        return <div className="tag_item -with-capital" onClick={this.preventDef}>
                    <span className="tag_item-title">{this.props.title}</span>
                    <span className="tag_item-price">{this.props.price} {this.getType()}</span>
                    <div className="tag_item-close" onClick={this.removeThisOption}>
                        <Close className="close-xs close-icon" />
                    </div>

            </div>
    }
})

export default OptionTag;
