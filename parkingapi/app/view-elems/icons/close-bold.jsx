import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function CloseBold ({className = 'icon'}) {
    return (
        <svg className={className} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 10 10" >
            <rect x="-0.7" y="3.6" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 5 12.0711)" width="11.3" height="2.8"/>
            <rect x="-0.7" y="3.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.0711 5)" width="11.3" height="2.8"/>
        </svg>
    );
}
