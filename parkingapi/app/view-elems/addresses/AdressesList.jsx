import React from 'react';
import ReactDOM from 'react-dom';
import Order from './../../sdk/order-model.js';
import AddressItem from './AddressItem.jsx';
import AddressItemShort from './AddressItemShort.jsx';
import CostSection from './../cost/CostSection.jsx';

var AddressList = React.createClass({

    isActive (section) {
        return this.props.activeSection === section;
    },

    setActiveSection (section) {
        if (this.props.activeSection !== section) {
            this.props.setActiveSection(section);
        }
    },

    addFinder (ind) {
        Order.addFinder('');
        this.forceUpdate();
    },

    deleteItem (index) {
        if (Order._addresses_list.length > 1) {
            Order._addresses_list.splice(index, 1);
        }

        this.forceUpdate();
    },

    switchItems (index) {

        let temp = Order._addresses_list[index - 1];
        Order._addresses_list[index - 1] = Order._addresses_list[index];
        Order._addresses_list[index] = temp;
        this.setActiveSection('nnull');
        this.forceUpdate();
    },

    render () {

        if (!this.props.isLocked) {
            return <div className="addresses-list">
            {Order._addresses_list.map((item, index, array) => {
                return <AddressItem key={index} addFinder={this.addFinder} switchItems={this.switchItems} deleteItem={this.deleteItem} isLocked={this.props.isLocked} isLast={index + 1 === array.length ? true : false} setActiveSection={this.setActiveSection} isActive={this.isActive('address-' + index)} index={index} />
            })}
            </div>
        }

        return <section className="area-section">
            <h3 className="area-section_title g-uppercase">Заказ</h3>
            {Order._addresses_list.map((item, index, array) => {
                return <AddressItemShort key={index} addFinder={this.addFinder} swithItems={this.swithItems} deleteItem={this.deleteItem} isLocked={this.props.isLocked} isLast={index + 1 === array.length ? true : false} setActiveSection={this.setActiveSection} isActive={this.isActive('address-' + index)} index={index} />
            })}
            <CostSection/>
        </section>

    }
});

export default AddressList;