import React from 'react';
import ReactDOM from 'react-dom';
import http from './../../sdk/http.js';
import Address from './../../sdk/address.js';
import AddressFinder from './../../sdk/adderess-finder.js';
import {each} from 'lodash';
import translate from './../../sdk/translate.js';

var AddressFinderInput = React.createClass({

    getPlaceholder() {

        var currentAddress = this.AddressFinder.currentAddress;

        if(this.AddressFinder.isFull()) {
            return '';
        }

        if(this.AddressFinder.isEmpty()) {
            if (this.props.index === 0) {
                return translate('ADDRESS_FROM');
            }
            return translate('ADDRESS_TO');
        }


        if (Address.hasStreet(currentAddress) && !Address.hasPoint(currentAddress) ) {
            return translate("SELECT_HOUSE");
        }

        return  '';
    },

    getInitialState () {
        return {
            addressesList : [],
            showFinderList: false,
            navIndex: 0
        }
    },

    componentWillMount(){

        this.Address = new Address();

        if (this.props.finder) {
            this.AddressFinder = this.props.finder;
        } else {
            this.AddressFinder = new AddressFinder();
        }

    },
    componentDidMount() {
        this.refs.entryInput.focus();
    },

    setAddress(index, event) {

        var addressObj = this.state.addressesList[index];
        this.AddressFinder.setCurrentAddress(addressObj);

        this.setState({showFinderList: false, navIndex: 0});
        this.refs.entryInput.value = '';
        this.refs.entryInput.focus();

        if (this.AddressFinder.isFull()){
            this.onChange();
        }

       if (event) {
           event.preventDefault();
       }

    },

    keyDownInputHandler(event) {

        if (this.refs.entryInput.value === '' && event && event.keyCode === 8) {
            this.AddressFinder.setPreviousAddress();
            if (this.AddressFinder.isEmpty()){
                this.onChange();
            }

            this.forceUpdate();
        }

    },

    keyDownComponentHandler(event) {

        var currentNavIndex = this.state.navIndex;
        var maxLength = this.state.addressesList.length - 1;

        //up
        if(event.keyCode === 38) {
            if (currentNavIndex > 0) {
                this.setState({navIndex: currentNavIndex-1});
                event.preventDefault();
                var offset = this.refs['finderItem_'+currentNavIndex].offsetTop;
                this.refs.finderList.scrollTop = offset-28;
            }
        }

        //down
        if(event.keyCode === 40) {
            if (currentNavIndex < maxLength) {
                this.setState({navIndex: currentNavIndex+1});
                var offset = this.refs['finderItem_'+currentNavIndex].offsetTop;
                this.refs.finderList.scrollTop = offset;
                event.preventDefault();
            }
        }

        //enter
        if(event.keyCode === 13) {
            this.setAddress(currentNavIndex);
            event.preventDefault();
        }

    },

    onChangeInputHandler (e) {
        this.setState({showFinderList: true});

        var pattern  = e.target.value;

        if (!this.AddressFinder.isFull()) {
            this.AddressFinder.getAddressObjectList(pattern).then((resp) => {
                this.setState({addressesList: resp});
            });
        } else {
            this.setState({ addressesList: [], showFinderList: false});
            this.refs.entryInput.value = '';
        }

    },
    onChange() {
        this.props.onChange();
    },
    getFinderList() {
        var self = this;
        if (this.state.showFinderList){
            return <div className="finder-list_wrapper">
                    <div className="finder-list" ref="finderList">
                        {this.state.addressesList.map(function(item, index){
                            var cssClass = 'finder-list_item';
                            if (index === self.state.navIndex) {
                                cssClass = cssClass + ' active'
                            }

                            var ref = 'finderItem_'+index;

                            return <div className={cssClass} key={index} ref={ref} onClick={self.setAddress.bind(self, index)}> {self.AddressFinder.formatter(item, 'list')}</div>
                        })}
                    </div>
                </div>
        }
    },
    focusHandler(){
        setTimeout(()=> {
            this._input.focus();
        }, 0);
    },
    getBubbles(){

        if (this.AddressFinder && this.AddressFinder.currentAddress.address) {
            var bubbles = [];
            bubbles = this.AddressFinder.formatterCurrentToArray();

            return <div className="finder-entry_tab-wrapper">
                { bubbles.map(function(item, index){
                    return <div className="finder-entry_tab" key={index}> {item} </div>
                })}
            </div>
        }

        return  null;
    },
    render () {
        return <div className="finder-wrapper" onKeyDown={this.keyDownComponentHandler}>
                <div className="finder-entry_wrapper">
                    <div className={this.AddressFinder.isEmpty() ? "finder-entry_row -empty" : "finder-entry_row"  }>
                        {this.getBubbles()}
                        <input type="text" ref={(c) => this._input = c} className="finder-entry_input" ref="entryInput" onKeyDown={this.keyDownInputHandler}  placeholder={this.getPlaceholder()} onChange={this.onChangeInputHandler}/>
                    </div>
                </div>
                {this.getFinderList()}
            </div>
    }
})

export default AddressFinderInput;