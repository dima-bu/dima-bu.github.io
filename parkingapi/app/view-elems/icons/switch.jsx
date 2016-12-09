import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function Switch ({className = 'icon'}) {
    return (
        <svg className={className} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 11 13" >
            <polygon points="0,3.5 3.5,0 7,3.5 4.5,3.5 4.5,7.5 2.5,7.5 2.5,3.5 "/>
            <polygon points="11,9.5 7.5,13 4,9.5 6.5,9.5 6.5,5.5 8.5,5.5 8.5,9.5 "/>
        </svg>
    );
}
