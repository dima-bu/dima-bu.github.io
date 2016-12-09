import React from 'react';
import ReactDOM from 'react-dom';
import ArrowRight from './../icons/arrow-right.js'
import Order from './../../sdk/order-model.js'
import translate from './../../sdk/translate.js';

let OrderTitle;

var CommentSection = React.createClass({

    showCommentModal() {
        if(this.props.isLocked) {
            return false;
        }

        this.props.setActiveSection(null);
        this.props.openModal('comment')
    },

    render() {

        OrderTitle = Order.comment;

        return <section className={`area-section ${!this.props.isLocked ? 'g-pointer' : ''}`} onClick={this.showCommentModal}>
            <div className="row-wrapper">
                <div className="cell-wrapper -narrow">
                    <h3 className="area-section_title -pure g-uppercase">{translate("COMMENT")}</h3>
                </div>
                <div className="cell-wrapper -full">
                    <div className="area-section_subtitle -comment g-crop">{OrderTitle}</div>
                </div>
                <div className="cell-wrapper -narrow -left-pad">
                    <ArrowRight className="arrow-right-sm arrow-right-icon"/>
                </div>
            </div>
        </section>
    }
});

export default CommentSection;