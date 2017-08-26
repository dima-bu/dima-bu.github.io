import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link, browserHistory} from 'react-router'
import {tr} from 'lib/locale.js';
import Bubble from 'components/Bubble/Bubble'
import './Nav.scss'
import Tappable from 'react-tappable/lib/Tappable'

class Nav extends Component {

  static propTypes = {
    onChangeHash: PropTypes.func,
    isHiddenText: PropTypes.bool,
    hashState: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        path: PropTypes.string,
        initHidden: PropTypes.bool
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
      },
      {
        title: 'HI_OTHER_SITE_TEXT',
        path: 'otherSite',
        initHidden: true
      }
    ]
  };

  render () {
    const { items, onChangeHash, isHiddenText, hashState, isTouch } = this.props

    const hash = document.location.hash;

    const onClickHandler = (path) => {
      console.log(onClickHandler)
      onChangeHash(path)
    }

    const itemsMap = items.filter(item => {
      if ((!isTouch && hash === '') && item.initHidden) {
        return false
      }
      return (hash.indexOf(item.path) === -1)
    })

    const getStyleWrapper = () => {
      if (hash) {
      } else {
        return { position: 'fixed', bottom: '0', width: '100%' }
      }
    }

    return (
    <div>
    {onChangeHash &&
    <div style={getStyleWrapper()} className="bottom-links_wrapper">
      <div className="ta-c bottom-links container" >
      {itemsMap.map(item => {
          return (
          <Tappable onTap={onClickHandler.bind(this, `#${item.path}`)} className="tap-bubble-wrapper">
          <div
             className="bubble-wrapper"
             key={item.path}
             onClick={onClickHandler.bind(this, `#${item.path}`)}
            >
            <Bubble
              rightPosition
              isFull
              isHiddenText={isHiddenText}
              type='link'
              size='sm'
              text={tr(item.title, true)} />
          </div>
          </Tappable>
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
