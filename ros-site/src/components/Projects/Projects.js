import React from 'react'
import './Projects.scss'
import Bubble from './../Bubble/Bubble.js'
import ProjectBubble from './../ProjectBubble/ProjectBubble.js'
import Time from './../Time/Time.js'
import { tr } from 'lib/locale.js'
import TrustImg from './assets/phone-trusted.png'
import SplitpicImg from './assets/phone-splitpic.png'
import CinepicImg from './assets/phone-cinepic.png'
import PhyzseekImg from './assets/phone-phyzseek.png'
import TrackdImg from './assets/phone-trackd.png'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Power4 } from 'gsap'
import Scroll from 'react-scroll'

function createAnim (utils) {
  const firstBubble = utils.target.find({ name: 'firstBubble' })
  const secondBubble = utils.target.find({ name: 'secondBubble' })

  // начальная анимация появления первых двух баблов
  const TimelineMaxOne = new TimelineMax()
    .to(firstBubble, 0.8, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.2,
      ease: Power4.easeOut
    })
    .to(secondBubble, 0.8, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.1,
      ease: Power4.easeOut,
      onComplete: () => {
        this.data = { finish : true }

        // проверку на то что уже проскролели вниз
        if (window.pageYOffset + 200 > document.getElementById('firstBubble').offsetTop) {
          Scroll.animateScroll.scrollTo(window.pageYOffset + 1, {
            duration: 400,
            smooth: true
          })
        } else {
          // если это не первая серия баблов
          if (utils.options.isClicked) {
            var firstOffset = document.getElementById('firstBubble').offsetTop
            Scroll.animateScroll.scrollTo(firstOffset - 120, {
              duration: 400,
              smooth: true
            })
          } else {
            // если это первая серия баблов
            Scroll.animateScroll.scrollTo(window.pageYOffset + 1, {
              duration: 400,
              smooth: true
            })
          }
        }
      }
    })

  return TimelineMaxOne
}

function scrollAnimationProjects (utils) {
  const AnimationBubble = utils.target.find({ name: utils.options.name })

  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.1,
      ease: Power4.easeOut,
      onComplete: function () {
        var self = utils.options.self
        //self.scrollBubbles.splice(0, 1)
        //self.currentBubble = ''
        //if (self.scrollBubbles.length === 0) {
        //  self.scrollFunc = false
        //  self.__runningAnimations.clear()
        //}
      }
    })
}

class Projects extends React.Component {

  constructor (props) {
    super(props)
    this.scrollBubbles = ['trusted', 'splitPic', 'cinepic', 'phyzseek', 'trackd']
    this.currentBubble = ''
    var self = this

    this.scrollFunc = () => {
      var scrolled = window.pageYOffset // Текущая прокрутка сверху
      var screenHeight = screen.height // Высота экрана

      var BubbleOffset = document.getElementById(self.scrollBubbles[0]).offsetTop

      if ((scrolled + screenHeight - 100) > (BubbleOffset) && self.currentBubble === '') {
        self.currentBubble = self.scrollBubbles[0]
        self.addAnimation(scrollAnimationProjects, { name: self.currentBubble, self: self })
        self.scrollBubbles.splice(0, 1)
        self.currentBubble = ''
      }

      // self.scrollBubbles.forEach(bubble => {
      //  var BubbleOffset = document.getElementById(bubble).offsetTop
      //
      //  if ((scrolled + screenHeight - 100) > (BubbleOffset) && self.scrollBubbles.indexOf(bubble) === 0) {
      //
      //    console.log('BubbleOffset ', BubbleOffset)
      //    console.log('screenHeight ', screenHeight)
      //    console.log('scrolled ', scrolled)
      //
      //    var findIndex = self.scrollBubbles.findIndex(item => {
      //      return item === bubble
      //    })
      //
      //    if (self.anim && self.anim.data && self.anim.data.finish) {
      //      console.log(bubble)
      //      self.scrollBubbles.splice(findIndex, 1)
      //      self.addAnimation(scrollAnimationProjects, { name: bubble })
      //      // if (self.scrollBubbles.length === 0) {
      //      //  self.scrollFunc = false
      //      //  self.__runningAnimations.clear()
      //      // }
      //    }
      //  }
      // })
    }
  }

  componentWillMount () {
    setTimeout(() => {
      this.anim = this.addAnimation(createAnim, { isClicked: this.props.isClicked })
      this.scrollFunc()
    })
  }

  componentWillReceiveProps () {
    // на каждое изменение положения экрана (с задержкой 500мс) запускать функцию
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

    return (
      <div>
        <div className='clearfix right-bubble bubble-row container'
          name='firstBubble'
          id='firstBubble'
          style={this.getStyle(true)}>
          <div className='bubble-wrapper'>
            <Time />
            <Bubble size='md' type='secondary' className='w_35p br-desctop'
              isHiddenText={props.isHiddenText} rightPosition>
              {props.index === 0 &&
                tr('HI', true)
              }
              {tr('PROJECTS_SHOW_YOUR_PROJECTS', true)}
            </Bubble>
          </div>
        </div>
        <div className='clearfix bubble-row container' name='secondBubble' id='secondBubble'
          style={this.getStyle()}>
          <div className='bubble-wrapper'>
            <Time from />
            <Bubble size='md' type='primary' className='w_35p br-all' isHiddenText={props.isHiddenText} >
              {tr('PROJECTS_OUR_LAST_PROJECTS', true)}
            </Bubble>
          </div>
        </div>
        <div className='bubble-row -project container' id='trusted' name='trusted'
          style={this.getStyle()}>
          <ProjectBubble
            isHiddenText={props.isHiddenText}
            title='Trusted Insight'
            lang={props.lang}
            description={tr('TRUSTED_DESCRIPTION', true)}
            linkForAndroid='https://play.google.com/store/apps/details?id=com.thetrustedinsight.tiapp'
            linkForApple='https://itunes.apple.com/us/app/trusted-insight-global-network/id1122381006?mt=8'
            >
            <img className='project-bubble-img img-response' src={TrustImg} width='246' height='500' alt='' />
          </ProjectBubble>
        </div>
        <div className='bubble-row -project -high container' id='splitPic' name='splitPic'
          style={this.getStyle()}>
          <ProjectBubble
            title='Split Pic'
            isLeft
            lang={props.lang}
            description={tr('SPLIT_DESCRIPTION', true)}
            linkForAndroid='https://play.google.com/store/apps/details?id=com.rosberry.splitpic.newproject'
            linkForApple='https://itunes.apple.com/us/app/split-pic-clone-yourself/id570748340?mt=8'
            widthSize='lg'
            isHiddenText={props.isHiddenText}
            achievements={[
              {
                firstLine: 'Featured',
                secondLine: 'By Apple',
                isInvert: false
              },
              {
                firstLine: tr('50_MLN'),
                secondLine: tr('DOWNLOADS'),
                isInvert: false
              }
            ]}
            >
            <img className='project-bubble-img img-response' src={SplitpicImg} width='246' height='500' alt='' />
          </ProjectBubble>
        </div>
        <div className='bubble-row -project container' id='cinepic' name='cinepic'
          style={this.getStyle()}>
          <ProjectBubble
            title='Cinepic'
            isHiddenText={props.isHiddenText}
            description={tr('CINEPIC_DESCRIPTION', true)}
            linkForAndroid='https://play.google.com/store/apps/details?id=com.cinepic'
            linkForApple='https://itunes.apple.com/us/app/cinepic-create-mesmerizing/id923762113?mt=8'

            lang={props.lang}
            widthSize='sm'
            achievements={[
              {
                firstLine: tr('PRIZEWINNER'),
                secondLine: 'Tagline 2016',
                isInvert: false
              }
            ]}
            >
            <img className='project-bubble-img img-response' src={CinepicImg} width='246' height='500' alt='' />
          </ProjectBubble>
        </div>
        <div className='bubble-row -project container' name='phyzseek' id='phyzseek'
          style={this.getStyle()}>
          <ProjectBubble
            title='Phyzseek'
            description={tr('PHUZSEEK_DESCRIPTION', true)}
            linkForApple='https://itunes.apple.com/us/app/id1076780161?mt=8'
            isHiddenText={props.isHiddenText}
            isLeft
            lang={props.lang}
            >
            <img className='project-bubble-img img-response' src={PhyzseekImg} width='246' height='500' alt='' />
          </ProjectBubble>
        </div>
        <div className='bubble-row -project container' name='trackd' id='trackd'
          style={{ opacity: 0, transform: 'translateX(-100px)' }}>
          <ProjectBubble
            title='Trackd Studio'
            description={tr('TRACKD_DESCRIPTION', true)}
            linkForApple='https://itunes.apple.com/us/app/trackd-record-collaborate/id978196692'
            isHiddenText={props.isHiddenText}
            lang={props.lang}
            isFullAchievements
            achievements={[
              {
                firstLine: 'Featured',
                secondLine: 'By Apple',
                isInvert: false
              }
            ]}
            >
            <img className='project-bubble-img img-response' src={TrackdImg} width='246' height='500' alt='' />
          </ProjectBubble>
        </div>
      </div>
    )
  }
}

export default (GSAP(Projects))
