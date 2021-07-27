import React from 'react';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

function IngredientDetails() {

  const { selectedIngredient: ingredient }  = useSelector(({ ingredientDetails }) => ingredientDetails)

  if (!ingredient) return null;
  return (
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
  );
}

export default IngredientDetails;
