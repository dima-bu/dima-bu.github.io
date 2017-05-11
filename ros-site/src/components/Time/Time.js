import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import  './Time.scss'
import {tr} from 'lib/locale.js';

export default class Time extends Component {
  static propTypes = {
    from: PropTypes.bool
  }

  static defaultProps = {
    from: false
  }

  render() {
    const {from} = this.props;
    const getTime = () => {
      let now = new Date();
      return now.toLocaleTimeString().split(':')[0] +':' +now.toLocaleTimeString().split(':')[1];
    }

    return (
      <div className="ros-time">
        {from &&
          'Rosberry'
        }
        {!from &&
          tr('YOU')
        }
        , {getTime()}
    </div>
    )
  }
}