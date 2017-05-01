import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import SwitchButton from './SwitchButton';

const styles = {
  padding: '20px',
  'backgroundColor': '#ffffff',
  'height': '80vh'
};

storiesOf('SwitchButton', module)

  .addDecorator(getStory => (
    <div style={styles}>{getStory()}</div>
  ))
  .add('default', () => (
    <SwitchButton/>
  ))
  .add('with labelRight sm', () => (
    <SwitchButton label="Eng" labelRight="Рус"/>
  ));

