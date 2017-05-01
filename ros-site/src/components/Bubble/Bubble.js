import React, {defaultProps, Component} from 'react'
import PropTypes from 'prop-types'
import './Bubble.scss'
import cx from 'classnames'
import BubbleCorner from 'components/SVG/BubbleCorner'

const Bubble = (props) => {
  const {text, type, size, isFull, rightPosition, children} = props;
  const newText = text.split ('<br>').map ((item, i) => <div key={i}>{item}</div>);

  return (
    <div className={cx("bubble", 'type-'+type, 'size-'+size, isFull ? 'full-width' : '', rightPosition ? '-right' : '')}>
      {newText}
      {children}
      <BubbleCorner />
    </div>
  )
}

Bubble.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary', 'link']),
    size: PropTypes.oneOf(['lg', 'md']),
    isFull: PropTypes.bool,
    rightPosition: PropTypes.bool,
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
