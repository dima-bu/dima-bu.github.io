import React from 'react';
import ReactDOM from 'react-dom';
import Close from './../icons/close.jsx';
import Order from './../../sdk/order-model.js';
import translate from './../../sdk/translate.js';


var CommentModal = React.createClass({

    closeCommentModal() {
        this.props.closeModal();
    },

    saveOrderComment () {
        Order.comment = this.refs.commentText.value;
        this.props.closeModal();
    },

    componentDidMount() {
        if(Order.comment) {
            this.refs.commentText.value = Order.comment;
        }
    },

    render() {

        return <div>
        <div className="modal-bg" onClick={this.closeCommentModal}> </div>
        <div className="modal-wrapper -right-top">
                <section className="area-section -light-entire">
                    <h3 className="area-section_title -pure g-uppercase">{translate("COMMENT")}</h3>
                    <a className="close-icon_wrapper" onClick={this.closeCommentModal}>
                        <Close className="close-sm close-icon" />
                    </a>

                </section>
                <section className="area-section modal-body_fix -entire">
                    <textarea rows="7" className="s-textarea" ref="commentText"></textarea>
                    <div className="button-list ta-r">
                        <button className="s-button g-brand-bg -hover -hover -size-sm -bg-normal -width-sm g-uppercase" onClick={this.closeCommentModal}>{translate("CANCEL")}</button>
                        <button className="s-button g-brand-bg -hover -size-sm -bg-normal -width-sm" onClick={this.saveOrderComment}>{translate("OK")}</button>
                    </div>
                </section>
            </div>
        </div>

    }
});

export default CommentModal;