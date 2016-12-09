import React from 'react';
import ReactDOM from 'react-dom';
import Route from './../icons/route.jsx';
import Order from './../../sdk/order-model.js';

var CostSection = React.createClass({
    getInitialState() {

        if (Order._estimate.path) {
            return {
                estimate: Order._estimate
            }
        }
        return {
            estimate: {path: { distance: null }, total: null}
        }
    },

    setEstimate(resp){
        this.setState({
            estimate: resp
        })
    },

    componentDidMount() {

        var setEstimate = (resp)=>{
            this.setEstimate(resp);
        }

        Order.onEstimateUpdate(setEstimate)
    },

    componentWillUnmount() {
        Order.events.remove('estimateUpdate', 'setEstimate');
    },

    render() {

        var distance_km = (this.state.estimate.path.distance/1000).toFixed(2),
            total = this.state.estimate.total;

        if (total && total > 0) {
            var totalLocal = total.toLocaleString('ru');
        }

        if (distance_km > 0 || (total && totalLocal)) {
            return <div className={this.props.isBottom ? 'bottom-description' : ''}>
                <div className={this.props.className}>
                    <div className="row-wrapper row-distance-cost">

                        <div className="area-section_icon cell-wrapper -narrow">
                            <div className="area-section_icon-inner">
                                <Route />
                            </div>
                        </div>

                        <div className="cell-wrapper -full">
                            <div className="distance-cost_title normal">
                            {distance_km} км
                            </div>
                        </div>
                        <div className="cell-wrapper -narrow -left-pad">
                            <div className="price g-brand-text  -mega">
                                <span>{totalLocal}</span>
                                <span className="rub">Р</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        }
        return null
    }
    });


export default CostSection;