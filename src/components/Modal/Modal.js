import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from "prop-types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, title = '' }) {
  const history = useHistory();

  const onClose = useCallback(() => {
    history.goBack();
  }, [history])

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);

  }, [onClose])


  return ReactDOM.createPortal((
                                 <ModalOverlay onClose={onClose}>
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
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

