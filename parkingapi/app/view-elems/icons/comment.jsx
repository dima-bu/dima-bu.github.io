import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default ({className = 'icon'}) => {
    return (
        <svg className={className} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24px" height="24px" viewBox="0 0 24 24">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H6l-2,2V4h16V16z"/>
        </svg>
        );
}
