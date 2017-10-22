import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Popup from './Popup.js'
import { tr } from 'lib/locale.js'

const stories = storiesOf('Popup', module)

stories.add('default', () => {
  return (<Popup />)
});