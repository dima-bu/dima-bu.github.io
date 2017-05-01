import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Gif.scss'
import Gifka1 from './assets/320.gif'

export const Gif = () => (
    <div className="clearfix">
      <div className="chat-item -to">
        А есть какая нибудь интересная гифочка?
      </div>
      <div className="chat-item -full">
        <img src={Gifka1} alt=""/>
      </div>
    </div>
)

export default Gif;
