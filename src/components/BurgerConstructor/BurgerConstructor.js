import React, { useContext, useReducer, useEffect, useState, useRef } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import PropTypes, { element } from "prop-types";
import { IngredientsContext } from "../../contexts/IngredientsContext";
import { useSelector, useDispatch } from "react-redux";

import { useDrop, useDrag} from "react-dnd";
import { GET_INGREDIENT_BY_ID, REMOVE_SELECTED_INGREDIENT } from "../../services/actions";
import DraggableCard from "../DraggableCard/DraggableCard";

export function BurgerConstructor({ onOrderButtonClick, onDropHandler }) {

  const dispatch = useDispatch();

  const onDrop = (itemData) => {
    if (itemData.type === 'bun') {
      selectedIngredients?.forEach( i => {
        console.log('i.type ', i)
        if (i?.type === 'bun') return dispatch({ type: REMOVE_SELECTED_INGREDIENT, payload: i })
      })
    }
    onDropHandler(itemData);
  }

  const [, dropTarget] = useDrop({
    accept: 'items',
    drop(itemData) {
      onDrop(itemData)
    }
  })

  // const ingredients = useContext(IngredientsContext);
  const { selectedIngredients, ingredients } = useSelector(store => {
    console.log(store)
    return store?.ingredientsReducer})

  useEffect(() => {
    const fullDataIngredients = selectedIngredients?.map((i) => ingredients?.find(ing => ing._id === i?.id))
    setIngredientList(fullDataIngredients)
  }, [selectedIngredients])

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

/*  useEffect(()=> {
    const ingredientWithoutBuhs = selectedIngredients.filter(meal => {
      if (meal.type !== 'bun') {
        dispatcher({ type: 'add', payload: meal.price });
      } else {
        setChosenBuh(meal);
        dispatcher({ type: 'add', payload: meal.price * 2 });
      }
      return meal.type !== 'bun'
    });
    setIngredientList(ingredientWithoutBuhs);
  }, [selectedIngredients])*/



  const handleButtonClick = () => {
    console.log('selectedIngredients', selectedIngredients)
    const ingredientIds = selectedIngredients.map((i) => i.  id);

    onOrderButtonClick({ ingredientIds });
  }


  const renderElement = ingredientList?.map((meal, index) => {
    if ( meal?.type === 'bun') return null;
    if ( !meal?.type ) return null;
    return (
      <DraggableCard selectedIngredients={selectedIngredients} meal={meal} index={index}/>
      )
  })

  const bunData = ingredients?.find( i => {
    const selectedBun = selectedIngredients.find( i => i?.type === 'bun');
    return i._id === selectedBun?.id
  })

  const totalPrice = selectedIngredients.reduce( (acc, item ) => {
    const data = ingredients?.find( i => i._id === item?.id);
    return data?.price ? acc += data.price : acc

  }, 0)



  return (
    <div ref={dropTarget} className={styles.wrapper}>

      <div className={styles.constructor}>
        { bunData && <div className="pl-8 pr-3">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunData?.name} (верх)`}
            price={bunData?.price}
            thumbnail={bunData?.image_mobile}
          />
        </div> }

        <div className={`${styles.meals} pr-1`}>
          {renderElement}
        </div>
        { bunData && <div className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunData?.name} (низ)`}
            price={bunData?.price}
            thumbnail={bunData?.image_mobile}
          />
        </div> }
      </div>

      <div className={`${styles.container} mt-10`}>
        <div className={`${styles.amount} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary"/>
        </div>
        {selectedIngredients.length && <Button type="primary" size="large" onClick={handleButtonClick}>Нажми на меня</Button>}
      </div>
    </div>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onOrderButtonClick: PropTypes.func.isRequired
}
