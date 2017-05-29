import React from 'react'
import './HomeView.scss'
import Bubble from 'components/Bubble/Bubble'
import {tr} from 'lib/locale.js';
import { connect } from 'react-redux'
import {loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n'
import cx from 'classnames'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import video from './../assets/320.mp4'
import Projects from 'components/Projects/Projects.js'
import Contacts from 'components/Contacts/Contacts.js'
import Gif from 'components/Gif/Gif.js'
import browserHistory from 'react-router/lib/browserHistory'
import {changeHash } from './../module/general.js'
import Nav from 'components/Nav/Nav.js'
import Time from 'components/Time/Time.js'

const achievements = [
  {
    firstLine: 'Featured',
    secondLine: 'By Apple'
  },
  {
    firstLine: '50 млн',
    secondLine: 'скачиваний'
  }
];

class HomeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isSplash: true};
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        isSplash: false
      })
    }, 1000)
  }

  getVideo(){
    return (
      <video id="background-video" autoplay="autoplay" loop autoPlay>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  getHash(){
    return document.location.hash;
  }

  getView() {

    const arr = [];
    let pathname = this.getHash();

    pathname = pathname.substr(1);
    const elems = pathname.split('-');

    elems.forEach(elem => {
      if (elem === 'projects') {
        arr.push( <Projects key='projects' isHiddenText={this.props.isHiddenText} />)
      }
      if (elem === 'gif') {
        arr.push( <Gif key='gif' isHiddenText={this.props.isHiddenText} />)
      }
      if (elem === 'contacts') {
        arr.push( <Contacts key='contacts' isHiddenText={this.props.isHiddenText}/>)
      }
    });

    return (
      <div>
        {arr}
      </div>
    )
  }

  getFinishBlock(){
    let pathname = this.getHash();
    const elems = pathname.split('-');

    if(elems.length === 3) {
      return (
        <div className="clearfix bubble-row container">
          <div className="bubble-wrapper">
            <Time from/>
            <Bubble size="lg" type="primary" className="w_70p" isHiddenText={this.props.isHiddenText}>
              {tr('CONTACTS_COME_AGAIN', true)}
            </Bubble>
          </div>
        </div>
      );
    }

  }

  render() {

    const getStyleWrapper = ()=> {
      const hash = document.location.hash;
      if (hash) {
      } else {
        return {transform: 'translateY(calc(50vh - 220px)'}
      }
    }

    return (
      <div>
        {this.state.isSplash &&
        <div className={cx('splash', this.state.isSplash ? 'isHide' : 'isHide')}
             style={
                      {'position': 'fixed',
                      'height': '100%',
                      'width': '100%',
                      'left': '0',
                      'top': '0',
                      'backgroundColor': '#ccc',
                      'zIndex': '100'}
                 }>
        </div>
        }
        <div className="main-area" style={getStyleWrapper()} >
          <div className="ta-c bubble-row">
            <Bubble isHiddenText={this.props.isHiddenText} className="w_45">
                  <p>{tr('HI_ROSBERRY', true)}</p>
            </Bubble>
          </div>
          {this.getView()}
          {this.getFinishBlock()}
        </div>
        <Nav onChangeHash={this.props.changeHash} hashState={this.props.hashState} hash={this.props.hash} isHiddenText={this.props.isHiddenText}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setLocale: setLocale,
  changeHash: changeHash
}

const mapStateToProps = (state) => ({
  i18n : state.i18n,
  hash : state.location.hash,
  isHiddenText: state.general.isHiddenText,
  hashState : state.general.hashState
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
