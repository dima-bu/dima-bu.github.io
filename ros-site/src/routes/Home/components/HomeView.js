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
    this.state = {isHide: false};
  }

  //onClickHandler = (e) => {
  //  e.preventDefault();
  //  this.setState({isHide: true});
  //  setTimeout(() => {
  //    if (this.props.i18n.locale === 'ru') {
  //      this.props.dispatch(setLocale('en'));
  //    } else {
  //      this.props.dispatch(setLocale('ru'));
  //    }
  //      this.setState({isHide: false});
  //  }, 1000)
  //}

  getVideo(){
    return (
      <video id="background-video" autoplay="autoplay" loop autoPlay>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  render() {
    return (
      <div>
          <div className="ta-c">
            <Bubble>
                <div className={cx('wrapper ', this.state.isHide ? 'isHide' : 'isShow')}>
                  <p>{tr('HI_ROSBERRY', true)}</p>
                </div>
            </Bubble>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setLocale
}

const mapStateToProps = (state) => ({
  i18n : state.i18n
})

export default connect(mapStateToProps)(HomeView)
