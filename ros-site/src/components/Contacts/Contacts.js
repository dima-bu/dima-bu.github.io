import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Contacts.scss'

export const Contacts = () => (
  <div className="clearfix">
    <div className="chat-item -to">
      Как с вами связаться?
    </div>
    <div className="chat-item">
      О, это очень легко. Вы можете написать нам в мессенджере или на почту, а так же посмотреть наши группы в социальных сетях:
    </div>
    <div className="chat-item">
      <div>develop@rosberry.com</div>
      <div>rosberry4u</div>
    </div>
    <div className="chat-item">
      Спасибо, что зашли на наш сайт. Приходите еще, скоро у нас появится много нового: больше проектов в портфолио
    </div>
  </div>
)

export default Contacts;
