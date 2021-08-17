import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ children, onClick, className }) {

  const handleClick = (e) => {
    onClick(e);
  }

  return (
    <button className={styles.button + ' ' + className} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func.isRequired
}
