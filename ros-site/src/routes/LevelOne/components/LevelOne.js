import React from 'react'
import Projects from 'components/Projects/Projects.js'
import Contacts from 'components/Contacts/Contacts.js'
import Gif from 'components/Gif/Gif.js'
import Nav from 'components/Nav/Nav.js'
import browserHistory from 'react-router/lib/browserHistory'
import hashHistory from 'react-router/lib/hashHistory'
import {tr} from 'lib/locale.js';

class LevelOne extends React.Component {
  componentWillMount () {

  }

  hasPath(path) {
    const pathname = hashHistory.getCurrentLocation().pathname;
    return (pathname.indexOf(path) >= 0);
  }

  getView() {

    const arr = [];
    let foo = browserHistory.getCurrentLocation();
    let pathname = browserHistory.getCurrentLocation().hash;

    pathname = pathname.substr(1);
    const elems = pathname.split('-');

    elems.forEach(elem => {
      if (elem === 'projects') {
        arr.push( <Projects key='projects' />)
      }
      if (elem === 'gif') {
        arr.push( <Gif key='gif'/>)
      }
      if (elem === 'contacts') {
        arr.push( <Contacts key='contacts'/>)
      }
    });

    return (
      <div>
        {arr}
        <Nav onChangeHash={this.props.changeHash} />
        <h3>{this.props.hashState}</h3>
        <h2>{tr('STUFF_TARIFFS')}</h2>
      </div>
    )
  }

  render () {
    return this.getView();
  }
}

export default LevelOne
