import React from 'react';
import ReactDOM from 'react-dom';
import Close from './../icons/close.jsx';
import Order from './../../sdk/order-model.js';


var ConfirmCancelModal = React.createClass({

    closeConfirmCancelModal() {
        this.props.closeModal();
    },

    lockHandler(){
        this.props.lockHandler()
    },

    componentDidMount() {

    },

    cancelOrder(){
        Order.cancel().then((resp)=>{
            if (resp.success) {
                this.closeConfirmCancelModal();
            }
        })
    },

    render() {

        return <div>
            <div className="modal-bg" onClick={this.closeConfirmCancelModal}></div>

            <div className="modal-wrapper -right-top">
                <section className="area-section -entire -md -cancel modal-body_fix-confirm">
                    <a className="close-icon_wrapper" onClick={this.closeConfirmCancelModal}>
                        <Close className="close-sm close-icon" />
                    </a>
                    <div>
                        <h3 className="area-section_title -confim"> {`Вы уверены, что хотите отменить заказ ?`} </h3>
                        <div className="button-list clearfix">
                            <button className="s-button g-brand-bg -hover -size-sm -bg-normal -width-sm  flr" onClick={this.closeConfirmCancelModal}>НЕТ</button>
                            <button className="s-button g-brand-bg -hover -size-sm -bg-normal -full fll" onClick={this.cancelOrder}>ОТМЕНИТЬ ЗАКАЗ</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
});

export default ConfirmCancelModal;