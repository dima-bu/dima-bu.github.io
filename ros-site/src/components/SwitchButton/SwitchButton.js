import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import  './SwitchButton.scss'

export default class SwitchButton extends Component {
  static propTypes = {
    id             : PropTypes.string,
    name           : PropTypes.string,
    title          : PropTypes.string,
    label          : PropTypes.string,
    labelRight     : PropTypes.string,
    defaultChecked : PropTypes.bool,
    disabled       : PropTypes.bool,
    theme          : PropTypes.string,
    checked        : PropTypes.bool,
    mode           : PropTypes.string,
    onChange       : PropTypes.func,
    size: PropTypes.oneOf(['sm'])
  }

  static defaultProps = {
    id             : '',
    name           : 'switch-button',
    title          : '',
    label          : '',
    labelRight     : '',
    disabled       : false,
    defaultChecked : false,
    theme          : 'hive-b2b',
    checked        : null,
    mode           : "switch",
    onChange       : () => {},
    size: 'sm'
  }

  render () {
    let id, label, labelRight,
      mode = this.props.mode || "switch";

    if( this.props.id === '' && this.props.name !== '' ) {
      id = this.props.name;
    }

    if( this.props.label !== '' ) {
      label = (
        <label  className={cx('switch-label', !this.props.checked ? 'active' : '')} htmlFor={id}>{this.props.label}</label>
      );
    }

    if( this.props.labelRight !== '' ) {
      labelRight = (
        <label htmlFor={id} className={cx('switch-label', this.props.checked ? 'active' : '')} >{this.props.labelRight}</label>
      );
    }

    if( [ 'switch', 'select' ].indexOf( mode ) < -1 ) {
      mode = "switch";
    }

    return (
      <div className={cx('switch-button', `rsbc-mode-${mode}`, this.props.theme, this.props.size, this.props.disabled ? style.disabled : '')}>
        {label}
        {this.props.checked &&
          <input
            onChange={this.props.onChange}
            checked={this.props.checked}
            disabled={this.props.disabled}
            id={id}
            name={this.props.name}
            type="checkbox"
            value="1"
            />
        }
        {!this.props.checked &&
        <input
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          id={id}
          name={this.props.name}
          type="checkbox"
          value="1"
          />
        }
        <label htmlFor={id} className="switch-button_switch">
        </label>
        {labelRight}
      </div>
    );
  }
}
