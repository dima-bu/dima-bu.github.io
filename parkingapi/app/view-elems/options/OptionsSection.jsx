import React from 'react';
import ReactDOM from 'react-dom';
import ArrowRight from './../icons/arrow-right.js'
import Order from './../../sdk/order-model.js'
import Options from './../../sdk/options.js'
import {filter} from 'lodash'
import OptionTag from './OptionsTag.jsx';
import translate from './../../sdk/translate.js';


var OptionsSection = React.createClass({
    getInitialState() {
        return {
            selectedOptions: []
        }
    },
    showOptionsModal() {
        if(this.props.isLocked) {
            return false;
        }

        this.props.setActiveSection(null);
        this.props.openModal('options');
    },

    componentDidMount() {

        Order.onRejectOrder(()=>{
            this.setState({
                selectedOptions: []
            })
        });

        Order.onOptionUpdate( ()=> {
            Options.getSelectedOptions().then((data) => {
                this.setState({
                    selectedOptions: data
                })
            });
        })
    },

    render() {

        if(Options.getTariffOptions() && Options.getTariffOptions().length > 0) {
            return <section className={`area-section ${!this.props.isLocked ? 'g-pointer' : ''}`}  onClick={this.showOptionsModal} >
                <div className="row-wrapper">
                    <div className="cell-wrapper -full">
                        <h3 className="area-section_title -pure g-uppercase">{translate("REQUIREMENTS")}</h3>
                    </div>
                    <div className="cell-wrapper -narrow">
                        <ArrowRight className="arrow-right-sm arrow-right-icon"/>
                    </div>
                </div>
                <div className="row-wrapper tag-row tag-list">
                    {this.state.selectedOptions.map((item)=> {
                        if (item.checked) {
                            return <OptionTag isLocked={this.props.isLocked} type={item.type} title={item.name} idAttr={item.id} key={item.id} price={item.value}  />
                        }
                    })}
                </div>
            </section>
        }

        return null;

    }
});

export default OptionsSection;