import React from 'react';
import ReactDOM from 'react-dom';

import AssignDriver from  './../icons/assign-driver.jsx';
import CarWaiting from  './../icons/car-waiting.jsx';
import CarInWork from  './../icons/car-in-work.jsx';
import Flag from  './../icons/flag.jsx';
import constants from  './../../sdk/constants.js';

class StatusIcon extends React.Component {

    getIcon(statusId) {

        switch (parseInt(statusId, 10)) {
            case (constants.orderStatus.CREATED):
                return <Flag />;
            case (constants.orderStatus.CAR_ASSIGNED):
                return <AssignDriver />;
            case (constants.orderStatus.CAR_ARRIVED):
                return <CarWaiting />;
            case (constants.orderStatus.IN_PROGRESS):
                return <CarInWork />;
            default:
                return <Flag />;
        }
    }

    render() {
        return this.getIcon(this.props.statusId);

    }
}

export default StatusIcon;