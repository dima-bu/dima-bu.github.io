import React from 'react'
import { IndexLink } from 'react-router'
import './Contacts.scss'
import Bubble from './../Bubble/Bubble.js'
import Button from './../Button/Button.js'
import Time from './../Time/Time.js'
import {tr} from 'lib/locale.js'
import Link from './../Link/Link.js'
import Mail from './../SVG/Mail.js'
import Skype from './../SVG/Skype.js'
import VKLink from './../SVG/VKLink.js'
import FacebookLink from './../SVG/FacebookLink.js'
import UpworkImg from './assets/logo-upwork@2x.jpg';
import GoodFirmsImg from './assets/logo-goodfirms@2x.jpg';

export const Contacts = (props) => (

  <div className="clearfix">
    <div className="clearfix right-bubble bubble-row container">
      <div className="bubble-wrapper ">
        <Time />
        <Bubble isHiddenText={props.isHiddenText} size="md" type="secondary" rightPosition>
          {tr('HI_CONTACTS_LINK_TEXT', true)}
        </Bubble>
      </div>
    </div>

    <div className="clearfix bubble-row container">
      <div className="bubble-wrapper">
        <Time from/>
        <Bubble size="lg" type="primary" autoWidth isHiddenText={props.isHiddenText}>
          {tr('CONTACTS_SIMPLE', true)}
        </Bubble>
      </div>
    </div>
    <div className="clearfix bubble-row container">
      <div className="bubble-wrapper">
        <Time from/>
        <Bubble size="lg" type="primary" autoWidth isHiddenText={props.isHiddenText}>
          <div  style={{marginBottom: '15px'}} >
            <Link caption='develop@rosberry.com' url="mailto:develop@rosberry.com">
              <Mail />
            </Link>
          </div>
          <div style={{marginBottom: '15px'}}>
            <Link caption='rosberry4u'>
              <Skype />
            </Link>
          </div>
          <div className="d-flex align-items-center"  style={{lineHeight: '0'}}>
            <FacebookLink style={{marginRight: '20px'}} />
            <VKLink />
          </div>
        </Bubble>
      </div>
    </div>

    <div className="clearfix bubble-row container">
      <div className="bubble-wrapper">
        <Time from/>
        <Bubble size="lg" type="primary" autoWidth>
          <div style={{marginBottom: '15px'}}>
            <img src={UpworkImg} width="215" height="60" alt=""/>
          </div>
          {tr('CONTACTS_EXPERIENCE', true)}
          <div style={{marginTop: '25px'}}>
            <Button isLink caption={tr('SEE_PORTFOLIO', true)} />
          </div>
        </Bubble>
      </div>
    </div>

    <div className="clearfix bubble-row container">
      <div className="bubble-wrapper">
        <Time from/>
        <Bubble size="lg" type="primary" autoWidth>
          <div style={{marginBottom: '15px'}}>
            <img src={GoodFirmsImg} width="301" height="44" alt=""/>
          </div>
          {tr('CONTACTS_GOODFIRM', true)}
          <div style={{marginTop: '25px'}}>
            <Button isLink caption={tr('READ_INTERVIEW', true)} />
          </div>
        </Bubble>
      </div>
    </div>

    <div className="clearfix bubble-row container">
      <div className="bubble-wrapper">
        <Time from/>
        <Bubble size="lg" type="primary" autoWidth>
          {tr('CONTACTS_COME_AGAIN', true)}
        </Bubble>
      </div>
    </div>
  </div>
)

export default Contacts;
