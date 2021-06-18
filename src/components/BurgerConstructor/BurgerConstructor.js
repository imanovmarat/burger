import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button, DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { data } from "../../utils/data";

export class BurgerConstructor extends React.Component {
  render() {
    const chosenBun = data[0];
    const ingredients = data.filter(meal => meal.type !== 'bun');
    return (
      <>
        <div className={styles.constructor}>
          <div className="pl-8 pr-3">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${chosenBun.name} (верх)`}
              price={chosenBun.price}
              thumbnail={chosenBun.image_mobile}
            />
          </div>

          <div className={`${styles.meals} pr-1`}>
            {ingredients.map((meal) => (
              <div className={styles.meal} key={meal._id}>
                <div className="mr-2">
                  <DragIcon type="primary"/>
                </div>
                <ConstructorElement
                  text={meal.name}
                  price={meal.price}
                  thumbnail={meal.image_mobile}
                />
              </div>

            ))}
          </div>
          <div className="pl-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${chosenBun.name} (низ)`}
              price={chosenBun.price}
              thumbnail={chosenBun.image_mobile}
            />
          </div>
        </div>
        <div className={`${styles.container} mt-10`}>
          <div className={`${styles.amount} mr-10`}>
            <span className="text text_type_digits-medium mr-2">600</span>
            <CurrencyIcon type="primary"/>
          </div>
          <Button type="primary" size="large">Нажми на меня</Button>
        </div>
      </>
    );
  }
}

export default BurgerConstructor;
