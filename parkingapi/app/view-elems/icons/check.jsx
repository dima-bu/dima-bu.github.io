import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function Check ({className = 'icon'}) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 19 14" enable-background="new 0 0 19 14" >
            <g>
                <path d="M18.3,2.2c0.4,0.4,0.4,1,0,1.4l-9.7,9.7c-0.4,0.4-1,0.4-1.4,0l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4l9.7-9.7c0.4-0.4,1-0.4,1.4,0L18.3,2.2z"/>
                <path d="M10,10.5c0.4,0.4,0.4,1,0,1.4l-1.4,1.4c-0.4,0.4-1,0.4-1.4,0L0.7,6.8c-0.4-0.4-0.4-1,0-1.4L2.1,4c0.4-0.4,1-0.4,1.4,0L10,10.5z"/>
            </g>
        </svg>
    );
}
