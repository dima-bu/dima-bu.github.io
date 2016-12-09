import React from 'react';
import ReactDOM from 'react-dom';
import Order from './../sdk/order-model.js';
import translate from './../sdk/translate.js';

var Footer = React.createClass({

    showConfirmModal() {
        if(this.props.isLocked) {
            return false;
        }

        if (Order.getRoute().length > 0 ) {
            this.props.openModal('confirm');
            this.props.setActiveSection(null);
        }

    },

    render() {
        return <footer className="footer">
            <button disabled={this.props.isLocked ? 'disabled' : ''} className="s-button g-brand-bg -hover -bg-normal -size-md -width-full g-uppercase" onClick={this.showConfirmModal}>{translate("CALL_TAXI")}</button>
        </footer>
    }

});

export default Footer;