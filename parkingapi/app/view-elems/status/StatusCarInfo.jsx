import React from 'react';
import ReactDOM from 'react-dom';

class OrderStatusCarInfo extends React.Component {
    render() {
        let model = this.props.brand + ' ' +this.props.model;
        return <div className="area-section_row -without-left row-wrapper">
                    <div className="cell-wrapper -full">
                        <div className="status-section_subtitle">{model}</div>
                        <div className="status-section_subtitle -smaller">{this.props.color}</div>
                    </div>
                    <div className="cell-wrapper -narrow">
                        <div className="regnum">{this.props.regnum}</div>
                    </div>
            </div>
    }
}
export default OrderStatusCarInfo;