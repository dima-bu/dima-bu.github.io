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
import { TweenLite, TimelineMax, Power4 } from 'gsap'

function createAnim(utils) {
  const firstBubble = utils.target.find({name: 'firstBubble'});
  const secondBubble = utils.target.find({name: 'secondBubble'});
  const thirdBubble = utils.target.find({name: 'thirdBubble'});

  return new TimelineMax()
    .to(firstBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.3,
      ease: Power4.easeOut
    })
    .to(secondBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 2,
      ease: Power4.easeOut
    })
    .to(thirdBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      ease: Power4.easeOut
    })
}

class Projects extends React.Component {

  constructor(props) {
    super(props);
  }

  handleNavigateClick() {
    //this.addAnimation(createAnim)
  }

  componentWillMount(){
    setTimeout(()=>{
      this.anim = this.addAnimation(createAnim);
      this.anim();
    });
  }

  render(){

    const props = this.props;

    return (
      <div>
        <div className="clearfix right-bubble bubble-row container" name="firstBubble" style={{opacity: 0, transform: 'translateX(100px)'}}>
          <div className="bubble-wrapper">
            <Time />
            <Bubble size="md" type="secondary" className="w_35p" isHiddenText={props.isHiddenText} rightPosition>
              {tr('HI_PROJECTS_LINK_TEXT', true)}
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
        <div className="bubble-row container" style={{padding:'15px 0'}} name="thirdBubble" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <ProjectBubble
            isHiddenText={props.isHiddenText}
            title="Trusted Insight"
            description={tr('TRUSTED_DESCRIPTION', true)}
            linkForAndroid="#"
            linkForApple="#"
            >
              <img className="project-bubble-img img-response"  src={TrustImg} width='246' height='500' alt=""/>
            </ProjectBubble>
        </div>
        <div className="bubble-row container" style={{padding:'15px 0'}}>
          <ProjectBubble
            title="Split Pic"
            isLeft
            description={tr('SPLIT_DESCRIPTION', true)}
            linkForApple="#"
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
        <div className="bubble-row container" style={{padding:'15px 0'}}>
          <ProjectBubble
            title="Cinepic"
            isHiddenText={props.isHiddenText}
            description={tr('CINEPIC_DESCRIPTION', true)}
            linkForAndroid="#"
            linkForApple="#"
            isFullAchievements
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
        <div className="bubble-row container" style={{padding:'15px 0'}}>
          <ProjectBubble
            title="Phyzseek"
            description={tr('PHUZSEEK_DESCRIPTION', true)}
            linkForApple="#"
            isHiddenText={props.isHiddenText}
            isLeft
            >
            <img className="project-bubble-img img-response"  src={PhyzseekImg} width='246' height='500' alt=""/>
          </ProjectBubble>
        </div>
        <div className="bubble-row container" style={{padding:'15px 0'}}>
          <ProjectBubble
            title="Trackd Studio"
            description={tr('TRACKD_DESCRIPTION', true)}
            linkForApple="#"
            isHiddenText={props.isHiddenText}
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

