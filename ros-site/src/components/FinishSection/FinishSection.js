import React from 'react'
import { IndexLink } from 'react-router'
import Bubble from './../Bubble/Bubble.js'
import Button from './../Button/Button.js'
import Time from './../Time/Time.js'
import {tr} from 'lib/locale.js'
import Link from './../Link/Link.js'
import Mail from './../SVG/Mail.js'
import Skype from './../SVG/Skype.js'
import VKLink from './../SVG/VKLink.js'
import FacebookLink from './../SVG/FacebookLink.js'
import GSAP from 'react-gsap-enhancer'
import { TweenLite, TimelineMax, Power4 } from 'gsap'
import throttle from 'lodash.throttle';
import Scroll from 'react-scroll';


//function createAnim(utils) {
//  const finishSection = utils.target.find({name: 'finishSection'});
//
//  return new TimelineMax()
//    .to(finishSection, 0.8, {
//      css: {
//        transform: 'translateX(0px)',
//        opacity: 1
//      },
//      ease: Power4.easeOut
//    })
//}

function scrollAnimation(utils) {
  const AnimationBubble = utils.target.find({name: utils.options.name});
  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.7,
      ease: Power4.easeOut
    })
}

class FinishSection extends React.Component {

  constructor(props) {
    super(props);
    this.scrollFunc = () => {
      var self = this;

      var scrolled = window.pageYOffset;
      var screenHeight = screen.height;
      var BubbleOffset = document.getElementById('finishSection').offsetTop;

      if ((scrolled + screenHeight) > (BubbleOffset)) {
        self.addAnimation(scrollAnimation, {name: 'finishSection'});
      }
    }
  }

  componentWillMount(){
    setTimeout(() => {
      //this.anim2 = this.addAnimation(createAnim);
      //this.scrollFunc();
      //TweenLite.to(window, 1, {scrollTo:{y: document.getElementById('simple').offsetTop, x:0}, ease: Power2.easeInOut});
    });
  }

  componentWillReceiveProps(){
    if (this.scrollFunc) {
      this.scrollFunc();
    }
  }

  render(){
    return (
     <div className="clearfix">
        <div className="clearfix bubble-row container" id="finishSection" name="finishSection" style={{opacity: 0, transform: 'translateX(-100px)'}}>
        <div className="bubble-wrapper">
          <Time from/>
          <Bubble size="lg" type="primary" className="w_70p" isHiddenText={this.props.isHiddenText}>
            {tr('CONTACTS_COME_AGAIN', true)}
          </Bubble>
        </div>
        </div>
      </div>)
  }
}

export default (GSAP(FinishSection));