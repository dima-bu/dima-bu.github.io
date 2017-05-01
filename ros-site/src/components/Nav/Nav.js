import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link, browserHistory} from 'react-router'
class Nav extends Component {

  static propTypes = {
    onChangeHash: PropTypes.func,
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
        title: 'Привет, покажите ваши проекты',
        path: '/levelOne#projects'
      },
      {
        title: 'Как с вами связаться',
        path: '/levelOne#contacts'
      },
      {
        title: 'Гифка',
        path: '/levelOne#gif'
      }
    ]
  };

  render () {
    const {items, onChangeHash} = this.props;

    const onClickHandler = (path) => {
      onChangeHash(path)
    };

    return (
    <div>
    {onChangeHash &&
    <div>
      {items.map(item => {
          return (
            <a key={item.path} onClick={onClickHandler.bind(this, item.path)}>
              {item.title}
              <br/>
            </a>
          );
        })}
      </div>
    }

      {!onChangeHash &&

      <div>
        {items.map(item => {
          return (
            <Link to={item.path} key={item.path} activeClassName='route--active'>
              {item.title}
              <br/>
            </Link>
          );
        })}
      </div>
    }
    </div>

    )
  }
}

export default Nav
