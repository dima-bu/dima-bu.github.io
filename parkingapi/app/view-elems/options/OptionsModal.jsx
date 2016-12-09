import React from 'react';
import ReactDOM from 'react-dom';
import Close from './../icons/close.jsx';
import Order from './../../sdk/order-model.js'
import OptionItem from './OptionsItem.jsx'
import Options from './../../sdk/options.js'
import {findIndex} from 'lodash';
import translate from './../../sdk/translate.js';


var OptionsList;
var OptionsModal = React.createClass({
    getInitialState () {
        return {selectedOptions: Options.getTariffOptions()}
    },

    closeOptionsModal () {
        this.props.closeModal();
    },

    updateOption () {
        this.setState({
            selectedOptions: Options.getTariffOptions()
        })
    },

    componentDidMount () {

        this.setState({
            selectedOptions: Options.getTariffOptions()
        });

        Order.onOptionUpdate(this.updateOption)
    },

    componentWillUnmount () {
        Order.removeOptionUpdate(this.updateOption)
    },

    isChecked (item) {
        if (item.checked) {
            return true;
        }
        return false;
    },

    render () {

        var self = this;

        return <div>
            <div className="modal-bg" onClick={this.closeOptionsModal}></div>
            <div className="modal-wrapper -right-top">
                <section className="area-section -light-entire">
                    <h3 className="area-section_title -pure g-uppercase">{translate("REQUIREMENTS_FOR_CAR")}</h3>
                    <a className="close-icon_wrapper" onClick={this.closeOptionsModal}>
                        <Close className="close-sm close-icon" />
                    </a>
                </section>
                <div className="option-wrapper">
                {this.state.selectedOptions.map(function (item) {
                    return <OptionItem title={item.name} key={item.id} type={item.type} price={item.value} checked={self.isChecked(item)} idAttr={item.id} />
                })}
                </div>
            </div>
        </div>
    }
});

export default OptionsModal;