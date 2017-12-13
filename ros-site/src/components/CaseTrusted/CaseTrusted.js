import React from 'react'
import { tr } from 'lib/locale.js'
import CaseHeader from 'components/CaseHeader/CaseHeader.js'
import TrustedLogo from './assets/trusted_logo.png'

import IntroImg1 from './assets/intro_iphone_1.png'
import IntroImg2 from './assets/intro_iphone_2.png'

import UsersImg from './assets/users.jpg'
import HandImg from './assets/hand-transparent.png'
import handGif from './assets/hangGif.gif'

import DetailsWhatsImg from './assets/details_whats.jpg'
import DetailAlexImg from './assets/details_alex.png'
import DetailRoundImg from './assets/details_round.png'

import DetailsVentureImg from './assets/details_venture.jpg'
import DetailsUSCNoneImg from './assets/details_usc_none.jpg'
import DetailsUSCDoneImg from './assets/details_usc_done.jpg'

import Stream2Img from './assets/stream2.png'
import Stream3Img from './assets/stream3.png'
import Stream4Img from './assets/stream4.png'

import ChatJay from './assets/chat_jay.png'
import ChatAvatar from './assets/chat_avatars.png'
import ChatContacts from './assets/chat_contacts.png'

import VersionsImg from './assets/versions.jpg'
import VersionsImg1v1 from './assets/version-news-1.png'
import VersionsImg1v2 from './assets/version-news-2.png'
import VersionsImg2v1 from './assets/version-profile-1.png'
import VersionsImg2v2 from './assets/version-profile-2.png'
import VersionsImg3v2 from './assets/version-firm-2.png'
import VersionsImg3v1 from './assets/version-firm-1.png'

import DownloadAndroid from 'components/SVG/DownloadAndroid'
import DownloadApple from 'components/SVG/DownloadApple'
import Tweet from 'components/Tweet/index'

class CaseTrusted extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <CaseHeader
          title={tr('TRUSTED_TITLE')}
          subTitle={tr('TRUSTED_SUBTITLE')}
        />

        <div className='case-img-wrapper_over row'>
          <div className='col-sm-6'>
            <img className='img-intro_1' src={IntroImg1} alt='' height={485} width={793} />
          </div>
          <div className='col-sm-6'>
            <img className='img-intro_2' src={IntroImg2} alt='' height={405} width={726} />
          </div>
        </div>

        <p className='case-paragraph case-width'>
          {tr('TRUSTED_INTRO')}
          <br/>
          <img src={TrustedLogo}  className='trusted-logo -mr' alt='' />
          <a href='href://thetrustedinsight.com' className='case-link'>thetrustedinsight.com</a>
        </p>
        <h2 className='case-subtitle case-width'>{tr('TRUSTED_USERS_TITLE')}</h2>
        <div className='img-user case-img' style={{backgroundImage: `url(${UsersImg})`}}></div>
        <div className='case-img_caption'>{tr('TRUSTED_USERS_IMG_DESCR')}</div>
        <p className='case-paragraph case-width'>{tr('TRUSTED_USERS_TEXT')}</p>
        <h2 className='case-subtitle case-width'>{tr('TRUSTED_STREAMS_TITLE')}</h2>
        <p className='case-paragraph case-width'>{tr('TRUSTED_STREAMS_TEXT_1')}</p>
        <div className='img-hand case-img g-radial-bg'>
            <img className='img-hand_gif' src={handGif} alt='' />
            <img src={HandImg} className='img-hand_hand' alt='' />
        </div>
        <p className='case-paragraph case-width'>{tr('TRUSTED_STREAMS_TEXT_2')}</p>

        <div className='case-img case-img-wrapper'>
          <div className='row'>
            <div className='col-sm-4'>
              <img src={Stream2Img} alt='' width='344' height='248' />
            </div>
            <div className='col-sm-4'>
              <img src={Stream3Img} alt='' width='344' height='181' />
            </div>
            <div className='col-sm-4'>
              <img src={Stream4Img} alt='' width='344' height='116' />
            </div>
          </div>
        </div>
        <div className='case-img_caption'>{tr('TRUSTED_STREAMS_IMG_DESCR')}</div>
        <h2 className='case-subtitle case-width'>{tr('TRUSTED_DETAILS_TITLE')}</h2>
        <p className='case-paragraph case-width'>{tr('TRUSTED_DETAILS_TEXT_1')}</p>


        <div className='case-img clearfix'>
          <div className='col-sm-6 '>
            <div className='img-details-whats case-img' style={{backgroundImage: `url(${DetailsWhatsImg})`}}></div>
          </div>
          <div className='col-sm-6'>
            <div className='img-details-whats case-img -mt' style={{backgroundImage: `url(${DetailsVentureImg})`}}></div>
          </div>
        </div>
        <p className='case-paragraph case-width'>{tr('TRUSTED_DETAILS_TEXT_2')}</p>

        <div className='case-img-wrapper -sm-padding row'>
          <div className='col-sm-6 flr'>
            <img src={DetailRoundImg} className='img-details-round' alt='' />
          </div>
          <div className='col-sm-6 fll'>
            <img src={DetailAlexImg} className='img-details-alex' alt='' />
          </div>

        </div>

        <p className='case-paragraph case-width'>{tr('TRUSTED_DETAILS_TEXT_3')}</p>

        <div className='case-img clearfix'>
          <div className='col-sm-6 '>
            <div className='case-img-wrapper  -no-padding ta-c -xs-mb'>
              <img src={DetailsUSCNoneImg} className='img-details-usn case-img'  alt='' />
            </div>
          </div>
          <div className='col-sm-6 '>
            <div className='case-img-wrapper -mod-bg -no-padding ta-c'>
              <img src={DetailsUSCDoneImg} className='img-details-usn case-img -mt' alt='' />
            </div>
          </div>
        </div>

        <h2 className='case-subtitle case-width'>{tr('TRUSTED_CHAT_TITLE')}</h2>
        <p className='case-paragraph case-width'>{tr('TRUSTED_CHAT_TEXT_1')}</p>

        <div className='case-img case-img-wrapper -sm-padding'>
          <img className='chat-jay-img' src={ChatJay} alt='' />
          <img className='chat-avatar-img' src={ChatAvatar} alt='' />
        </div>

        <p className='case-paragraph case-width'>{tr('TRUSTED_CHAT_TEXT_2')}</p>

        <div className='case-img case-img-wrapper ta-c -md-padding'>
          <img className='chat-contacts-img' src={ChatContacts} alt='' />
        </div>

        <h2 className='case-subtitle case-width'>{tr('TRUSTED_VERSIONS_TITLE')}</h2>
        <p className='case-paragraph case-width'>{tr('TRUSTED_VERSIONS_TEXT_1')}</p>
        <div className='img-versions case-img'>
          <div className="version-title_wrapper">
            <div className='version-title'>Version 1.0</div>
            <div className='version-title'>Version 2.0</div>
          </div>
          <div className='row'>
            <div className='col-sm-4  hidden-xs img-versions_img img-versions_img_col-1'>
              <img src={VersionsImg1v1} alt='' width='320' />
              <img src={VersionsImg1v2} alt='' width='320' />
            </div>
            <div className='col-sm-4 col-xs-12 img-versions_img img-versions_img_col-2'>
              <img src={VersionsImg2v1} alt='' width='320' />
              <img src={VersionsImg2v2} alt='' width='320' />
            </div>
            <div className='col-sm-4 hidden-xs img-versions_img img-versions_img_col-3'>
              <img src={VersionsImg3v1} alt='' width='320' />
              <img src={VersionsImg3v2} alt='' width='320' />
            </div>
          </div>
        </div>
        <p className='case-paragraph case-width'>{tr('TRUSTED_VERSIONS_TEXT_2')}</p>

        <div className='case-download-wrapper' >
              <a className='icon-link project-available' href='https://play.google.com/store/apps/details?id=com.thetrustedinsight.tiapp' target='_blank'>
                <DownloadAndroid lang={this.props.locale} height={80} width={270} />
              </a>
              <a className='icon-link project-available' href='https://itunes.apple.com/us/app/trusted-insight-global-network/id1122381006?mt=8' target='_blank'>
                <DownloadApple lang={this.props.locale} height={80} width={270} />
              </a>
            </div>
            <Tweet/>
            <br/><br/><br/><br/><br/><br/><br/>
      </div>
    )
  }
}

export default CaseTrusted