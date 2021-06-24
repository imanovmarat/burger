import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./MealCard.module.css";

export function MealCard({ data, onClick}) {

  const handleCardClick = () => {
    console.log('cliccc')
    onClick(data);
  }

  return (
    <article className={styles.container} onClick={handleCardClick}>
      <div className={`${styles.img_wrap} pl-4 pr-4`}>
        {data.quantity && (<div className={`${styles.quantity} text text_type_digits-default`}>{data.quantity}</div>)}
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
