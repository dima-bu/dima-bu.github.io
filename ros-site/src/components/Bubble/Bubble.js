import React, {defaultProps, Component} from 'react'
import PropTypes from 'prop-types'
import './Bubble.scss'
import cx from 'classnames'
import BubbleCorner from 'components/SVG/BubbleCorner'

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

  if (href || onClick) {
    return (
      <a
        href={href}
        style={style}
        onClick={onClick}
        className={cx("bubble", className, 'type-'+type, withVideo ? 'with-video' : '', autoWidth ? 'auto-width': '', 'size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}
        >
        <span className={cx('bubble-inner', isHiddenText ? 'isHide': 'isShow')}>
          {text}
          {children}
        </span>
        <BubbleCorner />
      </a>
    )
  } else {
    return (
        <div style={style} className={cx("bubble", className, 'type-'+type, autoWidth ? 'auto-width': '',  withVideo ? 'with-video' : '','size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}>
          <span className={cx('bubble-inner', isHiddenText ? 'isHide': 'isShow')}>
            {text}
            {children}
          </span>
          <BubbleCorner />
        </div>
    )
  }
}

Bubble.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary', 'link']),
    size: PropTypes.oneOf(['lg', 'md']),
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
  className: ''
}

export default Bubble;
