import React from "react";
import styles from './ModalOverlay.module.css';

export function ModalOverlay ({isOpen, onClose, children}) {

  function handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section className={styles.popup + ' ' + (isOpen && styles.popup_opened)} onClick={handleOutsideClickClose}>
      {children}
    </section>
  );
}
