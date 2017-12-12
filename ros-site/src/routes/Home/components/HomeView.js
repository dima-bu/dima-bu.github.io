import React from 'react'
import ReactDOM from 'react-dom'
import './HomeView.scss'
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
import { changeHash, scrollWindow, showCasePopup, visableCasePopup, setHash } from './../module/general.js'
import Nav from 'components/Nav/Nav.js'
import Time from 'components/Time/Time.js'
import GSAP from 'react-gsap-enhancer'
import { TweenMax, TimelineMax, Power4 } from 'gsap'
import throttle from 'lodash.throttle'
import Popup from 'components/Popup/Popup.js'
import CaseTrusted from 'components/CaseTrusted/CaseTrusted.js'
import Header from './../../../layouts/Header/index.js'

//const achievements = [
//  {
//    firstLine: 'Featured',
//    secondLine: 'By Apple'
//  },
//  {
//    firstLine: '50 млн',
//    secondLine: 'скачиваний'
//  }
//];

function createAnim(utils) {
  var box = utils.target.find({name: 'box'})
  var navWrapper = utils.target.find({name: 'navWrapper'})

  var TimelineMaxWr = new TimelineMax()

  //TimelineMaxWr.add(TweenMax
  //  .to(navWrapper, 0.5, {
  //    css: {
  //      opacity: 0
  //    },
  //    ease: Power4.easeOut
  //  }));

  TimelineMaxWr.add(TweenMax
    .to(box, 0.7, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 1.3,

      ease: Power4.easeOut

    }));

  return TimelineMaxWr;

}

class HomeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSplash: true,
      isHiddenSplash: false,
      i18n: props.i18n
    };
    this.isTouch = false;
    this.clikedElem = false;
    this.isInitPopup = false;
    this.handleNavigateClick = this.handleNavigateClick.bind(this)
    this.handlerClosePopup = this.handlerClosePopup.bind(this)
    this.handleShowCasePopup = this.handleShowCasePopup.bind(this)
    this.initPopup = this.initPopup.bind(this)
  }

  componentDidMount() {
    var throttled = throttle(() => {this.props.scrollWindow(window.pageYOffset)}, 500);
    window.onscroll = throttled;
  }

  handleNavigateClick(e) {
    this.isTouch = true;
    this.clikedElem = e;
    this.props.changeHash(e);
    //this.addAnimation(createAnim)
  }

  getVideo(){
    return (
      <video id="background-video" autoplay="autoplay" loop autoPlay>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  getHash () {
    return window.location.hash
  }

  getView() {

    const arr = [];
    let pathname = this.getHash();

    pathname = pathname.substr(1);
    const elems = pathname.split('-');

    elems.forEach( (elem, index) => {
      if (elem === 'projects') {
        arr.push( <Projects key='projects' showCasePopup={this.handleShowCasePopup} isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem} yPosition={this.props.yPosition} lang={this.props.i18n.locale} index={index} isHiddenText={this.props.isHiddenText} />)
      }
      if (elem === 'gif') {
        arr.push( <Gif key='gif' index={index} isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem} yPosition={this.props.yPosition} isHiddenText={this.props.isHiddenText} />)
      }
      if (elem === 'contacts') {
        arr.push( <Contacts key='contacts' index={index} isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem} yPosition={this.props.yPosition}  isHiddenText={this.props.isHiddenText}/>)
      }

      if (elem === 'otherSite') {
        arr.push( <OtherSite key='OtherSite' locale={this.props.i18n.locale} index={index} isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem} yPosition={this.props.yPosition} isHiddenText={this.props.isHiddenText} />)
      }

    });

    return (
      <div>
        {arr}
        {this.getFinishBlock()}
      </div>
    )
  }

  getFinishBlock () {
    let pathname = this.getHash()
    const elems = pathname.split('-')

    if (elems.length === 4) {
      if (elems[3] !== 'otherSite') {
        return <FinishSection isHiddenText={this.props.isHiddenText} isFull yPosition={this.props.yPosition} />
      } else {
        return <FinishSection isHiddenText={this.props.isHiddenText} yPosition={this.props.yPosition} />
      }
    }
  }

  showScreen () {
    if (this.state.isSplash) {
     this.setState({
          isSplash: false
     })

     setTimeout(() => {
        this.setState({
          isHiddenSplash: true
        })
     }, 300)
    }
  }

  handlerClosePopup () {
    var body = document.getElementById('body')
    body.className = ''
    this.props.showCasePopup('')
    this.props.visableCasePopup(false)
    let pathname = this.getHash()
    const elems = pathname.split('-')

    const index = elems.indexOf('trusted')
    if (elems.indexOf('trusted') >= 0) {
      elems.splice(index, 1)
    }
    const newPath = elems.join('-')
    this.props.setHash(newPath)
  }

  handleShowCasePopup (val) {
    var body = document.getElementById('body')
    body.className = '-hide'

    this.props.showCasePopup(val)

    if (this.isInitPopup) {
      this.props.changeHash('#'+val)
    } else {
      this.isInitPopup = true
    }

     setTimeout(() => {
       this.props.visableCasePopup(true)
     }, 0)
  }

  initPopup(){
    const popups = ['trusted']

    let pathname = this.getHash()
    const elems = pathname.split('-')

    popups.forEach(popup => {
      if (elems.indexOf(popup) >= 0 && !this.isInitPopup) {
        this.handleShowCasePopup(popup)
      }
    })

    this.isInitPopup = true
  }

  getCasePopup () {
    if (this.props.shownCasePopup) {
      return (
        <Popup onClose={this.handlerClosePopup} visabledCasePopup={this.props.visabledCasePopup}>
          <CaseTrusted locale={this.props.i18n.locale}/>
        </Popup>
      )
    }
  }

  render () {

    const getStyleWrapper = () => {
      // const hash = this.getHash();
      // if (!hash || this.isTouch) {
      //  return {transform: 'translateY(calc(50vh - 300px)'}
      // }
    }

    if (this.props.i18n.locale) {
      this.showScreen()
    }

    this.initPopup();

    return (
      <div>
        <Header />
        {!this.state.isHiddenSplash &&
        <div className={cx('splash', this.state.isSplash ? 'isShow' : 'isHide')}
             style={
                      {'position': 'fixed',
                      'height': '100vh',
                      'width': '100%',
                      'left': '0',
                      'top': '0',
                      'backgroundColor': '#ffffff',
                      'zIndex': '100'}
                 }>
        </div>
        }
        {this.getCasePopup()}
        <div className="main-area" name='box' id="hiInit" style={getStyleWrapper()} >
          <div className="ta-c bubble-row -first-bubble">
            <Bubble isHiddenText={this.props.isHiddenText} className="w_45 br-all">
              {tr('HI_ROSBERRY', true)}
            </Bubble>
          </div>
          {this.getView()}

        </div>
        <div name="navWrapper" style={{opacity: 1}}>
          <Nav onChangeHash={this.handleNavigateClick} isTouch={this.isTouch} hashState={this.props.hashState} hash={this.props.hash} isHiddenText={this.props.isHiddenText}/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setLocale: setLocale,
  changeHash: changeHash,
  setHash: setHash,
  scrollWindow: scrollWindow,
  showCasePopup: showCasePopup,
  visableCasePopup: visableCasePopup
}

const mapStateToProps = (state) => ({
  i18n : state.i18n,
  hash : state.location.hash,
  isHiddenText: state.general.isHiddenText,
  hashState : state.general.hashState,
  yPosition: state.general.yPosition,
  shownCasePopup:  state.general.shownCasePopup,
  visabledCasePopup:  state.general.visabledCasePopup
})

export default connect(mapStateToProps, mapDispatchToProps)(GSAP(HomeView))
