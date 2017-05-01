import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Button from './Button.js';

const stories = storiesOf('Button', module);

stories.add('Button', () => {
  return <Button
      caption='Текст кнопки'
    />
});
