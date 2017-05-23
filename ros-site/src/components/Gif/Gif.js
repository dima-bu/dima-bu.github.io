import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Gif.scss'
import Gifka1 from './assets/320.gif'
import Bubble from 'components/Bubble/Bubble.js'
import Time from './../Time/Time.js'
import {tr} from 'lib/locale.js'
import video from './assets/320.mp4'

export const Gif = (props) => (
    <div className="clearfix">

      <div className="clearfix right-bubble bubble-row container">
        <div className="bubble-wrapper ">
          <Time />
          <Bubble type="secondary" size="md" isHiddenText={props.isHiddenText} rightPosition>{tr('HI_GIF_LINK_TEXT')}</Bubble>
        </div>
      </div>

      <div className="clearfix bubble-row container">
        <div className="bubble-wrapper">
          <Time from/>
          <Bubble size="lg" type="primary" autoWidth withVideo>
            <video id="background-video" autoplay="autoplay" loop autoPlay>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Bubble>
        </div>
      </div>

    </div>
)

export default Gif;
