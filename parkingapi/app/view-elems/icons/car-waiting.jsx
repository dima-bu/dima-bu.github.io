import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default ({iconSize='sm', iconName = 'car-waiting'})=> {
	let cssName = createIconClass(iconName, iconSize);
    return (
        <svg className={cssName} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 22">
            <path d="M21.7,13h-1.4c-0.1,0-0.1,0-0.2,0.1c-0.4-0.7-0.9-1.3-1.2-1.6c-0.4-0.4-1.2-0.6-2.3-0.8V9.4
	c-0.9-0.1-1.9-0.2-2.6-0.2c-0.7,0-1.6,0-2.6,0.2v1.3c-1.1,0.2-1.9,0.4-2.3,0.8c-0.3,0.4-0.8,0.9-1.2,1.6C7.8,13,7.7,13,7.7,13H6.3
	C6.1,13,6,13.1,6,13.3v0.6c0,0.2,0.1,0.3,0.3,0.4l0.8,0.2c-0.7,1.6-1.1,3.7-0.5,5.7v1.2c0,0.3,0.1,0.6,0.2,0.6h1.6
	c0.1,0,0.2-0.3,0.2-0.6v-1c1.4,0.1,3.4,0.3,5.4,0.3c2,0,4-0.1,5.4-0.3v1c0,0.3,0.1,0.6,0.2,0.6h1.6c0.1,0,0.2-0.3,0.2-0.6l0-1.2
	c0.7-2,0.2-4.1-0.5-5.7l0.8-0.2c0.2,0,0.3-0.2,0.3-0.4v-0.6C22,13.1,21.8,13,21.7,13z M8.6,18.1c-0.6,0-1.1-0.5-1.1-1.1
	c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C9.7,17.5,9.2,18.1,8.6,18.1z M7.6,14.8c0.6-1.4,1.4-2.4,1.9-3c0.4-0.4,2-0.8,4.5-0.8
	s4.1,0.4,4.5,0.8c0.5,0.5,1.3,1.6,1.9,3C19,15,16.5,14.6,14,14.6S8.9,15,7.6,14.8z M19.4,18.1c-0.6,0-1.1-0.5-1.1-1.1
	c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1C20.5,17.5,20,18.1,19.4,18.1z"/>
            <path  d="M0,0v22h4.7c0-0.2-0.1-0.4-0.1-0.6v-0.9c0-0.2-0.1-0.3-0.1-0.5H2v-3h2.4c0.1-0.5,0.1-1,0.3-1.4
	c-0.2-0.2-0.3-0.4-0.4-0.6H2v-3h2.4c0.4-0.6,1.1-1,1.9-1h0.5c0.3-0.4,0.5-0.7,0.8-1c0,0,0,0,0,0H7V7h3v0.6l1.1-0.1
	c1.1-0.1,2.1-0.2,2.8-0.2c0.7,0,1.8,0,2.9,0.2l0.2,0V0H0z M2,2h2.9v3H2V2z M5,10H2V7h3V10z M10,5H7V2h3V5z M15,5h-3V2h3V5z"/>
        </svg>
    );
}