import React, {defaultProps} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Link.scss'

const Link = (props) => {
  const {caption, url, children, isHiddenText} = props;

  return (
    <a className={cx('normal', 'ros-link', 'd-flex', 'align-items-center', children ? '-indent' : '', isHiddenText ? 'isHide': 'isShow')} target="_blank" href={url}>
      {children}
      <span className="caption">
        {caption}
      </span>
    </a>
  )
}

Link.propTypes = {
  caption: PropTypes.string,
  url: PropTypes.func,
  children : PropTypes.element,
  isHiddenText: PropTypes.bool
}

Link.defaultProps = {
  caption: '',
  url: '#',
  isHiddenText: false
}

export default Link;
