import React from 'react';
import ReactDOM from 'react-dom';
//import Header from './app/view-elems/Header.jsx';
//import Footer from './app/view-elems/Footer.jsx';
//import StatusSection from './app/view-elems/status/StatusSection.jsx';
//import CommentSection from './app/view-elems/comment/CommentSection.jsx'
//import CommentModal from './app/view-elems/comment/CommentModal.jsx';
//import OptionsSection from './app/view-elems/options/OptionsSection.jsx';
//import OptionsModal from './app/view-elems/options/OptionsModal.jsx';
import http from './app/sdk/http.js';
import data from './app/sdk/data.js';
//import Context from './app/sdk/context.js';


//import Order from './app/sdk/order-model.js'
//import Saver from './app/sdk/saver.js';
//import Options from './app/sdk/options.js'
//import CostSection from './app/view-elems/cost/CostSection.jsx';
//import ConfirmModal from './app/view-elems/confirm/ConfirmModal.jsx';
//import ConfirmCancelModal from './app/view-elems/confirm/ConfirmCancelModal.jsx';
//import TimeSection from './app/view-elems/time/TimeSection.jsx';
//import AddressList from './app/view-elems/addresses/AdressesList.jsx'

let CommentModalView,
    OptionsModalView,
    ConfirmModalView,
    TimeModalView;

var MainWidget = React.createClass({
    getInitialState(){
        return { activeSection: null, isLocked: false, activeModal: null }
    },
    componentWillMount() {

        data.getData(20, 4000).then((resp)=>{
            debugger;
        })

        //var keys = window.location.search
        //    .substring(1)
        //    .replace(/\&amp;/g, '&')
        //    .split("&");
        //
        //var params = {};
        //
        //for(var i = 0; i < keys.length; i++) {
        //    var parse = keys[i].split('=');
        //    params[parse[0]] = parse[1]
        //}
        //
        //http.setContext(params.context);
        ////Context.setContext(params.context);
        //http.setGlobalUrl(params.host || window.location.origin);
        //
        //Context.setSkin(params.skin || 'default');
        //
        //Options.initTariffOptions().then((resp) => {
        //        this.forceUpdate();
        //    }
        //)
    },
    //componentDidMount() {
    //    Order.onEstimateUpdate( ()=> {
    //        this.setState({
    //            selectedOptions: Options.getSelectedOptions()
    //        })
    //    });
    //
    //
    //    Order.onRejectOrder(()=> {
    //        this.setState({
    //            isLocked: false
    //        });
    //    });
    //
    //    Order.onStatusUpdate(() =>  {
    //        if(Order.orderId) {
    //            this.setState({
    //                isLocked: true
    //            })
    //        }
    //    })
    //},
    //
    //lockHandler(){
    //    this.setState({
    //        isLocked: true
    //    })
    //},
    //
    //setActiveSection(section) {
    //    this.setState({
    //        activeSection: section
    //    })
    //},
    //
    //setActiveModal(modal) {
    //    this.setState({
    //        activeModal: modal
    //    })
    //},
    //
    //isActive(section){
    //    return this.state.activeSection === section;
    //},
    //
    //isOpen(modal){
    //    return this.state.activeModal === modal;
    //},
    //
    //closeModal(){
    //    this.setState({
    //        activeModal: null
    //    })
    //},
    //
    //openModal(modal){
    //    this.setState({
    //        activeModal: modal
    //    })
    //},
    //
    //getCommentModal(){
    //    if(this.isOpen('comment')) {
    //        return <CommentModal closeModal={this.closeModal} />;
    //    }
    //},
    //getOptionsModal(){
    //    if(this.isOpen('options')) {
    //        return <OptionsModal  closeModal={this.closeModal} />;
    //    }
    //},
    //getConfirmModal(){
    //    if(this.isOpen('confirm')) {
    //        return <ConfirmModal lockHandler={this.lockHandler} closeModal={this.closeModal} />;
    //    }
    //},
    //
    //getConfirmCancelModal(){
    //    if(this.isOpen('confirm-cancel')) {
    //        return <ConfirmCancelModal lockHandler={this.lockHandler} closeModal={this.closeModal} />;
    //    }
    //},
    render() {
        return <div className="widget-wrapper" >
           <h2>fdfgdgdfg</h2>
        </div>
    }
});

ReactDOM.render(<MainWidget/>, document.getElementById('MainWidget'));