import React from 'react'
import PropTypes from 'prop-types'
import Header from './../Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='main-wrapper'>
    <Header />
    {children}
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
