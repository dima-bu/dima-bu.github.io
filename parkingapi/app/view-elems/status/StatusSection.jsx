import React from 'react';
import ReactDOM from 'react-dom';
import StatusCarInfo from  './StatusCarInfo.jsx';
import StatusGeneral from './StatusGeneral.jsx';
import StatusIcon from './StatusIcon.jsx';
import Order from './../../sdk/order-model.js';
let StatusCarInfoSubsection = null;
var StatusSection = React.createClass({

    getInitialState() {
       return { status: {state: null} }
    },

    componentDidMount() {


        Order.onRejectOrder(()=>{
            this.setState({
                status: { state: null, assignee: null }
            });
        });

        Order.onStatusUpdate( (resp)=> {

            this.setState({
                status: resp,
                flicrer: true
            });

            setTimeout(()=> {
                this.setState({
                    flicrer: false
                })
            }, 5000);
        })
    },

    render() {

        if (this.state.status.assignee) {

            let model = this.state.status.assignee.car.model,
                brand = this.state.status.assignee.car.brand,
                color =  this.state.status.assignee.car.color,
                regnum = this.state.status.assignee.car.regNum;

                StatusCarInfoSubsection = <StatusCarInfo model={model} brand={brand} color={color} regnum={regnum} />
        }

        if (this.state.status.state) {
            return <section className={`area-section -light status-section ${this.state.flicrer ? 'flicrer' : ''}`}>
                <StatusGeneral setActiveModal={this.props.setActiveModal} statusId={this.state.status.state} />
                {StatusCarInfoSubsection}
            </section>
        }

        return null;
    }
})
export default StatusSection;