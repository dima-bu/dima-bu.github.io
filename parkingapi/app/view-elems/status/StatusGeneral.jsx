import React from 'react';
import ReactDOM from 'react-dom';
import StatusIcon from './StatusIcon.jsx';
import constants from './../../sdk/constants.js';
import translate from './../../sdk/translate.js';
import Order from './../../sdk/order-model.js';

var OrderStatusGeneral =  React.createClass({

    getStatusText(statusId) {
        return translate('STATUS_'+constants.orderStatusMap[statusId]);
    },

    cancelOrder(){
        this.props.setActiveModal('confirm-cancel');
    },

    render() {
        return <div className="area-section_row row-wrapper">
            <div className="area-section_icon cell-wrapper -narrow">
                <div className="area-section_icon-inner">
                    <StatusIcon statusId={this.props.statusId}/>
                </div>
            </div>
            <div className="status-section_title cell-wrapper -full">{this.getStatusText(this.props.statusId)}</div>
            <a className="status-section_cancel g-brand-text -hover cell-wrapper -narrow" onClick={this.cancelOrder}>
                <span>Отменить заказ</span>
            </a>
        </div>
    }
});

export default OrderStatusGeneral;