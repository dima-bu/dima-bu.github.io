import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function ArrowRight({className = 'icon'}){
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"v
            viewBox="0 0 7.8 12.3">
            <path fill-rule="evenodd" d="M7.8 6.2l-6.2 6.2-1.4-1.5 4.7-4.7L0 1.5 1.5 0l6.3 6.2z"/>
        </svg>
    );
}
