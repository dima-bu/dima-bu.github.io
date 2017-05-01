import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Link from './Link.js';

const stories = storiesOf('Link', module);

stories.add('Link', () => {
  return <Link
    caption='develop@rosberry.com'
    />
});
