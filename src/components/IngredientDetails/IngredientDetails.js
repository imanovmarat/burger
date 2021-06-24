import React from 'react';
import Modal from "../Modal/Modal";
import styles from './IngredientDetails.module.css';

function IngredientDetails({onClose, isOpen, ingredient}) {
  if (!ingredient) return null;
  return (
    <Modal onClose={onClose} isOpen={isOpen} title='Детали ингредиента'>
      <div className={styles.container}>
        <figure className={styles.imgWrapper}>
          <img src={ingredient.image_large} alt={ingredient.name}/>
          <figcaption className="text text_type_main-default mt-4 mb-8"><b>{ingredient.name}</b></figcaption>
        </figure>
        <ul className={styles.list}>
          <li className={`${ styles.item } mr-5 text text_type_main-default text_color_inactive`}><span>Калории, ккал</span> <span>{ingredient.calories}</span></li>
          <li className={`${ styles.item } mr-5 text text_type_main-default text_color_inactive`}><span>Белки, г</span>{ingredient.proteins}</li>
          <li className={`${ styles.item } mr-5 text text_type_main-default text_color_inactive`}><span>Жиры,г</span>{ingredient.fat}</li>
          <li className={`${ styles.item } mr-5 text text_type_main-default text_color_inactive`}><span>Углеводы, г</span>{ingredient.carbohydrates}</li>
        </ul>
      </div>
    </Modal>
  );
}

export default IngredientDetails;
