import React from 'react';
import styles from './OrderDetails.module.css'
import Modal from "../Modal/Modal";
import CheckMarkIconPath from '../../images/CheckMark.svg'

function OrderDetails({ isOpen, onClose}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p className={`${styles.title} text text_type_digits-large mt-20 mb-8`}>034536</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <div className="mb-15">
          <img src={CheckMarkIconPath}/>
        </div>
        <p className="text text_type_main-default mb-2"><b>Ваш заказ начали готовить</b></p>
        <p className="text text_type_main-default text_color_inactive mb-20"><b>Дождитесь готовности на орбитальной станции</b></p>
      </div>
    </Modal>
  );
}

export default OrderDetails;
