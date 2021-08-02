import React, { useEffect, useState } from 'react';
import styles from './IngredientDetails.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const params = useParams();
  let { selectedIngredient } = useSelector(({ ingredientDetails }) => ingredientDetails);
  const { ingredients } = useSelector(({ ingredients }) => ingredients)

  const [ingredient, setIngredient] = useState();
  const [fullPage, setFullPage] = useState(false);

  useEffect(() => {
    if (!selectedIngredient && params.id) {
      setIngredient(ingredients.find(i => {return i._id === params.id}))
      setFullPage(true)
    } else {
      setIngredient(selectedIngredient)
    }

  }, [ingredients, params, selectedIngredient])


  if (!ingredient) return null

  return (
    <div className={styles.container}>
      {fullPage && (<h1 className="text text_type_main-medium mt-30">Детали ингредиента</h1>)}
      <figure className={styles.imgWrapper}>
        <img src={ingredient.image_large} alt={ingredient.name}/>
        <figcaption className="text text_type_main-default mt-4 mb-8"><b>{ingredient.name}</b></figcaption>
      </figure>
      <ul className={styles.list}>
        <li className={`${styles.item} mr-5 text text_type_main-default text_color_inactive`}><span>Калории, ккал</span>
          <span>{ingredient.calories}</span></li>
        <li className={`${styles.item} mr-5 text text_type_main-default text_color_inactive`}>
          <span>Белки, г</span>{ingredient.proteins}</li>
        <li className={`${styles.item} mr-5 text text_type_main-default text_color_inactive`}>
          <span>Жиры,г</span>{ingredient.fat}</li>
        <li className={`${styles.item} mr-5 text text_type_main-default text_color_inactive`}>
          <span>Углеводы, г</span>{ingredient.carbohydrates}</li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
