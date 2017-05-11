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

  getView() {

    const arr = [];
    let pathname = browserHistory.getCurrentLocation().hash;

    pathname = pathname.substr(1);
    const elems = pathname.split('-');


    elems.forEach(elem => {
      if (elem === 'projects') {
        arr.push( <Projects key='projects' />)
      }
      if (elem === 'gif') {
        arr.push( <Gif key='gif'/>)
      }
      if (elem === 'contacts') {
        arr.push( <Contacts key='contacts'/>)
      }
    });

    return (
      <div>
        {arr}
      </div>
    )
  }

  render() {
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
        <div className="ta-c ">
            <Bubble isHiddenText={this.props.isHiddenText}>
                  <p>{tr('HI_ROSBERRY', true)}</p>
            </Bubble>
        </div>
        {this.getView()}
        <div className="ta-c bottom-links container">
          <div className="bubble-wrapper">
            <Bubble
              isFull
              rightPosition
              isHiddenText={this.props.isHiddenText}
              type='link'
              size='sm'
              href="/#projects"
              text={tr('HI_PROJECTS_LINK_TEXT', true)}/>
          </div>

          <div className="bubble-wrapper">
              <Bubble
                rightPosition
                isFull
                isHiddenText={this.props.isHiddenText}
                type='link'
                size='sm'
                href="/#contacts"
                text={tr('HI_CONTACTS_LINK_TEXT', true)}/>
          </div>
            <div className="bubble-wrapper">
              <Bubble
                rightPosition
                isFull
                isHiddenText={this.props.isHiddenText}
                type='link'
                size='sm'
                href="/#gif"
                text={tr('HI_GIF_LINK_TEXT', true)}/>
            </div>

        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setLocale
}

const mapStateToProps = (state) => ({
  i18n : state.i18n,
  isHiddenText: state.general.isHiddenText
})

export default connect(mapStateToProps)(HomeView)
