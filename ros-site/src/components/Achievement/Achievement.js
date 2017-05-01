import React, {defaultProps} from 'react';
import PropTypes from 'prop-types';
import LaurelLeft from 'components/SVG/LaurelLeft'
import LaurelRight from 'components/SVG/LaurelRight'
import './Achievement.scss'

const Achievement = (props) => {
  const {firstLine, secondLine} = props;
  return (
    <div className="achievement-wrapper">
      <LaurelLeft/>
        <div className="achievement-inner">
          <div className="achievement-firstLine"> {firstLine}</div>
          <div className="achievement-secondLine"> {secondLine}</div>
        </div>
      <LaurelRight />
    </div>
  )
}

Achievement.PropTypes = {
  firstLine: PropTypes.string,
  secondLine: PropTypes.string
}

Achievement.defaultProps = {
  firstLine: '',
  secondLine: ''
}

export default Achievement;
