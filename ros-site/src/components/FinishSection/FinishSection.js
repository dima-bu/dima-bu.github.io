import React from 'react'
import Bubble from './../Bubble/Bubble.js'
import Time from './../Time/Time.js'
import { tr } from 'lib/locale.js'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Power4 } from 'gsap'
import unicornImg from './assets/unicorn.png'
import unicornImg2 from './assets/unicorn2.png'
import unicornImg3 from './assets/unicorn3.png'
import './FinishSections.scss'

// function createAnim(utils) {
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
      if (!props.isFull) {
        return false
      }
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

  reloadPage (e) {
    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '2') {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '1') {
      sessionStorage.setItem('touchCount', 2)
    } else {
      sessionStorage.setItem('touchCount', 1)
    }
    // e.preventDefault()
    // location.reload()
  }

  getUnicornText () {
    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '1') {
      return tr('DONT_TOUCH_DOCTOR', true)
    }
    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '2') {
      return ''
    }
    return tr('DONT_TOUCH_UNICORN', true)
  }

  getUnicornImg () {
    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '1') {
      return <img src={unicornImg2} width='155' height='74' alt='' />
    }
    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '2') {
      return <img src={unicornImg3} width='226' height='59' alt='' />
    }
    return <img src={unicornImg} width='59' height='56' alt='' />
  }

  getClassName () {
    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '1') {
      return 'clearfix bubble-row container unicorn-section oneTouch'
    }

    if (sessionStorage.getItem('touchCount') && sessionStorage.getItem('touchCount') === '2') {
      return 'clearfix bubble-row container unicorn-section secondTouch'
    }

    return 'clearfix bubble-row container unicorn-section'
  }

  render () {
    return (
      <div className='clearfix'>
        {this.props.isFull &&
          <div className='clearfix bubble-row container' id='finishSection' name='finishSection'
               style={{ opacity: 0, transform: 'translateX(-100px)' }}>
            <div className='bubble-wrapper'>
              <Time from />
              <Bubble size='lg' type='primary' className='w_70p br-desctop' isHiddenText={this.props.isHiddenText }>
                {tr('CONTACTS_COME_AGAIN', true)}
              </Bubble>
            </div>
          </div>
        }
        <div className={this.getClassName()} id='unicornSection' name='unicornSection'>
          <div className='bubble w_70p'>
            <a href='dima-bu.github.io/ros-site/dist/' onClick={this.reloadPage} className='unicorn_link' >
              <span className='unicorn_wrapper'>
                {this.getUnicornImg()}
                <span className='unicorn-section_text'>{this.getUnicornText()}</span>
              </span>
            </a>
          </div>
        </div>
      </div>)
  }
}

export default (GSAP(FinishSection))
