import React from 'react';
import ReactDOM from 'react-dom';
import TitleWithIcon from './TitleWithIcon.jsx';
import AddressFinderInput from './AddressFinderInput.js';
import Order from './../../sdk/order-model.js';
import CloseBold from './../icons/close-bold.jsx';
import Switch from './../icons/switch.jsx';
import translate from './../../sdk/translate.js';


var FlatPorchInputs = React.createClass({

    getThisFinder () {
        return this.props.finder;
    },

    componentDidMount () {



        if (this.getThisFinder().isFull() && this.getThisFinder().currentAddress.address.point.flat) {
            this.refs.flat.value = this.getThisFinder().currentAddress.address.point.flat
        }

        if (this.getThisFinder().isFull() && this.getThisFinder().currentAddress.address.point.porch) {
            this.refs.porch.value = this.getThisFinder().currentAddress.address.point.porch
        }
    },

    porchChangeHandler (e) {
        this.getThisFinder().setPorchToCurrrent(e.target.value);
    },

    flatChangeHandler (e) {
        this.getThisFinder().setFlatToCurrrent(e.target.value);
    },

    flatKeyDownHandler(e) {

        if (e.which === 13 || e.which === 9) {
            e.preventDefault();
            e.stopPropagation();
            this.props.setActiveSection('address-1');
        }
    },

    porchKeyDownHandler(e) {

        if (e.which === 13 || e.which === 9) {
            e.preventDefault();
            e.stopPropagation();
            this.refs.flat.focus();
        }
    },

    render () {

        return <div className="form_row form_row-clear">
            <div className="form_col-50">
                <input type="text" className="s-input" ref="porch"  onChange={this.porchChangeHandler} onKeyDown={this.porchKeyDownHandler} placeholder={translate("PORCH_NUMBER")} />
            </div>
            <div className="form_col-50">
                <input type="text" className="s-input" ref="flat" onChange={this.flatChangeHandler} onKeyDown={this.flatKeyDownHandler} placeholder={translate("FLAT_NUMBER")} />
            </div>
        </div>
    }
});


var AddressItem = React.createClass({

    componentWillMount(){

        if (Order._addresses_list.length > 2) {
            this.setActive();
        }
    },

    getThisFinder () {
        return Order._addresses_list[this.props.index];
    },

    setActive (e) {

        if (this.props.isLocked) {
            return false;
        }

        this.props.setActiveSection('address-' + this.props.index);
    },

    deleteItem (e) {
        if (this.props.isLocked) {
            return false;
        }
        e.preventDefault();
        e.stopPropagation();
        this.props.deleteItem(this.props.index);
        this.onChangeHadler();
    },

    swithItems(e) {

        if (this.props.isLocked) {
            return false;
        }

        e.preventDefault();
        e.stopPropagation();

        this.props.switchItems(this.props.index);
        this.onChangeHadler();
    },

    onChangeHadler () {

        if (this.refs.flatPorch && this.refs.flatPorch.refs.porch && this.getThisFinder().isFull()) {
            this.refs.flatPorch.refs.porch.focus();
        }

        if (this.props.index > 0 && this.getThisFinder() && this.getThisFinder().isFull()) {
            this.props.setActiveSection(null);
        }

        if (Order.getRoute().length > 1) {
            Order.estimate();
        } else {
            Order.events.resolve('estimateUpdate', {total: 0, path: {distance: 0}});
        }
    },

    getTitleBlock () {
        if (this.props.index === 0) {
            return <h3 className="area-section_title g-uppercase">{translate('WHENCE')}</h3>
        }
        return <h3 className="area-section_title g-uppercase">{translate('WHERE')}</h3>
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

    addFinder () {
        this.props.addFinder(this.props.index);
    },

    getInactiveTitle () {
        return <TitleWithIcon className='-md-sm-padding' addFinder={this.addFinder} showAddButton={this.props.isLast && this.getThisFinder().isFull() && !this.props.isLocked ? true : false} title={this.getTitleValue()} subtitle={this.getSubTitleValue()} circleText={this.props.index + 1} circleClass={ this.props.index > 0 ? '-sm g-brand-bg' : '-sm'}/>
    },

    getFlatPorchInputs () {
        if (this.props.index === 0) {
            return <FlatPorchInputs finder={this.getThisFinder()} setActiveSection={this.props.setActiveSection} ref="flatPorch"/>
        }
    },

    getSectionBody () {
        if (this.props.isActive) {
            return <div>
                {this.getTitleBlock()}
                <div className="form_row">
                    <AddressFinderInput finder={this.getThisFinder()}  index={this.props.index} onSetFinder={this.onSetFinderHandler} onChange={this.onChangeHadler} />
                </div>
                {this.getFlatPorchInputs()}
            </div>
        }
        return <div>
             {this.getTitleBlock()}
                {this.getInactiveTitle()}
        </div>
    },

    getSwitchIcon(){
        if (this.props.index > 0){
            return <div className="circle  -sm-md -dark-light -svg-inside g-pointer address_switch" onClick={this.swithItems}>
                <Switch className="switch-sm switch-icon circle-icon"/>
            </div>
        }
    },

    getDeleteIcon(){
        if (this.props.index > 1){
            return <div className="circle -sm-md -light -svg-inside g-pointer address_close" onClick={this.deleteItem}>
                <CloseBold className="close-icon close-xs circle-icon" />
            </div>
        }
    },

    render () {
        return <section className={`area-section -no-last ${!this.props.isLocked ? 'g-pointer' : ''}`} onClick={this.setActive}>
            {this.getDeleteIcon()}
            {this.getSwitchIcon()}
            {this.getSectionBody()}
        </section>

    }
});

export default AddressItem;
