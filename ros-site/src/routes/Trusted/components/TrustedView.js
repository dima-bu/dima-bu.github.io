import React from 'react'
import ReactDOM from 'react-dom'
import './TrustedView.scss'
import Bubble from 'components/Bubble/Bubble'
import {tr} from 'lib/locale.js';
import { connect } from 'react-redux'
import {setLocale} from 'lib/react-redux-i18n';
import cx from 'classnames'
import Projects from 'components/Projects/Projects.js'
import Contacts from 'components/Contacts/Contacts.js'
import Gif from 'components/Gif/Gif.js'
import OtherSite from 'components/OtherSite/OtherSite.js'
import FinishSection from 'components/FinishSection/FinishSection.js'
import browserHistory from 'react-router/lib/browserHistory'
//import { changeHash, scrollWindow, showCasePopup, visableCasePopup, setHash } from './../module/general.js'
import Nav from 'components/Nav/Nav.js'
import Time from 'components/Time/Time.js'
import GSAP from 'react-gsap-enhancer'
import { TweenMax, TimelineMax, Power4 } from 'gsap'
import throttle from 'lodash.throttle'
import Popup from 'components/Popup/Popup.js'
import CaseTrusted from 'components/CaseTrusted/CaseTrusted.js'
import Header from './../../../layouts/Header/index.js'


class TrustedView extends React.Component {

  constructor(props) {
    super(props);
  }

  handlerClosePopup () {

  }

  render () {

    return (
      <Popup onClose={this.handlerClosePopup} visabledCasePopup={true}>
        <CaseTrusted locale={this.props.i18n.locale}/>
      </Popup>
    )
  }
}

const mapDispatchToProps = {
  setLocale: setLocale
  //changeHash: changeHash,
  //setHash: setHash,
  //scrollWindow: scrollWindow,
  //showCasePopup: showCasePopup,
  //visableCasePopup: visableCasePopup
}

const mapStateToProps = (state) => ({
  i18n : state.i18n,
  hash : state.location.hash
  //isHiddenText: state.general.isHiddenText,
  //hashState : state.general.hashState,
  //yPosition: state.general.yPosition,
  //shownCasePopup:  state.general.shownCasePopup,
  //visabledCasePopup:  state.general.visabledCasePopup
})

export default connect(mapStateToProps, mapDispatchToProps)(GSAP(TrustedView))
