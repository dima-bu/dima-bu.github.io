import React, {defaultProps} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Link.scss'

const Link = (props) => {
  const {caption, url, children} = props;

  return (
    <a className={cx('primary', 'ros-link', 'd-flex', 'align-items-center', children ? '-indent' : '')} href={url}>
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
  children : PropTypes.element
}

Link.defaultProps = {
  caption: '',
  url: '#'
}

export default Link;
