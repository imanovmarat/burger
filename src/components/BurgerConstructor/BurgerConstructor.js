import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { data } from "../../utils/data";

export class BurgerConstructor extends React.Component {
  render() {
    return (
      <>
        <div className={styles.constructor}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[1].image_mobile}
          />
          <div className={styles.meals}>
            {data.map((meal) => (
              <ConstructorElement
                text={meal.name}
                price={meal.price}
                thumbnail={meal.image_mobile}
              />
            ))}
          </div>

          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={data[1].image_mobile}
          />
        </div>
        <div className={`${styles.container} mt-10`}>
          <div className={`${styles.amount} mr-10`}>
            <span className="text text_type_digits-medium mr-2">600</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">Нажми на меня</Button>
        </div>
      </>
    );
  }
}

export default BurgerConstructor;
