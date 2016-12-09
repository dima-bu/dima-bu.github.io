import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function ArrowBottom({className = 'icon'}){
    return (
    <svg className={className} baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.3 7.8">
        <path fill-rule="evenodd" fill="#606c6e" d="M6.2 7.8L0 1.6 1.5.2l4.7 4.7L10.8 0l1.5 1.5-6.1 6.3z"/>
    </svg>
    );
}
