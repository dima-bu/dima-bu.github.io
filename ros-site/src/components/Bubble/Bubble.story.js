import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Bubble from './Bubble.js';

const sizes = ['lg', 'md'];
const types = ['primary', 'secondary'];
const positions = [true, false];
const all = [];

sizes.forEach(size => {
  types.forEach(type => {
    positions.forEach(position =>{
      all.push({
        rightPosition: position,
        size: size,
        type: type
      })
    })
  })
});

const stories = storiesOf('Bubble', module);

all.forEach(fullItem => {
  stories.add(`${fullItem.size} ${fullItem.type} rightPosition is ${fullItem.rightPosition}`, () => (
    <Bubble
      text='Текст внутри бабла'
      type={fullItem.type}
      size={fullItem.size}
      rightPosition={fullItem.rightPosition}
      />
  ))
});

stories.add('Bubble link right', () => {
  return <Bubble
    text='А есть какая-нибудь<br> гифочка?'
    type='link'
    size='md'
    rightPosition
    />
});

stories.add('Bubble link left', () => {
  return <Bubble
    text='А есть какая-нибудь<br> гифочка?'
    type='link'
    href="#"
    size='md'
    />
});
