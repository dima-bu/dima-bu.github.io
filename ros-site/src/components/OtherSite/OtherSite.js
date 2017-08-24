import React from 'react'
import Bubble from './../Bubble/Bubble.js'
import Button from './../Button/Button.js'
import Time from './../Time/Time.js'
import { tr } from 'lib/locale.js'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Power4 } from 'gsap'
import Scroll from 'react-scroll'

function createAnimOtherSite (utils) {
  const hiOtherSite = utils.target.find({ name: 'hiOtherSite' })
  const ortoSite = utils.target.find({ name: 'ortoSite' })

  return new TimelineMax()
    .to(hiOtherSite, 0.8, {
      css: {
        transform: 'matrix(1, 0, 0, 1, 0, 0);',
        opacity: 1
      },
      ease: Power4.easeOut,
      onComplete: () => {
        utils.options.self.isFinish = true;
      }
    })
    .to(ortoSite, 0.8, {
      css: {
        transform: 'matrix(1, 0, 0, 1, 0, 0);',
        opacity: 1
      },
      ease: Power4.easeOut,
      onComplete: () => {
        this.data = { finish : true }

        if (window.pageYOffset + 200 > document.getElementById('ortoSite').offsetTop) {
          Scroll.animateScroll.scrollTo(window.pageYOffset + 1, {
            duration: 400,
            smooth: true
          })
        } else {
          if (utils.options.isClicked) {
            var hiOtherSiteOffset = document.getElementById('hiOtherSite').offsetTop
            Scroll.animateScroll.scrollTo(hiOtherSiteOffset - 120, {
              duration: 400,
              smooth: true
            })
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

function scrollAnimationOtherSite (utils) {
  const AnimationBubble = utils.target.find({ name: utils.options.name })
  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'matrix(1, 0, 0, 1, 0, 0);',
        opacity: 1
      },
      delay: 0.7,
      ease: Power4.easeOut,
      onComplete: () => {
      }
    })
}

class OtherSite extends React.Component {

  constructor (props) {
    super(props)
    this.scrollBubbles = []
    this.isFinish = false
    this.scrollFuncOtherSite = () => {
      var self = this
      var scrolled = window.pageYOffset
      var screenHeight = screen.height

      self.scrollBubbles.forEach(bubble => {
        var BubbleOffset = document.getElementById(bubble).offsetTop
        if ((scrolled + screenHeight) > (BubbleOffset)) {
          var findIndex = self.scrollBubbles.findIndex(item => {
            return item === bubble
          })
          self.addAnimation(scrollAnimationOtherSite, { name: bubble })
          self.scrollBubbles.splice(findIndex, 1)
          if (self.scrollBubbles.length === 0) {
            self.reset()
          }
        }
      })
    }
  }

  reset () {
    this.__runningAnimations.clear()
  }

  componentWillMount () {
    setTimeout(() => {
      this.anim2 = this.addAnimation(createAnimOtherSite, { isClicked: this.props.isClicked, self: this })
      this.scrollFuncOtherSite()
    })
  }

  componentWillReceiveProps () {
    if (this.scrollFuncOtherSite) {
      this.scrollFuncOtherSite()
    } else {
      return false
    }
  }

  getStyle (isRight) {
    if (this.isFinish) {
      return {}
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
        <div className='clearfix right-bubble bubble-row container' name='hiOtherSite' id='hiOtherSite'
          style={this.getStyle(true)}>
          <div className='bubble-wrapper '>
            <Time />
            <Bubble isHiddenText={props.isHiddenText} size='md' className='w_35p' type='secondary' rightPosition>
              {props.index === 0 &&
                tr('HI', true)
              }
              {tr('HI_OTHER_SITE_TEXT', true)}
            </Bubble>
          </div>
        </div>

        <div className='clearfix bubble-row container' name='ortoSite' id='ortoSite' style={this.getStyle()}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' className='w_70p' isHiddenText={props.isHiddenText}>
              {tr('ORTO_SITE', true)}
              <div style={{ marginTop: '25px' }}>
                <Button isLink href='http://about.rosberry.com'
                  caption={tr('GO_TO_SITE', true)} />
              </div>
            </Bubble>
          </div>
        </div>
      </div>
    )
  }
}

export default (GSAP(OtherSite))
