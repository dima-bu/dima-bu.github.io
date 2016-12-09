import React from 'react';
import ReactDOM from 'react-dom';
import Close from './../icons/close.jsx';
import Order from './../../sdk/order-model.js';
import MaskedInput from 'react-maskedinput';
import Timer  from './../helpers/Timer.jsx';
import Context from './../../sdk/context.js';
import skinConfig from './../../../skin/skin.conf.js';

let mainConfig;

var ConfirmModal = React.createClass({

    componentWillMount() {

        if (Context.skin !== 'default') {
            mainConfig = skinConfig[Context.skin]
        } else {
            mainConfig = skinConfig['default']
        }

    },

    getInitialState() {
        return {
            phoneBody: true,
            confirmBody: false,
            alarm: false,
            alarmSubmit: false,
            disableCall: true
        }
    },

    closeConfirmModal() {
        this.props.closeModal();
    },

    lockHandler(){
        this.props.lockHandler()
    },

    submitOrder(e) {

        e.preventDefault();
        var phone = this.refs.phoneNumber.input.value.split(' ').join('');

        if( this.refs.phoneNumber.mask._lastSelection.end === this.refs.phoneNumber.mask.value.length) {
            Order.submit(phone).then((resp)=>{

                if (resp.status === 'error') {
                    this.setState({alarmSubmit: true})
                }
                if (resp.status === 'success') {
                    this.setState({
                        phoneBody: false
                    })
                }

            });

        }

    },

    confirmOrder(e) {

        e.preventDefault();
        Order.confirm(this.refs.codeFromPhone.value).then((resp)=>{

            if (resp.status === 'error') {
                this.setState({alarm: true});
            }

            if (resp.status === 'success') {
                Order.getStatus();
                Order.createStatusLoop();
                this.closeConfirmModal();
                this.lockHandler()
            }
        })
    },

    inputOnFocus() {
        if(this.refs.phoneNumber.input.value) {

        } else {
            this.refs.phoneNumber.input.value = mainConfig.lead + ' ';
        }
    },
    onChangePhoneHandler(e) {
        if(!e.target.value) {
            this.refs.phoneNumber.input.value = mainConfig.lead + ' ';
            this.setState({alarmSubmit: false});
        }

        e.preventDefault();
    },

    componentDidMount() {
        this.refs.phoneNumber.input.value = mainConfig.lead + ' ';
        this.refs.phoneNumber.input.focus();
    },

    getAlarmText() {
        if (this.state.alarm) {
            return <p className="alarm-text">Неправильный код подтверждения</p>
        }
    },
    getAlarmTextSubmit() {
        if (this.state.alarmSubmit) {
            return <p className="alarm-text">Некорректный номер телефона</p>
        }
    },
    onChangeCodeHandler(e) {
       this.setState({alarm: false});

    },
    endTimerActionHandler(){
        this.setState({ disableCall: false });
    },
    resubmitVoiseHandler(){
        Order.resubmit('voice').then((resp)=>{

        })
    },
    getBody() {
        if(this.state.phoneBody) {
            return <div>
                    <h3 className="area-section_title -confim">Подтверждение заказа</h3>
                    <p>Укажите номер телефона и получите код подтверждения заказа.</p>
                    <form>
                    <MaskedInput leading={mainConfig.lead} mask={mainConfig.mask} className="s-input -phone" ref="phoneNumber"  onFocus={this.inputOnFocus} onChange={this.onChangePhoneHandler} />
                     {this.getAlarmTextSubmit()}
                     <div className="button-list ta-r">
                        <button className="s-button g-brand-bg -hover -size-sm -bg-normal -width-sm" disabled={this.state.alarmSubmit ? 'disabled': ''} onClick={this.submitOrder}>ПОЛУЧИТЬ КОД</button>
                    </div>
                    </form>
                </div>
        }

        return <div>
            <form>
                <h3 className="area-section_title -confim">Подтверждение заказа</h3>
                <p>Введите код подтверждени, если вы не получили смс - вы можете заказать звонок автоинформатора, который сообщит вам код.</p>
                <input type="text" className="s-input" onChange={this.onChangeCodeHandler} ref="codeFromPhone" />
                {this.getAlarmText()}
                <div className="button-list clearfix">
                    <button className="s-button g-brand-bg -hover -size-sm -bg-normal -full flr" disabled={this.state.alarm ? 'disabled': ''} onClick={this.confirmOrder}>ПОДТВЕРДИТЬ КОД</button>
                    <button className="s-button g-brand-bg -hover -size-sm -bg-normal -width-sm fll" onClick={this.resubmitVoiseHandler} disabled={this.state.disableCall ? 'disabled': ''}>
                        <Timer text="ПОЗВОНИТЬ МНЕ" endTimerAction={this.endTimerActionHandler} time="30"/>
                    </button>
                </div>
            </form>
        </div>
    },

    render() {

        return <div>
            <div className="modal-bg" onClick={this.closeConfirmModal}></div>
            <div className="modal-wrapper -right-top">
                <section className="area-section -entire -md modal-body_fix-confirm">
                    <a className="close-icon_wrapper" onClick={this.closeConfirmModal}>
                        <Close className="close-sm close-icon" />
                    </a>
                    {this.getBody()}
                </section>
            </div>
        </div>
    }
});

export default ConfirmModal;