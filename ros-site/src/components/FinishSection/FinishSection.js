import React from 'react'
import Bubble from './../Bubble/Bubble.js'
import Time from './../Time/Time.js'
import { tr } from 'lib/locale.js'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Power4 } from 'gsap'

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

function scrollAnimationFinish (utils) {
  console.log('scrollFuncFinishs123', utils)
  const AnimationBubble = utils.target.find({ name: utils.options.name })
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

  constructor (props) {
    super(props)
    var self = this
    this.scrollFuncFinish = () => {
      var BubbleOffset = document.getElementById('finishSection').offsetTop
      var scrolled = window.pageYOffset
      var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      console.log('scrollFuncFinishs', scrolled + screenHeight, BubbleOffset)
      if ((scrolled + screenHeight) > (BubbleOffset)) {
        self.addAnimation(scrollAnimationFinish, { name: 'finishSection' })
      }
    }
  }

  componentWillMount () {
    setTimeout(() => {
      // this.anim2 = this.addAnimation(createAnim);
      this.scrollFuncFinish()
      // TweenLite.to(window, 1, {scrollTo:{y: document.getElementById('simple').offsetTop, x:0}, ease: Power2.easeInOut});
    })
  }

  componentWillReceiveProps () {
    if (this.scrollFuncFinish) {
      console.log('componentWillReceiveProps')
      this.scrollFuncFinish()
    }
  }

  getStyle (isRight) {
    if (this.isFinish) {
      return { opacity: 1 }
    } else {
      if (isRight) {
        return { opacity: 0, transform: 'translateX(100px)' }
      } else {
        return { opacity: 0, transform: 'translateX(-100px)' }
      }
    }
  }

  render () {
    return (
      <div className='clearfix'>
        <div className='clearfix bubble-row container' id='finishSection' name='finishSection'
          style={{ opacity: 0, transform: 'translateX(-100px)' }}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' className='w_70p br-desctop' isHiddenText={this.props.isHiddenText}>
              {tr('CONTACTS_COME_AGAIN', true)}
            </Bubble>
          </div>
        </div>
      </div>)
  }
}

export default (GSAP(FinishSection));
