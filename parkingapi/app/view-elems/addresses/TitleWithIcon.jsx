import React from 'react';
import ReactDOM from 'react-dom';

var TitleWithIcon = React.createClass({

    addFinderHandler (e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.addFinder();
    },

    getAddButton () {
        if (this.props.showAddButton) {
            return <div className="cell-wrapper -narrow">
                <div className="circle -sm-md -def g-pointer" onClick={this.addFinderHandler}>+</div>
            </div>
        }
    },

    getSubtitle () {
        if (this.props.subtitle) {
            return <div className="address_subtitle">{this.props.subtitle}</div>
        }
    },

    render () {

        var circleClass = 'circle ' + this.props.circleClass;

        return <div className={`row-wrapper address_row ${this.props.className}`}>
            <div className="area-section_icon cell-wrapper -narrow -top">
                <div className="area-section_icon-inner">
                    <div className={circleClass}>{this.props.circleText}</div>
                </div>
            </div>
            <div className="cell-wrapper  -full">
                <div className="address_title">{this.props.title}</div>
                {this.getSubtitle()}
            </div>
                {this.getAddButton()}
        </div>
    }
})

export default TitleWithIcon;