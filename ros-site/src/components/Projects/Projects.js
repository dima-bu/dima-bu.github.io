import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Projects.scss'
import Bubble from './../Bubble/Bubble.js'
import ProjectBubble from './../ProjectBubble/ProjectBubble.js'
import Time from './../Time/Time.js'
import {tr} from 'lib/locale.js'
import TrustImg from './assets/phone-trusted.png'
import SplitpicImg from './assets/phone-splitpic.png'
import CinepicImg from './assets/phone-cinepic.png'
import PhyzseekImg from './assets/phone-phyzseek.png'
import TrackdImg from './assets/phone-trackd.png'
import GSAP from 'react-gsap-enhancer'
import {TimelineMax, Power4 } from 'gsap'
import throttle from 'lodash.throttle';
import Scroll from 'react-scroll';

function createAnim(utils) {

  const firstBubble = utils.target.find({name: 'firstBubble'});
  const secondBubble = utils.target.find({name: 'secondBubble'});

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
        this.data = {finish : true};

        if (utils.options.isClicked) {
          var firstOffset =  document.getElementById('firstBubble').offsetTop;
          Scroll.animateScroll.scrollTo(firstOffset-120, {
            duration: 400,
            smooth: true
          });
        } else {
          Scroll.animateScroll.scrollTo(window.pageYOffset+1, {
            duration: 400,
            smooth: true
          });
        }
      }
    });

  return TimelineMaxOne;
}

function scrollAnimation2(utils) {
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

class Projects extends React.Component {

  constructor(props) {
    super(props);
    this.scrollBubbles = ['trusted', 'splitPic', 'cinepic', 'phyzseek', 'trackd'];
    var self = this;

    this.scrollFunc = () => {
      var scrolled = window.pageYOffset;
      var screenHeight = screen.height;

      self.scrollBubbles.forEach(bubble => {
        var BubbleOffset =  document.getElementById(bubble).offsetTop;
        if ((scrolled + screenHeight+50) > (BubbleOffset)) {
          var findIndex = self.scrollBubbles.findIndex(item => {
            return item === bubble
          });

          if (self.anim2 && self.anim2.data && self.anim2.data.finish) {
            self.addAnimation(scrollAnimation2, {name: bubble});
            self.scrollBubbles.splice(findIndex, 1);

            if (self.scrollBubbles.length === 0) {
              self.scrollFunc = false;
            }
          }
        }
      });
    };
  }

  componentWillMount(){
    setTimeout(() => {
      this.anim2 = this.addAnimation(createAnim, {isClicked: this.props.isClicked});
      this.scrollFunc();
    });
  }

  componentWillReceiveProps(){
    if (this.scrollFunc) {
      this.scrollFunc();
    }
  }

  render(){

    const props = this.props;

    return (
      <div>
        <div className="clearfix right-bubble bubble-row container" name="firstBubble" id="firstBubble" style={{opacity: 0, transform: 'translateX(100px)'}}>
          <div className="bubble-wrapper">
            <Time />
            <Bubble size="md" type="secondary" className="w_35p" isHiddenText={props.isHiddenText} rightPosition>
              {props.index === 0 &&
                tr('HI', true)
              }
              {tr('PROJECTS_SHOW_YOUR_PROJECTS', true)}
            </Bubble>
          </div>
        </div>
        <div className="clearfix bubble-row container" name="secondBubble" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <div className="bubble-wrapper">
            <Time from/>
            <Bubble size="md" type="primary"  className="w_35p" isHiddenText={props.isHiddenText} >
              {tr('PROJECTS_OUR_LAST_PROJECTS', true)}
            </Bubble>
          </div>
        </div>
        <div className="bubble-row -project container" style={{padding:'15px 0'}} id="trusted" name="trusted" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <ProjectBubble
            isHiddenText={props.isHiddenText}
            title="Trusted Insight"
            lang={props.lang}
            description={tr('TRUSTED_DESCRIPTION', true)}
            linkForAndroid="https://play.google.com/store/apps/details?id=com.thetrustedinsight.tiapp"
            linkForApple="https://itunes.apple.com/us/app/trusted-insight-global-network/id1122381006?mt=8"
            >
              <img className="project-bubble-img img-response"  src={TrustImg} width='246' height='500' alt=""/>
            </ProjectBubble>
        </div>
        <div className="bubble-row -project -high container" id="splitPic" name="splitPic" style={{ opacity: 0, transform: 'translateX(-100px)'}}>
          <ProjectBubble
            title="Split Pic"
            isLeft
            lang={props.lang}
            description={tr('SPLIT_DESCRIPTION', true)}
            linkForAndroid="https://play.google.com/store/apps/details?id=com.rosberry.splitpic.newproject"
            linkForApple="https://itunes.apple.com/us/app/split-pic-clone-yourself/id570748340?mt=8"
            widthSize="lg"
            isHiddenText={props.isHiddenText}
            achievements = {[
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
            <img className="project-bubble-img img-response"  src={SplitpicImg} width='246' height='500' alt=""/>
          </ProjectBubble>
        </div>
        <div className="bubble-row -project container" id="cinepic" name="cinepic" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <ProjectBubble
            title="Cinepic"
            isHiddenText={props.isHiddenText}
            description={tr('CINEPIC_DESCRIPTION', true)}
            linkForAndroid="https://play.google.com/store/apps/details?id=com.cinepic"
            linkForApple="https://itunes.apple.com/us/app/cinepic-create-mesmerizing/id923762113?mt=8"
            isFullAchievements
            lang={props.lang}
            widthSize="sm"
            achievements = {[
              {
                firstLine: tr('PRIZEWINNER'),
                secondLine: 'Tagline 2016',
                isInvert: false
              }
            ]}
            >
            <img className="project-bubble-img img-response" src={CinepicImg} width='246' height='500' alt=""/>
          </ProjectBubble>
        </div>
        <div className="bubble-row -project container" name="phyzseek" id="phyzseek" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <ProjectBubble
            title="Phyzseek"
            description={tr('PHUZSEEK_DESCRIPTION', true)}
            linkForApple="https://itunes.apple.com/us/app/id1076780161?mt=8"
            isHiddenText={props.isHiddenText}
            isLeft
            lang={props.lang}
            >
            <img className="project-bubble-img img-response"  src={PhyzseekImg} width='246' height='500' alt=""/>
          </ProjectBubble>
        </div>
        <div className="bubble-row -project container" name="trackd" id="trackd" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <ProjectBubble
            title="Trackd Studio"
            description={tr('TRACKD_DESCRIPTION', true)}
            linkForApple="https://itunes.apple.com/us/app/trackd-record-collaborate/id978196692"
            isHiddenText={props.isHiddenText}
            lang={props.lang}
            achievements = {[
              {
                firstLine: 'Featured',
                secondLine: 'By Apple',
                isInvert: false
              }
            ]}
            >
            <img className="project-bubble-img img-response"  src={TrackdImg} width='246' height='500' alt=""/>
          </ProjectBubble>
        </div>
      </div>
    )
  }
}

export default (GSAP(Projects))

