import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default ({iconSize='sm', iconName = 'car-in-work'}) => {
    let cssName = createIconClass(iconName, iconSize);
    return (
        <svg className={cssName} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
            viewBox="0 0 21 12">
            <path  d="M17,0H4C1.8,0,0,1.8,0,4v8h21V4C21,1.8,19.2,0,17,0z M6,6H3V3h3V6z M9,9H6V6h3V9z M12,6H9V3h3V6z M15,9h-3V6
	h3V9z M18,6h-3V3h3V6z"/>
        </svg>
    );
}
