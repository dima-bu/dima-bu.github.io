import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Gif.scss'
import Gifka1 from './assets/320.gif'
import Bubble from 'components/Bubble/Bubble.js'
import {tr} from 'lib/locale.js';


export const Gif = () => (
    <div className="clearfix">
      <Bubble type="secondary" size="lg" rightPosition>{tr('HI_GIF_LINK_TEXT')}</Bubble>
      <div className="chat-item -full">
        <img src={Gifka1} alt=""/>
      </div>
    </div>
)

export default Gif;
