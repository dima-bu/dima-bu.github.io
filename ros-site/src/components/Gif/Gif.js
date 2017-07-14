import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Gif.scss'
import Gifka1 from './assets/320.gif'
import Bubble from 'components/Bubble/Bubble.js'
import Time from './../Time/Time.js'
import {tr} from 'lib/locale.js'
import video1 from './assets/320.mp4'
import video2 from './assets/cat2.mp4'
import video3 from './assets/cat3.mp4'
import video4 from './assets/cat4.mp4'
import video5 from './assets/cat5.mp4'
import GSAP from 'react-gsap-enhancer'
import { TweenLite, TimelineMax, Power4 } from 'gsap'
import throttle from 'lodash.throttle';
import Scroll from 'react-scroll';

function scrollAnimation3(utils) {
  const AnimationBubble = utils.target.find({name: utils.options.name});
  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.7,
      ease: Power4.easeOut,
      onComplete: () => {
        if ((!this.data || !this.data.alreadyScroll) && utils.options.isClicked) {
          var hiGifOffset =  document.getElementById('hiGif').offsetTop;
          Scroll.animateScroll.scrollTo(hiGifOffset - 120, {
            duration: 400,
            smooth: true
          });
          this.data = {alreadyScroll: true};
        } else {
          Scroll.animateScroll.scrollTo(window.pageYOffset+1, {
            duration: 400,
            smooth: true
          });
        }
      }
    })
}

class Gif extends React.Component {

  constructor(props) {
    super(props);
    this.scrollBubbles = ['hiGif', 'video'];
    var self = this;

    this.scrollFunc = () => {
      var scrolled = window.pageYOffset;
      var screenHeight = screen.height;


      self.scrollBubbles.forEach(bubble => {
        var BubbleOffset =  document.getElementById(bubble).offsetTop;
        if ((scrolled + screenHeight+50) > (BubbleOffset)) {
          var findIndex = self.scrollBubbles.findIndex(item => {
            return item === bubble
          });

          if (true) {
            self.addAnimation(scrollAnimation3, {name: bubble, isClicked: this.props.isClicked});
            self.scrollBubbles.splice(findIndex, 1);

            if (self.scrollBubbles.length === 0) {
              self.scrollFunc = false;
            }
          }

        }
      });
    };
  }

  componentWillMount(){

    setTimeout(() => {
      this.scrollFunc();

      //Scroll.animateScroll.scrollTo(window.pageYOffset+200, {
      //  duration: 400,
      //  smooth: true
      //}, 3000);

    });
  }

  componentWillReceiveProps(){
    if (this.scrollFunc) {
      this.scrollFunc();
    }
  }

  render() {

    const props = this.props;

    const getVideo = () => {
      var count = Math.floor(Math.random() * 5) + 1;

      if (count === 1) {
        return  <source src={video1} type="video/mp4" />
      }
      if (count === 2) {
        return  <source src={video2} type="video/mp4" />
      }
      if (count === 3) {
        return  <source src={video3} type="video/mp4" />
      }
      if (count === 4) {
        return  <source src={video4} type="video/mp4" />
      }
      if (count === 5) {
        return  <source src={video5} type="video/mp4" />
      }

    };

    return (
      <div className="clearfix">

        <div className="clearfix right-bubble bubble-row container"
             style={{opacity: 0, transform: 'translateX(100px)'}}
             id="hiGif"
             name="hiGif">
          <div className="bubble-wrapper ">
            <Time />
            <Bubble type="secondary" size="md" className="w_35p" isHiddenText={props.isHiddenText} rightPosition>
              {props.index === 0 &&
              tr('HI', true)
              }
              {tr('HI_GIF_LINK_TEXT')}
            </Bubble>
          </div>
        </div>

        <div className="clearfix bubble-row container"
             style={{opacity: 0, transform: 'translateX(-100px)'}}
             id="video"
             name="video"
          >
          <div className="bubble-wrapper">
            <Time from/>
            <Bubble size="lg" type="primary" autoWidth withVideo>
              <video id="background-video" autoPlay="autoplay" loop autoPlay>
                {getVideo()}
                Your browser does not support the video tag.
              </video>
            </Bubble>
          </div>
        </div>
      </div>
    )
  }
}
export default (GSAP(Gif))
