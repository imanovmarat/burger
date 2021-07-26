import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./MealCard.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

export function MealCard({ data, onClick }) {
  const handleCardClick = () => {
    onClick(data);
  }

  const { selectedIngredients } = useSelector(({ burgerConstructor }) => burgerConstructor)
  const quantity = selectedIngredients.filter(i => i?.id === data._id).length

  const [, ref] = useDrag({
                            type: 'items',
                            item: {
                              id: data._id,
                              type: data.type
                            },
                          });
  return (
    <article ref={ref} className={styles.container} onClick={handleCardClick}>
      <div className={`${styles.img_wrap} pl-4 pr-4`}>
        {quantity && (<div className={`${styles.quantity} text text_type_digits-default`}>{quantity}</div>)}
        <img src={data.image} alt={data.name} className={styles.image}/>
      </div>
      <div className={`${styles.currency} mt-1`}>
        <span className="text text_type_digits-default mr-2">{data.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <h3 className={`${styles.title} text text_type_main-default mt-1`}>{data.name}</h3>
    </article>
  );
}

export default MealCard;

MealCard.propTypes = {
  data: PropTypes.shape({
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
                        }).isRequired,
  onClick: PropTypes.func.isRequired
}
