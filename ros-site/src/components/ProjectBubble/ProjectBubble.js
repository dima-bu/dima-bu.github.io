import React, {defaultProps, Component} from 'react'
import PropTypes from 'prop-types'
import './ProjectBubble.scss'
import cx from 'classnames';
import Bubble from 'components/Bubble/Bubble';
import DownloadAndroid from 'components/SVG/DownloadAndroid';
import DownloadApple from 'components/SVG/DownloadApple';
import Achievement from 'components/Achievement/Achievement';

const ProjectBubble = (props) => {
  const {title, description, achievements, linkForApple, linkForAndroid} = props;
  const newDescription = description.split('<br>').map((item, i) => <div key={i}>{item}</div>);

  return (
    <Bubble isFull>
      <div>
        <h2 className="project-title">{title}</h2>

        <p className="project-desc">{newDescription}</p>

        <div className="project-achievements">
          {achievements.map((achievement, key) => {
            return (
              <Achievement
                key={key}
                firstLine={achievement.firstLine}
                secondLine={achievement.secondLine}
                />
            )
          })}
          { linkForAndroid &&
            <a className="icon-link project-available" href={linkForAndroid}>
              <DownloadAndroid />
            </a>
          }
          {linkForApple &&
            <a className="icon-link project-available" href={linkForApple}>
              <DownloadApple />
            </a>
          }

        </div>
      </div>
    </Bubble>
  )
}

ProjectBubble.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  linkForApple: PropTypes.string,
  linkForAndroid: PropTypes.string,
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      firstLine: PropTypes.string,
      secondLine: PropTypes.string
    })
  ),
  children: PropTypes.element
}

ProjectBubble.defaultProps = {
  text: '',
  type: 'primary',
  size: 'lg',
  achievements: []
}

export default ProjectBubble;
