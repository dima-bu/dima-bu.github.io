import React, {defaultProps, Component} from 'react'
import PropTypes from 'prop-types'
import './Bubble.scss'
import cx from 'classnames'
import BubbleCorner from 'components/SVG/BubbleCorner'

const Bubble = (props) => {
  const {text, type, size, isFull, rightPosition, children, href, isHiddenText} = props;
  //const newText = text.split ('<br>').map ((item, i) => <div key={i}>{item}</div>);

  if (href) {
    return (
      <a href={href} className={cx("bubble", 'type-'+type, 'size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}>
        <span className={cx('bubble-inner', isHiddenText ? 'isHide': 'isShow')}>
          {text}
          {children}
        </span>
        <BubbleCorner />
      </a>
    )
  } else {
    return (
        <div className={cx("bubble", 'type-'+type, 'size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}>
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
    isTime: PropTypes.bool
}

Bubble.defaultProps = {
  text: '',
  type: 'primary',
  size: 'lg',
  isFull: false,
  rightPosition: false,
  isHiddenText: false,
  isTime: false
}

export default Bubble;
