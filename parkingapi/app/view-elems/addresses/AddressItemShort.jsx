import React from 'react';
import ReactDOM from 'react-dom';
import TitleWithIcon from './TitleWithIcon.jsx';
import AddressFinderInput from './AddressFinderInput.js';
import Order from './../../sdk/order-model.js';
import translate from './../../sdk/translate.js';

var AddressItemShort = React.createClass({

    getThisFinder () {
        return Order._addresses_list[this.props.index];
    },

    getTitleValue () {
        if (this.getThisFinder() && this.getThisFinder().currentAddress.hasLevels()) {
            return this.getThisFinder().formatterCurrentToSplit()[0];
        }

        if (this.props.index === 0) {
            return translate('ADDRESS_FROM');
        }
        return translate('ADDRESS_TO');
    },

    getSubTitleValue () {
        if (this.getThisFinder() && this.getThisFinder().currentAddress.hasLevels() && this.getThisFinder().currentAddress.thisHasAlias()) {
            return this.getThisFinder().formatterCurrentToSplit()[1]
        }
    },

    getInactiveTitle () {
        return <TitleWithIcon showAddButton={false} title={this.getTitleValue()} subtitle={this.getSubTitleValue()} circleText={this.props.index + 1} circleClass={ this.props.index > 0 ? '-sm g-brand-bg' : '-sm'}/>
    },


    getSectionBody () {
        return <div>
            {this.getInactiveTitle()}
        </div>
    },


    render () {
        return <div className='row-wrapper address_row'>
            {this.getSectionBody()}
        </div>
    }
});

export default AddressItemShort;
