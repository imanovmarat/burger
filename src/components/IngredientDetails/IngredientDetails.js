import React from 'react';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ ingredient }) {
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

const ingredientPropTypes = PropTypes.shape({
                                              _id: PropTypes.string.isRequired,
                                              type: PropTypes.string.isRequired,
                                              proteins: PropTypes.number.isRequired,
                                              fat: PropTypes.number.isRequired,
                                              carbohydrates: PropTypes.number.isRequired,
                                              calories: PropTypes.number.isRequired,
                                              price: PropTypes.number.isRequired,
                                              name: PropTypes.string.isRequired,
                                              image: PropTypes.string.isRequired,
                                              image_large: PropTypes.string.isRequired,
                                            });

IngredientDetails.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired),
}
