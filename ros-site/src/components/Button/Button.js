import React, {defaultProps} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Button.scss'

const Button = (props) => {
  const {caption, onClickHandler, isLink, href} = props;

  if (isLink) {
    return (
      <a href={href} className={cx('primary', 'ros-button', 'link-btn')}>
        {caption}
      </a>
    )
  } else {
    return (
      <button className={cx('primary', 'ros-button')} onClick={onClickHandler}>
        {caption}
      </button>
    )
  }
}

Button.propTypes = {
  caption: PropTypes.string,
  href: PropTypes.string,
  onClickHandler: PropTypes.func,
  isLink: PropTypes.bool
}

Button.defaultProps = {
  caption: '',
  href: '#',
  isLink: false,
  onClickHandler: () => {}
}

export default Button;
