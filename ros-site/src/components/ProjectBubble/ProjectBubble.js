import React, {defaultProps, Component} from 'react'
import PropTypes from 'prop-types'
import './ProjectBubble.scss'
import cx from 'classnames';
import Bubble from 'components/Bubble/Bubble';
import DownloadAndroid from 'components/SVG/DownloadAndroid';
import DownloadApple from 'components/SVG/DownloadApple';
import Achievement from 'components/Achievement/Achievement';
import Time from 'components/Time/Time.js'

const ProjectBubble = (props) => {
  const {title, description, achievements, linkForApple, linkForAndroid, style, children, isLeft, isHiddenText, isFullAchievements } = props;
 // const newDescription = description.split('<br>').map((item, i) => <div key={i}>{item}</div>);

  return (
    <div className={cx('project-bubble_wrapper', isLeft ? '-left' : '')}>
      <div className="xs-hidden">{children}</div>

      <Bubble isFull className="project-bubble" style={style} isHiddenText={isHiddenText}>
        <Time from />

        <div>

          <h2 className="project-title">{title}</h2>
          <div className="xs-show">{children}</div>
          <p className="project-desc">{description}</p>

          <div className={cx("project-achievements", isFullAchievements ? "-full" : "")}>
            {achievements.map((achievement, key) => {
              return (
                <Achievement
                  key={key}
                  firstLine={achievement.firstLine}
                  secondLine={achievement.secondLine}
                  isInvert={achievement.isInvert}
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

    </div>
  )
}

ProjectBubble.propTypes = {
  title: PropTypes.string,
  isLeft: PropTypes.bool,
  isHiddenText: PropTypes.bool,
  isFullAchievements: PropTypes.bool,
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
  isFullAchievements: false,
  achievements: [],
  isLeft: false,
  isHiddenText: false
}

export default ProjectBubble;
