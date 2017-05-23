import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link, browserHistory} from 'react-router'
import {tr} from 'lib/locale.js';
import Bubble from 'components/Bubble/Bubble'
import './Nav.scss'

class Nav extends Component {

  static propTypes = {
    onChangeHash: PropTypes.func,
    isHiddenText: PropTypes.bool,
    hashState: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        path: PropTypes.string
      })
    )
  };

  static defaultProps = {
    items: [
      {
        title: 'HI_PROJECTS_LINK_TEXT',
        path: 'projects'
      },
      {
        title: 'HI_CONTACTS_LINK_TEXT',
        path: 'contacts'
      },
      {
        title: 'HI_GIF_LINK_TEXT',
        path: 'gif'
      }
    ]
  };

  render () {
    const {items, onChangeHash, isHiddenText, hashState} = this.props;

    const hash = document.location.hash

    const onClickHandler = (path) => {
      onChangeHash(path)
    };

    const itemsMap = items.filter((item)=>{
      return (hash.indexOf(item.path) === -1)
    });


    const getStyleWrapper = ( )=> {
      if (hash) {
      } else {
        return {position: 'fixed', bottom: '0', width: '100%'}
      }
    }

    return (
    <div>
    {onChangeHash &&
    <div style={getStyleWrapper()}>
      <div className="ta-c bottom-links container" >
      {itemsMap.map(item => {
          return (
          <div
             className="bubble-wrapper"
             key={item.path}
            >
            <Bubble
              rightPosition
              isFull
              isHiddenText={isHiddenText}
              onClick={onClickHandler.bind(this, `#${item.path}`)}
              type='link'
              size='sm'
              text={tr(item.title, true)} />
          </div>
          );
        })}
        </div>
      </div>
    }

     {!onChangeHash &&
     <div style={getStyleWrapper()}>
      <div className="ta-c bottom-links container">
        {items.map(item => {
          return (
            <Link to={item.path} key={item.path} activeClassName='route--active'>
              {item.title}
            </Link>
          );
        })}
      </div>
     </div>
    }
    </div>

    )
  }
}

export default Nav
