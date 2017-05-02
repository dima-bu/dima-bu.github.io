import React, {defaultProps, Component} from 'react'
import PropTypes from 'prop-types'
import './Bubble.scss'
import cx from 'classnames'
import BubbleCorner from 'components/SVG/BubbleCorner'

const Bubble = (props) => {
  const {text, type, size, isFull, rightPosition, children, href} = props;
  //const newText = text.split ('<br>').map ((item, i) => <div key={i}>{item}</div>);

  if (href) {
    return (
      <a href={href} className={cx("bubble", 'type-'+type, 'size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}>
        {text}
        {children}
        <BubbleCorner />
      </a>
    )
  } else {
    return (
      <div className={cx("bubble", 'type-'+type, 'size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}>
        {text}
        {children}
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
    children : PropTypes.element
}

Bubble.defaultProps = {
  text: '',
  type: 'primary',
  size: 'lg',
  isFull: false,
  rightPosition: false
}

export default Bubble;
