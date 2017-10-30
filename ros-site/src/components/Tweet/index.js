import React from 'react'
import PropTypes from 'prop-types'
import './Tweet.scss'
import UnicornImg from './assets/unicorn.jpg'
import { tr } from 'lib/locale.js'

class Tweet extends React.Component {
  render() {
    return (
      <div className='tweet-wrapper'>
        <img src={UnicornImg} alt='' className='tweet-img' />
        <div className='tweet-body'>
          <div className='tweet-title'>
            {tr('TRUSTED_TWEET_TITLE')}
            <span className='tweet-time'>{tr('TRUSTED_TWEET_TIME')}</span>
          </div>
          <p className='tweet-message'>
            {tr('TRUSTED_TWEET_TEXT', true)}
            <a href='https://bit.ly/ASdcw' target='_blank'>https://bit.ly/ASdcw</a>
          </p>
        </div>
      </div>
    )
  }
}

export default Tweet