import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import ProjectBubble from './ProjectBubble.js';

const stories = storiesOf('ProjectBubble', module);

const achievements = [
  {
    firstLine: 'Featured',
    secondLine: 'By Apple'
  },
  {
    firstLine: '50 млн',
    secondLine: 'скачиваний'
  }
]

stories.add('default', () => {
  return     <ProjectBubble
    title="Trusted Insight"
    description="Социальная сеть <br>для профессиональных <br>инвесторов"
    />
});

stories.add('with achievements', () => {
  return     <ProjectBubble
    title="Trusted Insight"
    description="Социальная сеть <br>для профессиональных <br>инвесторов"
    achievements={achievements}
    />
});


stories.add('with achievements and links', () => {
  return <ProjectBubble
    title="Trusted Insight"
    description="Социальная сеть <br>для профессиональных <br>инвесторов"
    achievements={achievements}
    linkForAndroid="#"
    linkForApple="#"
    />
});

