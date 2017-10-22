import React from 'react'
import PropTypes from 'prop-types'
import Bubble from './../Bubble/Bubble.js'
import Button from './../Button/Button.js'
import Logo from './../Logo/Logo.js'
import { tr } from 'lib/locale.js'
import Scroll from 'react-scroll'
import './Popup.scss'
import CloseIcon from './assets/close-icon.png'
import cx from 'classnames'

class Popup extends React.Component {
  constructor (props) {
     super(props)
     // console.log('1111')
     this.state = {isVisible2: false}
  }

   componentDidMount () {
    // debugger;
    console.log('4444')
     requestAnimationFrame(() => {
       // Firefox will sometimes merge changes that happened here
       requestAnimationFrame(() => {
         this.setState({ isVisible2: true, isDone: true});
       });
     });
   }

  render () {
    const { children, onClose } = this.props
    // console.log('render')
    let finish = false
    //
    // let getClassName = () => {
    //
    //   if (finish){
    //     console.log('4444')
    //     return 'popup-wrapper -show'
    //   }

      if (this.state.isVisible2) {
        return (
          <div className='popup-wrapper -show'>
            <div className='popup-bg'></div>
            <header className='popup-header'>
              <div className='container clearfix popup-header_inner'>
                <Logo type='png' />
                <div className='popup-close' onClick={onClose} >
                  Закрыть
                  <img src={CloseIcon} className='popup-close_icon' alt='' />
                </div>
              </div>
            </header>
            <div className='container popup-body'>
              {children}
            </div>
          </div>
        )
      } else {
        return (
          <div className='popup-wrapper -hide'>
            <div className='popup-bg'></div>
            <header className='popup-header'>
              <div className='container clearfix popup-header_inner'>
                <Logo type='png' />
                <div className='popup-close' onClick={onClose} >
                  Закрыть
                  <img src={CloseIcon} className='popup-close_icon' alt='' />
                </div>
              </div>
            </header>
            <div className='container popup-body'>
              {children}
            </div>
          </div>
        )
      }


    // }


  }
}

Popup.propTypes = {
  onClose: PropTypes.func,
  children : PropTypes.element
}

Popup.defaultProps = {
  onClose: () => {},
  children: null
}


export default Popup;