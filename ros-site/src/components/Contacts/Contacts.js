import React from 'react'
import { IndexLink } from 'react-router'
import './Contacts.scss'
import Bubble from './../Bubble/Bubble.js'
import Button from './../Button/Button.js'
import Time from './../Time/Time.js'
import {tr} from 'lib/locale.js'
import Link from './../Link/Link.js'
import Mail from './../SVG/Mail.js'
import Skype from './../SVG/Skype.js'
import VKLink from './../SVG/VKLink.js'
import FacebookLink from './../SVG/FacebookLink.js'
import UpworkImg from './assets/logo-upwork@2x.jpg';
import GoodFirmsImg from './assets/logo-goodfirms@2x.jpg';
import GSAP from 'react-gsap-enhancer'
import { TweenLite, TimelineMax, Power4 } from 'gsap'
import throttle from 'lodash.throttle';
import Scroll from 'react-scroll';

function createAnim(utils) {
  const hiContacts = utils.target.find({name: 'hiContacts'});
  const simple = utils.target.find({name: 'simple'});

  return new TimelineMax()
    .to(hiContacts, 0.8, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      ease: Power4.easeOut
    })
    .to(simple, 0.8, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      ease: Power4.easeOut,
      onComplete: () => {
        this.data = {finish : true};

        if (window.pageYOffset + 200 > document.getElementById('simple').offsetTop) {

          Scroll.animateScroll.scrollTo(window.pageYOffset+1, {
            duration: 400,
            smooth: true
          });

        } else {
          if (utils.options.isClicked) {
            var hiContactsOffset = document.getElementById('hiContacts').offsetTop;
            Scroll.animateScroll.scrollTo(hiContactsOffset - 120, {
              duration: 400,
              smooth: true
            });
          } else {
            Scroll.animateScroll.scrollTo(window.pageYOffset+1, {
              duration: 400,
              smooth: true
            });
          }
        }

      }
    })
}

function scrollAnimation(utils) {
  const AnimationBubble = utils.target.find({name: utils.options.name});
  return new TimelineMax()
    .to(AnimationBubble, 1, {
      css: {
        transform: 'translateX(0px)',
        opacity: 1
      },
      delay: 0.7,
      ease: Power4.easeOut
    })
}


class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.scrollBubbles = ['soc', 'upwork', 'goodfirms'];
    this.scrollFunc = () => {
      var self = this;

      var scrolled = window.pageYOffset;
      var screenHeight = screen.height;

      self.scrollBubbles.forEach(bubble => {
        var BubbleOffset =  document.getElementById(bubble).offsetTop;
        if ((scrolled + screenHeight) > (BubbleOffset)) {
          var findIndex = self.scrollBubbles.findIndex(item => {
            return item === bubble
          });
          self.addAnimation(scrollAnimation, {name: bubble});
          self.scrollBubbles.splice(findIndex, 1);
          if (self.scrollBubbles.length === 0) {
            self.scrollFunc = false;
          }
        }
      });
    };
  }

  componentWillMount(){

    setTimeout(() => {
      this.anim2 = this.addAnimation(createAnim, {isClicked: this.props.isClicked});
      this.scrollFunc();
      //TweenLite.to(window, 1, {scrollTo:{y: document.getElementById('simple').offsetTop, x:0}, ease: Power2.easeInOut});
    });
  }

  componentWillReceiveProps(){
    if (this.scrollFunc) {
      this.scrollFunc();
    }
  }

  render(){
    const props = this.props;

    return (
      <div className="clearfix">
        <div className="clearfix right-bubble bubble-row container" name="hiContacts" id="hiContacts" style={{opacity: 0, transform: 'translateX(100px)'}}>
          <div className="bubble-wrapper ">
            <Time />
            <Bubble isHiddenText={props.isHiddenText} size="md" className="w_35p" type="secondary" rightPosition>
              {props.index === 0 &&
              tr('HI', true)
              }
              {tr('HI_CONTACTS_LINK_TEXT', true)}
            </Bubble>
          </div>
        </div>

        <div className="clearfix bubble-row container" name="simple" id="simple" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <div className="bubble-wrapper">
            <Time from/>
            <Bubble size="lg" type="primary" className="w_60p br-all" isHiddenText={props.isHiddenText}>
              {tr('CONTACTS_SIMPLE', true)}
            </Bubble>
          </div>
        </div>

        <div className="clearfix bubble-row container" name="soc" id="soc" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <div className="bubble-wrapper">
            <Time from/>
            <Bubble size="lg" type="primary" autoWidth isHiddenText={props.isHiddenText} >
              <div  style={{marginBottom: '15px'}} >
                <Link caption='develop@rosberry.com' url="mailto:develop@rosberry.com">
                  <Mail />
                </Link>
              </div>
              <div style={{marginBottom: '15px'}}>
                <Link caption='rosberry4u'>
                  <Skype />
                </Link>
              </div>

              <div style={{marginBottom: '15px'}}>
                <Link caption={tr('FB_NAME')} url="https://www.facebook.com/RosberryApps">
                  <FacebookLink />
                </Link>
              </div>

              <div style={{marginBottom: '0px', marginLeft: '-6px'}}>
                <Link caption={tr('VK_NAME')} url="https://vk.com/rosberry">
                  <VKLink />
                </Link>
              </div>

            </Bubble>
          </div>
        </div>

        <div className="clearfix bubble-row container" id="upwork" name="upwork" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <div className="bubble-wrapper">
            <Time from/>
            <Bubble size="lg" type="primary" className="w_70p br-desctop" isHiddenText={props.isHiddenText}>
              <div style={{marginBottom: '15px'}}>
                <img src={UpworkImg} width="215" height="60" alt="" className="img-response"/>
              </div>
              {tr('CONTACTS_EXPERIENCE', true)}
              <div style={{marginTop: '25px'}}>
                <Button isLink href="https://www.upwork.com/o/companies/~01583bffbad2b46650/" caption={tr('SEE_PORTFOLIO', true)} />
              </div>
            </Bubble>
          </div>
        </div>

        <div className="clearfix bubble-row container" name="goodfirms" id="goodfirms" style={{opacity: 0, transform: 'translateX(-100px)'}}>
          <div className="bubble-wrapper">
            <Time from/>
            <Bubble size="lg" type="primary" className="w_70p" isHiddenText={props.isHiddenText}>
              <div style={{marginBottom: '15px'}}>
                <img src={GoodFirmsImg} width="301" height="44" alt="" className="img-response"/>
              </div>
              {tr('CONTACTS_GOODFIRM', true)}
              <div style={{marginTop: '25px'}}>
                <Button isLink href="https://www.goodfirms.co/interviews/view/46/625/rosberry" caption={tr('READ_INTERVIEW', true)} />
              </div>
            </Bubble>
          </div>
        </div>
      </div>
    )
  }
}

export default (GSAP(Contacts))
