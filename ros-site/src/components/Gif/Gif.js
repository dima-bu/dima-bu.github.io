import React from 'react'
import './Gif.scss'
import Bubble from 'components/Bubble/Bubble.js'
import Time from './../Time/Time.js'
import { tr } from 'lib/locale.js'
import video1 from './assets/cat1.mp4'
import video2 from './assets/cat4.mp4'
import video3 from './assets/cat3.mp4'
import video4 from './assets/cat4.mp4'
import video5 from './assets/cat5.mp4'
import video6 from './assets/cat6.mp4'
import video7 from './assets/cat7.mp4'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Power4 } from 'gsap'
import Scroll from 'react-scroll'
import Reload from 'components/SVG/Reload.js'

function createAnimGif (utils) {
  const first = utils.target.find({ name: 'hiGif' })
  const second = utils.target.find({ name: 'catchOne' })

  return new TimelineMax()
    .to(first, 0.8, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      ease: Power4.easeOut
    })
    .to(second, 0.8, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      ease: Power4.easeOut,
      onComplete: () => {
        this.data = { finish : true }

        if (window.pageYOffset > document.getElementById('hiGif').offsetTop) {
          Scroll.animateScroll.scrollTo(window.pageYOffset + 1, {
            duration: 400,
            smooth: true
          })
        } else {
          if (utils.options.isClicked) {
            var hiOffset = document.getElementById('hiGif').offsetTop
            var catchOneOffset = document.getElementById('catchOne').offsetTop
            var catchOneHeight = document.getElementById('catchOne').offsetHeight
            var screenHeight = window.innerHeight

            if (window.location.hash && window.location.hash !== '#gif') {
              Scroll.animateScroll.scrollTo((catchOneOffset - screenHeight + (catchOneHeight / 2) + 20), {
                duration: 400,
                smooth: true
              })
            } else {
              Scroll.animateScroll.scrollTo(hiOffset - 20, {
                duration: 400,
                smooth: true
              })
            }
          }
        }
      }
    })
}

function scrollAnimationGif (utils) {
  const AnimationBubble = utils.target.find({ name: utils.options.name })

  if (utils.options.self.isFinish) {
    return false
  }

  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.8,
      ease: Power4.easeOut,
      onComplete: () => {
        utils.options.self.isFinish = true
      }
    })
}

class Gif extends React.Component {

  constructor (props) {
    super(props)
    this.scrollBubbles = ['video']
    this.isFinish = false
    this.currentBubble = ''
    var self = this
    this.state = { key: Math.floor(Math.random() * 7) + 1 }
    this.handleButtonClick = () => {
      this.setState({ key:  Math.floor(Math.random() * 7) + 1 })
    }
    this.scrollFunc = () => {
      var scrolled = window.pageYOffset
      var screenHeight = screen.height
      var BubbleOffset = document.getElementById(self.scrollBubbles[0]).offsetTop
      var delta = 200
      if ((scrolled + screenHeight - delta) > (BubbleOffset) && self.currentBubble === '') {
        self.currentBubble = self.scrollBubbles[0]
        self.addAnimation(scrollAnimationGif, { name: self.currentBubble, self: self })
        self.scrollBubbles.splice(0, 1)
        self.currentBubble = ''
      }
    }
  }

  //shouldComponentUpdate (nextProps, nextState) {
  //  if (this.state.key !== nextState.key) {
  //    return true
  //  }
  //}

  componentWillMount () {
    setTimeout(() => {
      this.anim3 = this.addAnimation(createAnimGif, { isClicked: this.props.isClicked })
      this.scrollFunc()

      // Scroll.animateScroll.scrollTo(window.pageYOffset+200, {
      //  duration: 400,
      //  smooth: true
      //}, 3000);
    })
  }

  componentWillReceiveProps () {
    if (this.scrollFunc && this.scrollBubbles.length && !this.isFinish) {
      this.scrollFunc()
    }
  }

  getStyle (isRight) {
    if (this.scrollBubbles.length === 0 && this.isFinish) {
      return {}
    } else {
      if (isRight) {
        return { opacity: 0, transform: 'translateX(100px)' }
      } else {
        return { opacity: 0, transform: 'translateX(-100px)' }
      }
    }
  }

  // handleButtonClick () {
  //   this.setState({ key:  Math.floor(Math.random() * 7) + 1 })
  // }

  render () {
    const props = this.props

    const getVideo = () => {
      switch (this.state.key) {
        case 1:
          return video1
        case 2:
          return video2
        case 3:
          return video5
        case 4:
          return video4
        case 5:
          return video5
        case 6:
          return video6
        case 7:
          return video7
      }
    }

    return (
      <div className='clearfix'>

        <div className='clearfix right-bubble bubble-row container'
          style={this.getStyle(true)}
          id='hiGif'
          name='hiGif'>
          <div className='bubble-wrapper'>
            <Time />
            <Bubble type='secondary' size='md' className='w_35p' isHiddenText={props.isHiddenText} rightPosition>
              {props.index === 0 &&
              tr('HI', true)
              }
              {tr('HI_GIF_LINK_TEXT')}
            </Bubble>
          </div>
        </div>

        <div className='clearfix bubble-row container' name='catchOne' id='catchOne'
          style={this.getStyle()}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' autoWidth className='w_60p br-all' isHiddenText={props.isHiddenText}>
              {tr('GIF_CATCH_ONE', true)}
            </Bubble>
          </div>
        </div>

        <div className='clearfix bubble-row container'
          style={this.getStyle()}
          id='video'
          name='video'
          >
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='lg' type='primary' autoWidth withVideo>
              <div onClick={this.handleButtonClick} className='reload-wrapper'><Reload /></div>
              <video id='background-video' autoPlay='autoplay' loop width='480' height='480' type='video/mp4' src={getVideo()} />
            </Bubble>
          </div>
        </div>
      </div>
    )
  }
}
export default (GSAP(Gif))
