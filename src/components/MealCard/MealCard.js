import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./MealCard.module.css";

export class MealCard extends React.Component {
  render() {
    return (
      <article className={styles.container}>
        <div className={`${styles.img_wrap} pl-4 pr-4`}>
          {this.props.quantity && (<div className={`${styles.quantity} text text_type_digits-default`}>{this.props.quantity}</div>)}
          <img src={this.props.img} alt={this.props.title} className={styles.img} />
        </div>
        <div className={`${styles.currency} mt-1`}>
          <span className="text text_type_digits-default mr-2">{this.props.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.title} text text_type_main-default mt-1`}>{this.props.title}</h3>
      </article>
    );
  }
}

export default MealCard;
