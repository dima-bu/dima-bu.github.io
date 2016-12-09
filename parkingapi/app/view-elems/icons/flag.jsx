import React from 'react';
import ReactDOM from 'react-dom';
import createIconClass from './../helpers/IconHelper.js';

export default function Flag({iconName="flag", iconSize = 'sm'}) {
    let cssName = createIconClass(iconName, iconSize);
    return (
        <svg className={cssName} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
            viewBox="0 0 20 20">
            <path d="M18,0c0,0-1.1,2-4,2s-3.9-2-7-2S2,2,2,2v11c0,0,2.1-2,5-2c2.9,0,4,2,7,2s4-2,4-2V0z"/>
            <rect x="2" y="8" width="2" height="11"/>
        </svg>

    );
}
