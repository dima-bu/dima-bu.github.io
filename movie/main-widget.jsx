import React from 'react';
import ReactDOM from 'react-dom';
import http from './http.js';
import Movie from './movie.js'

var MainWidget = React.createClass({
    //getInitialState () {
    //    return {activeSection: null, isLocked: false, activeModal: null, fullView: false }
    //},
    componentWillMount () {
        var keys = window.location.search
            .substring(1)
            .split("&");

        var params = {};

        for(var i = 0; i < keys.length; i++) {
            var parse = keys[i].split('=');
            params[parse[0]] = parse[1]
        }

        //http.setContext(params.context);

        http.setGlobalUrl('https://api.themoviedb.org/3/movie');

        Movie.estimate().then((resp) => {
                debugger;
                this.forceUpdate();
            }
        )
    },
    componentDidMount () {
        //Order.onEstimateUpdate(()=> {
        //    this.setState({
        //        selectedOptions: Options.getSelectedOptions()
        //    })
        //});

    },

    render () {
        return <div className="widget-wrapper">
        </div>
    }
});

ReactDOM.render(<MainWidget/>, document.getElementById('MainWidget'));