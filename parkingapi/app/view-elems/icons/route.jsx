import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function Route({iconName="route", iconSize = 'sm'}) {
    let cssName = createIconClass(iconName, iconSize);
    return (
    <svg className={cssName} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 19 15.5">
        <path d="M12,15.5c-2.2,0-4-1.8-4-4v-7c0-1.1-0.9-2-2-2s-2,0.9-2,2v6H2v-6c0-2.2,1.8-4,4-4s4,1.8,4,4v7
	c0,1.1,0.9,2,2,2s2-0.9,2-2v-9h2v9C16,13.7,14.2,15.5,12,15.5z"/>
        <path d="M3,15.5c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S4.7,15.5,3,15.5z M3,11.5c-0.6,0-1,0.4-1,1s0.4,1,1,1
	s1-0.4,1-1S3.6,11.5,3,11.5z"/>
        <polygon points="17.3,5.2 15,2.9 12.7,5.2 11.3,3.8 15,0.1 18.7,3.8 "/>
    </svg>
    );
}
