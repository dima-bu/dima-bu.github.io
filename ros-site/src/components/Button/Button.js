import React, {defaultProps} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Button.scss'

const Button = (props) => {
  const {caption, onClickHandler} = props;

  return (
    <button className={cx('primary', 'ros-button')} onClick={onClickHandler}>
      {caption}
    </button>
  )
}

Button.propTypes = {
  caption: PropTypes.string,
  onClickHandler: PropTypes.func
}

Button.defaultProps = {
  caption: '',
  onClickHandler: () => {}
}

export default Button;
