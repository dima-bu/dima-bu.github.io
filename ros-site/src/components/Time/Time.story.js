import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Time from './Time'

const styles = {
  padding: '20px',
  'backgroundColor': '#ffffff',
  'height': '80vh'
}

storiesOf('Time', module)

  .addDecorator(getStory => (
    <div style={styles}>{getStory()}</div>
  ))
  .add('default', () => (
    <Time />
  ))
  .add('from', () => (
    <Time from={true} />
  ))

