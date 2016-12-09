import React from 'react';
import ReactDOM from 'react-dom';
import '!style!css!less!../../less/header.less';
import Logo from './icons/logo.jsx';

export default class Header extends React.Component {
    render() {
        return <header className="header">
            <Logo className="logo-sm logo-header"/>
        </header>
    }
};
