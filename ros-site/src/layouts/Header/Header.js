import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import Logo from 'components/Logo/Logo.js'
import SwitchButton from 'components/SwitchButton/SwitchButton.js'
import { connect } from 'react-redux'

export const Header = (props) => {

  const {isHiddenText} = props;

  const onChangeHandler = (e) => {
    e.preventDefault();
    props.setHiddenText();
    setTimeout(() => {
      if (props.i18n.locale === 'ru') {
        props.setLocale('en')
      } else {
        props.setLocale('ru')
      }
      props.setVisableText();
    }, 700)
  }

  const getChecked = () => {
    if (isHiddenText) {
      return (props.i18n.locale === 'en')
    }
    return (props.i18n.locale === 'ru')
  }

  return (
    <header className="container-zero fixed-header">
      <div className='header-wraaper clearfix'>
        <Logo />
        <div style={{float: 'right'}}>
          <SwitchButton label="Eng" checked={getChecked()} labelRight="Рус" onChange={onChangeHandler}/>
        </div>
      </div>
    </header>
  )
}

export default Header
