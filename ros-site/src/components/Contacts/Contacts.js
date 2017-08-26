import React from 'react'
import './Contacts.scss'
import Bubble from './../Bubble/Bubble.js'
import Button from './../Button/Button.js'
import Time from './../Time/Time.js'
import { tr } from 'lib/locale.js'
import Link from './../Link/Link.js'
import Mail from './../SVG/Mail.js'
import Skype from './../SVG/Skype.js'
import VKLink from './../SVG/VKLink.js'
import FacebookLink from './../SVG/FacebookLink.js'
import UpworkImg from './assets/logo-upwork@2x.jpg'
import GoodFirmsImg from './assets/logo-goodfirms@2x.jpg'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Power4 } from 'gsap'
import Scroll from 'react-scroll'

function createAnimContacts (utils) {
  const hiContacts = utils.target.find({ name: 'hiContacts' })
  const simple = utils.target.find({ name: 'simple' })
  // начальная анимация появления первых двух баблов
  return new TimelineMax()
    .to(hiContacts, 0.8, {
      css: {
        transform: 'matrix(1, 0, 0, 1, 0, 0);',
        opacity: 1
      },
      ease: Power4.easeOut,
      onComplete: () => {
      }
    })
    .to(simple, 0.8, {
      css: {
        transform: 'matrix(1, 0, 0, 1, 0, 0);',
        opacity: 1
      },
      ease: Power4.easeOut,
      onComplete: () => {
        this.data = { finish : true }

        // проверку на то что уже проскролели вниз
        if (window.pageYOffset + 100 > document.getElementById('simple').offsetTop) {
          Scroll.animateScroll.scrollTo(window.pageYOffset + 1, {
            duration: 400,
            smooth: true
          })
        } else {
          if (utils.options.isClicked) {
            var hiContactsOffset = document.getElementById('hiContacts').offsetTop
            // var hiContactsHeight = document.getElementById('hiContacts').offsetHeight
            var simpleContactsOffset = document.getElementById('simple').offsetTop
            var simpleContactsHeight = document.getElementById('simple').offsetHeight

            // var delta = hiContactsOffset - window.pageYOffset
            var screenHeight = window.innerHeight

            // console.log('pageYOffset  ', window.pageYOffset)
            // console.log('hiContactsHeight ', hiContactsHeight)
            // console.log('delta ', delta)

            // если это не первое открытие и больльшая delta
            if (window.location.hash && window.location.hash !== '#contacts') {
              Scroll.animateScroll.scrollTo((simpleContactsOffset - screenHeight + (simpleContactsHeight / 2) + 20), {
                duration: 400,
                smooth: true
              })
            } else {
              Scroll.animateScroll.scrollTo(hiContactsOffset, {
                duration: 400,
                smooth: true
              })
            }
          } else {
            Scroll.animateScroll.scrollTo(window.pageYOffset + 1, {
              duration: 400,
              smooth: true
            })
          }
        }
      }
    })
}

function scrollAnimationContacts (utils) {
  const AnimationBubble = utils.target.find({ name: utils.options.name })

  if (utils.options.self.isFinish) {
    return false
  }

  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'matrix(1, 0, 0, 1, 0, 0)',
        opacity: 1
      },
      delay: 0.2,
      ease: Power4.easeOut,
      onComplete: () => {
        if (utils.options.name === 'upwork') {
          utils.options.self.isFinish = true
        }
      }
    })
}

class Contacts extends React.Component {

  constructor (props) {
    super(props)
    this.scrollBubbles = ['soc', 'upwork']
    this.currentBubble = ''
    this.isFinish = false
    var self = this

    this.scrollFuncContacts = () => {
      var scrolled = window.pageYOffset
      var screenHeight = screen.height
      var BubbleOffset = document.getElementById(self.scrollBubbles[0]).offsetTop
      var delta = 100

      if ((scrolled + screenHeight - delta) > (BubbleOffset) && self.currentBubble === '') {
        self.currentBubble = self.scrollBubbles[0]
        if (!self.isFinish) {
          self.addAnimation(scrollAnimationContacts, { name: self.currentBubble, self: self })
        }
        self.scrollBubbles.splice(0, 1)
        self.currentBubble = ''
      }

      // self.scrollBubbles.forEach(bubble => {
      //  var BubbleOffset = document.getElementById(bubble).offsetTop
      //
      //  if ((scrolled + screenHeight) > (BubbleOffset) && self.animContacts.data && self.animContacts.data.finish && self.scrollBubbles.indexOf(bubble) === 0) {
      //    var findIndex = self.scrollBubbles.findIndex(item => {
      //      return item === bubble
      //    })
      //    self.addAnimation(scrollAnimationContacts, { name: bubble })
      //    self.scrollBubbles.splice(findIndex, 1)
      //    if (self.scrollBubbles.length === 0) {
      //      self.reset()
      //    }
      //  }
      // })
    }
  }

  reset () {
    this.__runningAnimations.clear()
  }

  componentWillMount () {
    setTimeout(() => {
      this.animContacts = this.addAnimation(createAnimContacts, { isClicked: this.props.isClicked })
      this.scrollFuncContacts()
    })
  }

  componentWillReceiveProps () {
    // на каждое изменение положения экрана (с задержкой 500мс) запускать функцию
    if (this.scrollFuncContacts && this.scrollBubbles.length) {
      this.scrollFuncContacts()
    } else {
      return false
    }
  }

  getStyle (isRight) {
    if (this.scrollBubbles.length === 0 && this.isFinish) {
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
    const props = this.props
    return (
      <div className='clearfix'>
        <div className='clearfix right-bubble bubble-row container' name='hiContacts' id='hiContacts'
          style={this.getStyle(true)}>
          <div className='bubble-wrapper '>
            <Time />
            <Bubble isHiddenText={props.isHiddenText} size='md' className='w_35p' type='secondary' rightPosition>
              {props.index === 0 &&
              tr('HI', true)
              }
              {tr('HI_CONTACTS_LINK_TEXT', true)}
            </Bubble>
          </div>
        </div>

        <div className='clearfix bubble-row container' name='simple' id='simple' style={this.getStyle()}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' className='w_60p br-all' isHiddenText={props.isHiddenText}>
              {tr('CONTACTS_SIMPLE', true)}
            </Bubble>
          </div>
        </div>

        <div className='clearfix bubble-row container' name='soc' id='soc' style={this.getStyle()}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' autoWidth isHiddenText={props.isHiddenText} >
              <div style={{ marginBottom: '15px' }} >
                <Link caption='develop@rosberry.com' url='mailto:develop@rosberry.com'>
                  <Mail />
                </Link>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <Link caption='rosberry4u'>
                  <Skype />
                </Link>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <Link caption={tr('FB_NAME')} url='https://www.facebook.com/RosberryApps'>
                  <FacebookLink />
                </Link>
              </div>

              <div style={{ marginBottom: '0px', marginLeft: '-6px' }}>
                <Link caption={tr('VK_NAME')} url='https://vk.com/rosberry'>
                  <VKLink />
                </Link>
              </div>

            </Bubble>
          </div>
        </div>

        <div className='clearfix bubble-row container' id='upwork' name='upwork' style={this.getStyle()}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' className='w_70p br-desctop' isHiddenText={props.isHiddenText}>
              <div style={{ marginBottom: '15px' }}>
                <img src={UpworkImg} width='215' height='60' alt='' className='img-response' />
              </div>
              {tr('CONTACTS_EXPERIENCE', true)}
              <div style={{ marginTop: '25px' }}>
                <Button isLink href='https://www.upwork.com/o/companies/~01583bffbad2b46650/'
                  caption={tr('SEE_PORTFOLIO', true)} />
              </div>
            </Bubble>
          </div>
        </div>

        {false &&
        <div className='clearfix bubble-row container' name='goodfirms' id='goodfirms' style={this.getStyle()}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' className='w_70p' isHiddenText={props.isHiddenText}>
              <div style={{ marginBottom: '15px' }}>
                <img src={GoodFirmsImg} width='301' height='44' alt='' className='img-response' />
              </div>
              {tr('CONTACTS_GOODFIRM', true)}
              <div style={{ marginTop: '25px' }}>
                <Button isLink href='https://www.goodfirms.co/interviews/view/46/625/rosberry'
                  caption={tr('READ_INTERVIEW', true)} />
              </div>
            </Bubble>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default (GSAP(Contacts))
