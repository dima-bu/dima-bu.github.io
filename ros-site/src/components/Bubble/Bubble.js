import React, {defaultProps, Component} from 'react'
import PropTypes from 'prop-types'
import './Bubble.scss'
import cx from 'classnames'
import BubbleCorner from 'components/SVG/BubbleCorner'
import BubbleCornerPng from './bubble-corner_360.png'
import BubbleCornerPngGray from './bubble-corner_gray.png'

const Bubble = (props) => {
  const {
    text,
    type,
    size,
    isFull,
    rightPosition,
    children,
    href,
    isHiddenText,
    className,
    style,
    autoWidth,
    withVideo,
    onClick
  } = props;
  //const new//Text = text.split ('<br>').map ((item, i) => <div key={i}>{item}</div>);

  if (type === 'link') {
    return (
      <div
        style={style}
        onClick={onClick}
        className={cx("bubble", className, 'type-'+type, withVideo ? 'with-video' : '', autoWidth ? 'auto-width': '', 'size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}
        >
         <span className={cx('bubble-inner', isHiddenText ? 'isHide': 'isShow')}>
              {text}
              {children}
            </span>
        <BubbleCorner />
        <img className="corner-png-right" src={BubbleCornerPngGray} />
      </div>
    )
  } else {
    return (
        <div style={style} className={cx("bubble", className, 'type-'+type, autoWidth ? 'auto-width': '',  withVideo ? 'with-video' : '','size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}>
          <span className={cx('bubble-inner', isHiddenText ? 'isHide': 'isShow')}>
            {text}
            {children}
          </span>
          <img className="corner-png" src={BubbleCornerPng} />
          <img className="corner-png-right" src={BubbleCornerPngGray} />
          <BubbleCorner />
        </div>
    )
  }
}

Bubble.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'link']),
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  isFull: PropTypes.bool,
  rightPosition: PropTypes.bool,
  href: PropTypes.string,
  children : PropTypes.element,
  isHiddenText: PropTypes.bool,
  withVideo: PropTypes.bool,
  isTime: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Bubble.defaultProps = {
  text: '',
  type: 'primary',
  size: 'lg',
  isFull: false,
  rightPosition: false,
  isHiddenText: false,
  isTime: false,
  autoWidth: false,
  withVideo: false,
  className: '',
  children: null
}

export default Bubble;
