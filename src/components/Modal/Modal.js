import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from "prop-types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Button from "../Button/Button";

const modalRoot = document.getElementById("react-modals");

function Modal({isOpen, onClose, children, title = ''}) {
  return ReactDOM.createPortal((
    <ModalOverlay onClose={onClose} isOpen={isOpen}>
      <div className={`${styles.popup__container} p-10`}>
        <p className="text text_type_main-medium">{title}</p>
        <div className={styles.IconWrapper}>
          <Button onClick={onClose}>
            <CloseIcon type="primary"/>
          </Button>
        </div>
        {children}
      </div>
    </ModalOverlay>
  ), modalRoot)
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

