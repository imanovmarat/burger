import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngCard.module.css';

export function IngCard({ img, title, price, count }) {
  return <figure className={`${styles.container} text mb-4`}>
    <div className={`${styles.img_container}`}>
      <div className={`${styles.img_wrap}`}>
        <img className={`${styles.img}`} src={img} alt={title}/>
      </div>
      <figcaption className={`${styles.caption} text text_type_main-default ml-4`}>{title}</figcaption>
    </div>
    <div className={`${styles.price_wrap}`}>
      <span
        className={`${styles.price} text text_type_digits-default mr-2`}>{count ? `${count} × ${price}` : price}</span>
      <CurrencyIcon type={"primary"}/>
    </div>

  </figure>;
}
