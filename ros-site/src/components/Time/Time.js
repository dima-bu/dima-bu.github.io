import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Time.scss'
import { tr } from 'lib/locale.js'

export default class Time extends Component {
  constructor (props) {
    super(props)
    let now = new Date()
    this.state = {
      time: now.toLocaleTimeString().split(':')[0] + ':' + now.toLocaleTimeString().split(':')[1]
    }
  }

  static propTypes = {
    from: PropTypes.bool
  }

  static defaultProps = {
    from: false
  }

  render () {
    const { from } = this.props

    return (
      <div className='ros-time'>
        {from &&
          'Rosberry'
        }
        {!from &&
          tr('YOU')
        }
        , {this.state.time}
      </div>
    )
  }
}
