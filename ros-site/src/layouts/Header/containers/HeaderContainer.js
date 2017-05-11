import { connect } from 'react-redux'
import {loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n'
import {setHiddenText, setVisableText} from './../../../routes/Home/module/general'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import Header from '../Header.js'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  setLocale: setLocale,
  setHiddenText: setHiddenText,
  setVisableText: setVisableText
}

const mapStateToProps = (state) => ({
  i18n : state.i18n,
  isHiddenText: state.general.isHiddenText
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
