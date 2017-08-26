import React from 'react'
import './Gif.scss'
import Bubble from 'components/Bubble/Bubble.js'
import Time from './../Time/Time.js'
import { tr } from 'lib/locale.js'
import video1 from './assets/cat1.mp4'
import video2 from './assets/cat2.mp4'
import video3 from './assets/cat3.mp4'
import video4 from './assets/cat4.mp4'
import video5 from './assets/cat5.mp4'
import video6 from './assets/cat6.mp4'
import video7 from './assets/cat7.mp4'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Power4 } from 'gsap'
import Scroll from 'react-scroll'

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

        if (window.pageYOffset + 200 > document.getElementById('catchOne').offsetTop) {
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

function scrollAnimation3 (utils) {
  const AnimationBubble = utils.target.find({ name: utils.options.name })
  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.7,
      ease: Power4.easeOut
/*      onComplete: () => {
        if ((!this.data || !this.data.alreadyScroll) && utils.options.isClicked) {
          var hiGifOffset = document.getElementById('hiGif').offsetTop
          Scroll.animateScroll.scrollTo(hiGifOffset - 120, {
            duration: 400,
            smooth: true
          });
          this.data = { alreadyScroll: true }
        } else {
          Scroll.animateScroll.scrollTo(window.pageYOffset + 1, {
            duration: 400,
            smooth: true
          })
        }
      }*/
    })
}

class Gif extends React.Component {

  constructor (props) {
    super(props)
    this.scrollBubbles = ['video']
    var self = this

    this.scrollFunc = () => {
      var scrolled = window.pageYOffset
      var screenHeight = screen.height
      self.scrollBubbles.forEach(bubble => {
        var BubbleOffset = document.getElementById(bubble).offsetTop
        if ((scrolled + screenHeight) > (BubbleOffset)) {
          var findIndex = self.scrollBubbles.findIndex(item => {
            return item === bubble
          })
          self.addAnimation(scrollAnimation3, { name: bubble })
          self.scrollBubbles.splice(findIndex, 1)
          if (self.scrollBubbles.length === 0) {
            self.scrollFunc = false
            self.__runningAnimations.clear()
          }
          /*if (true) {
            self.addAnimation(scrollAnimation3, { name: bubble, isClicked: this.props.isClicked })
            self.scrollBubbles.splice(findIndex, 1)

            if (self.scrollBubbles.length === 0) {
              self.scrollFunc = false
            }
          }*/
        }
      })
    }
  }

  componentWillMount () {
    setTimeout(() => {
      this.anim3 = this.addAnimation(createAnimGif, { isClicked: this.props.isClicked })
      this.scrollFunc()

      //Scroll.animateScroll.scrollTo(window.pageYOffset+200, {
      //  duration: 400,
      //  smooth: true
      //}, 3000);
    })
  }

  componentWillReceiveProps () {
    if (this.scrollFunc) {
      this.scrollFunc()
    }
  }

  getStyle (isRight) {
    if (this.scrollBubbles.length === 0) {
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

    const getVideo = () => {
      var count = Math.floor(Math.random() * 7) + 1

      switch (count) {
        case 1:
          return <source src={video1} type='video/mp4' />
        case 2:
          return <source src={video2} type='video/mp4' />
        case 3:
          return <source src={video5} type='video/mp4' />
        case 4:
          return <source src={video4} type='video/mp4' />
        case 5:
          return <source src={video5} type='video/mp4' />
        case 6:
          return <source src={video6} type='video/mp4' />
        case 7:
          return <source src={video7} type='video/mp4' />
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
              <video id='background-video' autoPlay='autoplay' loop width='480' height='480' >
                {getVideo()}
                Your browser does not support the video tag.
              </video>
            </Bubble>
          </div>
        </div>
      </div>
    )
  }
}
export default (GSAP(Gif))
