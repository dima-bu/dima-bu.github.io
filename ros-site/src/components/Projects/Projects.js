import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Projects.scss'

export const Projects = () => (
  <div>
    <div className="clearfix">
      <div className="chat-item -to">
        Привет, покажите ваши проекты
      </div>
    <div className="chat-item">
      C удоволсьствием, вот наши 5 последних проектов
    </div>
      </div>
    <div className="clearfix">
      <h1>Большое описание проекта 1</h1>
      <h1>Большое описание проекта 2</h1>
      <h1>Большое описание проекта 3</h1>
      <h1>Большое описание проекта 4</h1>
    </div>
  </div>
)

export default Projects

