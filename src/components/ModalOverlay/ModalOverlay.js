import React from "react";
import styles from './ModalOverlay.module.css';
import PropTypes from "prop-types";

export function ModalOverlay({ onClose, children }) {

  function handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section className={styles.popup + ' ' + styles.popup_opened} onClick={handleOutsideClickClose}>
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

