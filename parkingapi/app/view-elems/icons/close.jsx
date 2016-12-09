import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function Close ({className = 'icon'}) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" >
            <path d="M14.3,15.7c-0.4,0.4-1,0.4-1.4,0L0.3,3.1C0,2.7,0,2.1,0.3,1.7l1.4-1.4c0.4-0.4,1-0.4,1.4,0l12.5,12.5c0.4,0.4,0.4,1,0,1.4L14.3,15.7z"/>
            <path d="M1.7,15.7c0.4,0.4,1,0.4,1.4,0L15.7,3.1c0.4-0.4,0.4-1,0-1.4l-1.4-1.4c-0.4-0.4-1-0.4-1.4,0L0.3,12.9c-0.4,0.4-0.4,1,0,1.4L1.7,15.7z"/>
        </svg>
    );
}
