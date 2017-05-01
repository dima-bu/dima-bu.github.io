import React from 'react'
import PropTypes from 'prop-types'
import Header from './../Header'
import Nav from '../../components/Nav/Nav'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='main-wrapper'>
    <Header />
    <div className='container core-layout__viewport text-center'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
