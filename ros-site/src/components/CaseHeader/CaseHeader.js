import React from 'react'
import PropTypes from 'prop-types'
import './CaseHeader.scss'

class CaseHeader extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {

    const { title, subTitle } = this.props

    return (
      <div>
        <h1 className='case-header -mb -mt'>{title}</h1>
        <div className='case-header-subtitle'>{subTitle}</div>
      </div>
    )
  }
}

 CaseHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
 }

 CaseHeader.defaultProps = {
  title: '',
  subTitle: ''
 }

export default CaseHeader