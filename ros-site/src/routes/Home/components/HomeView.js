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
import {changeHash, scrollWindow} from './../module/general.js'
import Nav from 'components/Nav/Nav.js'
import Time from 'components/Time/Time.js'
import GSAP from 'react-gsap-enhancer'
import { TweenMax, TimelineMax, Power4 } from 'gsap'
import throttle from 'lodash.throttle';

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


function createAnim(utils) {
  var box = utils.target.find({name: 'box'});
  var navWrapper = utils.target.find({name: 'navWrapper'});

  var TimelineMaxWr = new TimelineMax();

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
      isHiddenSplash: false
    };
    this.isTouch = false;
    this.clikedElem = false;
    this.handleNavigateClick = this.handleNavigateClick.bind(this);
  }

  componentDidMount() {
    var throttled = throttle(()=>{this.props.scrollWindow(window.pageYOffset)}, 500);
    window.onscroll = throttled;

    setTimeout(() => {
      this.setState({
        isSplash: false
      })
    }, 700);

    setTimeout(() => {
      this.setState({
        isHiddenSplash: true
      })
    }, 1200);
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

  getHash(){
    return window.location.hash;
  }

  getView() {

    const arr = [];
    let pathname = this.getHash();

    pathname = pathname.substr(1);
    const elems = pathname.split('-');

    elems.forEach( (elem, index) => {
      if (elem === 'projects') {
        arr.push( <Projects key='projects' isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem} yPosition={this.props.yPosition} lang={this.props.i18n.locale} index={index} isHiddenText={this.props.isHiddenText} />)
      }
      if (elem === 'gif') {
        arr.push( <Gif key='gif' index={index} isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem} yPosition={this.props.yPosition} isHiddenText={this.props.isHiddenText} />)
      }
      if (elem === 'contacts') {
        arr.push( <Contacts key='contacts' index={index} isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem}  yPosition={this.props.yPosition}  isHiddenText={this.props.isHiddenText}/>)
      }

      if (elem === 'otherSite') {
        arr.push( <OtherSite key='OtherSite' index={index} isTouch={this.isTouch} isClicked = {this.clikedElem === '#'+elem} yPosition={this.props.yPosition} isHiddenText={this.props.isHiddenText} />)
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

    if (elems.length === 4) {
      return <FinishSection isHiddenText={this.props.isHiddenText}  />;
    }
  }

  render() {

    const getStyleWrapper = () => {
      //const hash = this.getHash();
      //if (!hash || this.isTouch) {
      //  return {transform: 'translateY(calc(50vh - 300px)'}
      //}
    }

    return (
      <div>
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
        <div className="main-area" name='box' id="hiInit" style={getStyleWrapper()} >
          <div className="ta-c bubble-row -first-bubble">
            <Bubble isHiddenText={this.props.isHiddenText} className="w_45 br-all">
              {tr('HI_ROSBERRY', true)}
            </Bubble>
          </div>
          {this.getView()}
          {this.getFinishBlock()}
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
  scrollWindow: scrollWindow
}

const mapStateToProps = (state) => ({
  i18n : state.i18n,
  hash : state.location.hash,
  isHiddenText: state.general.isHiddenText,
  hashState : state.general.hashState,
  yPosition: state.general.yPosition
})

export default connect(mapStateToProps, mapDispatchToProps)(GSAP(HomeView))
