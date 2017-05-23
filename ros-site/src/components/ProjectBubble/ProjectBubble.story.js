import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import ProjectBubble from './ProjectBubble.js';
import TrustImg from 'components/Projects/assets/phone-trusted@2x.jpg'
import {tr} from 'lib/locale.js'

const stories = storiesOf('ProjectBubble', module);

const styles = {
  width: '960px',
  'backgroundColor': '#ffffff'
};


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

stories.addDecorator(getStory => (
    <div style={styles}>{getStory()}</div>
  ))


stories.add('default', () => {
  return     <ProjectBubble
    title="Trusted Insight"
    description="Социальная сеть <для профессиональных инвесторов"
    />
});

stories.add('with achievements', () => {
  return     <ProjectBubble
    title="Trusted Insight"
    description="Социальная сеть для профессиональных инвесторов"
    achievements={achievements}
    >
    <img className="project-bubble-img" style={{top:'-80px'}} src={TrustImg} width='274' height='500' alt=""/>
  </ProjectBubble>
});


stories.add('with achievements and links', () => {
  return <ProjectBubble
    title="Trusted Insight"
    description='Социальная сеть для профессиональных инвесторов'
    achievements={achievements}
    linkForAndroid="#"
    linkForApple="#"
    />
});

