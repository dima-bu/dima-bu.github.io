import React from 'react';
import ReactDOM from 'react-dom';

var Timer = React.createClass({
    getInitialState: function() {
        var time = this.props.time;
        return { secondsElapsed: time };
    },
    tick: function() {
        if (this.state.secondsElapsed === 0) {
            clearInterval(this.interval);
            this.setState({secondsElapsed: this.props.text});
            this.props.endTimerAction();
        } else {
            this.setState({secondsElapsed: this.state.secondsElapsed - 1});
        }

    },
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    render: function() {
        return (
            <span>{this.state.secondsElapsed}</span>
        );
    }
});

export default Timer;
