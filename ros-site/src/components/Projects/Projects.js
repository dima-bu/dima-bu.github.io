import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Projects.scss'
import Bubble from './../Bubble/Bubble.js'
import Time from './../Time/Time.js'

export const Projects = () => (
  <div>
    <div className="clearfix right-bubble">
      <div className="bubble-wrapper">
        <Time />
        <Bubble sizes="md" type="secondary" rightPosition>
          Привет! Покажите ваши проекты,пожалуйста
        </Bubble>
      </div>
    </div>
    <div className="clearfix">
      <div className="bubble-wrapper">
        <Time from/>
        <Bubble sizes="md" type="primary">
          С удовольствием!
          Вот 5 наших последних проектов:
        </Bubble>
      </div>
    </div>
  </div>
)

export default Projects

