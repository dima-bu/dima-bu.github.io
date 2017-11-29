import React from 'react'
import PropTypes from 'prop-types'
import Bubble from './../Bubble/Bubble.js'
import Button from './../Button/Button.js'
import Logo from './../Logo/Logo.js'
import { tr } from 'lib/locale.js'
import Scroll from 'react-scroll'
import './Popup.scss'
import CloseIcon from './assets/close-icon.png'

class Popup extends React.Component {
  constructor (props) {
     super(props)
  }

  render () {
    const { children, onClose, visabledCasePopup } = this.props

    const getStyle = () => {
      if (visabledCasePopup) {
        return { 'opacity': 1 }
      }
      return { 'opacity': 0 }
    }

    return (
      <div className='popup-wrapper' style={getStyle()} ref={(ref) => {this.wrapper = ref}}>
        <div className='popup-bg'></div>
        <header className='popup-header'>
          <div className='container clearfix popup-header_inner'>
            <Logo type='png' onClickHandler={onClose} />
            <div className='popup-close' onClick={onClose}>
              {tr('CLOSE')}
              <img src={CloseIcon} className='popup-close_icon' alt='' />
            </div>
          </div>
        </header>
        <div className='popup-body'>
          <div className='container'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Popup.propTypes = {
  onClose: PropTypes.func,
  visabledCasePopup: PropTypes.bool,
  children : PropTypes.element
}

Popup.defaultProps = {
  onClose: () => {},
  visabledCasePopup: false,
  children: null
}

export default Popup;