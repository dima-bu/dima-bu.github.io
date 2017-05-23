import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Projects.scss'
import Bubble from './../Bubble/Bubble.js'
import ProjectBubble from './../ProjectBubble/ProjectBubble.js'
import Time from './../Time/Time.js'
import {tr} from 'lib/locale.js'
import TrustImg from './assets/phone-trusted@2x.jpg'
import SplitpicImg from './assets/phone-splitpic@2x.jpg'
import CinepicImg from './assets/phone-cinepic@2x.jpg'
import PhyzseekImg from './assets/phone-phyzseek@2x.jpg'
import TrackdImg from './assets/phone-trackd@2x.jpg'

export const Projects = (props) => {
  return (
    <div>
      <div className="clearfix right-bubble bubble-row container">
        <div className="bubble-wrapper ">
          <Time />
          <Bubble size="md" type="secondary" isHiddenText={props.isHiddenText} rightPosition>
            {tr('HI_PROJECTS_LINK_TEXT', true)}
          </Bubble>
        </div>
      </div>
      <div className="clearfix bubble-row container">
        <div className="bubble-wrapper">
          <Time from/>
          <Bubble size="md" type="primary" isHiddenText={props.isHiddenText} >
            {tr('PROJECTS_OUR_LAST_PROJECTS', true)}
          </Bubble>
        </div>
      </div>
      <div className="bubble-row container" style={{padding:'15px 0'}}>
        <ProjectBubble
          isHiddenText={props.isHiddenText}
          title="Trusted Insight"
          description={tr('TRUSTED_DESCRIPTION', true)}
          linkForAndroid="#"
          linkForApple="#"
          >
            <img className="project-bubble-img"  src={TrustImg} width='274' height='500' alt=""/>
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
              secondLine: 'By Apple'
            },
            {
              firstLine: tr('50_MLN'),
              secondLine: tr('DOWNLOADS')
            }
          ]}
          >
          <img className="project-bubble-img"  src={SplitpicImg} width='274' height='500' alt=""/>
        </ProjectBubble>
      </div>
      <div className="bubble-row container" style={{padding:'15px 0'}}>
        <ProjectBubble
          title="Cinepic"
          isHiddenText={props.isHiddenText}
          description={tr('CINEPIC_DESCRIPTION', true)}
          linkForAndroid="#"
          linkForApple="#"
          achievements = {[
            {
              firstLine: 'Призёр номинации',
              secondLine: 'Tagline 2016'
            }
          ]}
          >
          <img className="project-bubble-img"  src={CinepicImg} width='274' height='500' alt=""/>
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
          <img className="project-bubble-img"  src={PhyzseekImg} width='274' height='500' alt=""/>
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
              secondLine: 'By Apple'
            }
          ]}
          >
          <img className="project-bubble-img"  src={TrackdImg} width='274' height='500' alt=""/>
        </ProjectBubble>
      </div>
    </div>
  )
}

export default Projects

