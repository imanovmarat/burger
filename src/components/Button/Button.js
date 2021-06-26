import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ children, onClick }) {

  const handleClick = (e) => {
   onClick(e);
    console.log('click')
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func.isRequired
}
