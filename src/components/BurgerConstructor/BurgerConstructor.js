import React, { useContext, useReducer, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { IngredientsContext } from "../../contexts/IngredientsContext";

export function BurgerConstructor({ onOrderButtonClick }) {
  const ingredients = useContext(IngredientsContext);

  const total = { amount: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return { amount: state.amount + action.payload };
      case 'sub':
        return { amount: state.amount - action.payload };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [state, dispatcher] = useReducer(reducer, total, undefined)
  const [chosenBun, setChosenBuh] = useState();
  const [ingredientList, setIngredientList] = useState([]);

  // Этот эффект мне и самому не нравится, много намешано. Тут я отфильтровываю булки и считаю стоимость.

  useEffect(()=> {
    const ingredientWithoutBuhs = ingredients.filter(meal => {
      if (meal.type !== 'bun') {
        dispatcher({ type: 'add', payload: meal.price });
      } else {
        setChosenBuh(meal);
        dispatcher({ type: 'add', payload: meal.price * 2 });
      }
      return meal.type !== 'bun'
    });
    setIngredientList(ingredientWithoutBuhs);
  }, [ingredients])

  const handleButtonClick = () => {
    let ingredientIds = ingredientList.map((i) => i._id);
    ingredientIds.push(chosenBun._id);
    onOrderButtonClick({ ingredientIds });
  }

  const renderElement = ingredientList?.map((meal) => {
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
          <span className="text text_type_digits-medium mr-2">{state.amount}</span>
          <CurrencyIcon type="primary"/>
        </div>
        {ingredients.length && <Button type="primary" size="large" onClick={handleButtonClick}>Нажми на меня</Button>}
      </div>
    </>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onOrderButtonClick: PropTypes.func.isRequired
}
