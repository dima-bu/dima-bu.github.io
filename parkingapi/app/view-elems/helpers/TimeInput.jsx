import React from 'react';
import ReactDOM from 'react-dom';

var TimeInput = React.createClass({




    _onChange(e){
        this.props.onChange(e)
    },

    _onKeyDown(e) {
        e.target.value = this._getDisplayValue();
        this.props.onChange(e)
    },
    _onKeyPress(e){
        this.props.onChange(e)
    },
    _getDisplayValue(){
        return ''
    },
    render() {
        return <div>
            <input ref="r_input"
                type="text"
                className={this.props.className}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
                onKeyPress={this._onKeyPress}
                value={this._getDisplayValue()}
            />
        </div>
    }
});

export default TimeInput
