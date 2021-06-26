import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";

export function BurgerConstructor({ ingredients, onOrderButtonClick }) {
  if (!ingredients) return null;
  const chosenBun = ingredients[0];
  const ingredientList = ingredients.filter(meal => meal.type !== 'bun');

  const handleButtonClick = () => {
    onOrderButtonClick();
  }

  // Считаем сумму бургера
  let amount = chosenBun?.price * 2 || 0;

  const renderElement = ingredientList.map((meal) => {
    //добавляю в сумму
    amount += meal.price;
    return (<div className={styles.meal} key={meal._id}>
      <div className="mr-2">
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        text={meal.name}
        price={meal.price}
        thumbnail={meal.image_mobile}
      />
    </div>)
  })
  return (
    <>
      <div className={styles.constructor}>
        <div className="pl-8 pr-3">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${chosenBun?.name} (верх)`}
            price={chosenBun?.price}
            thumbnail={chosenBun?.image_mobile}
          />
        </div>

        <div className={`${styles.meals} pr-1`}>
          {renderElement}
        </div>
        <div className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${chosenBun?.name} (низ)`}
            price={chosenBun?.price}
            thumbnail={chosenBun?.image_mobile}
          />
        </div>
      </div>
      <div className={`${styles.container} mt-10`}>
        <div className={`${styles.amount} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{amount}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="large" onClick={handleButtonClick}>Нажми на меня</Button>
      </div>
    </>
  );
}

export default BurgerConstructor;

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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired),
  onOrderButtonClick: PropTypes.func.isRequired
}
