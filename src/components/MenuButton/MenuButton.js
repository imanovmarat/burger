import React from 'react';
import styles from './MenuButton.module.css';

class MenuButton extends React.Component {
  render() {
    return (
      <button className={`${styles.button} text text_type_main-default pl-5 pr-5 pt-4 pb-4 ${this.props.className}`}>
          {this.props.children}
      </button>
    )
  }
}

export default MenuButton;