import React from "react";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { useDrop } from "react-dnd";
import { ADD_SELECTED_INGREDIENT, REMOVE_SELECTED_INGREDIENT } from "../../services/actions/burgerConstructor";
import DraggableCard from "../DraggableCard/DraggableCard";
import { nanoid } from "nanoid";
import api from "../../utils/api";
import { ORDER_DETAILS_SET_STATUS, ORDER_DETAILS_SET_VALUE } from "../../services/actions/orderDetailsModal";
import { useAuth } from "../../utils/auth";
import { useHistory } from "react-router-dom";

export function BurgerConstructor() {

  const { userData } = useAuth();
  console.log(userData)
  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = history;

  const onDrop = (itemData) => {
    if (itemData.type === 'bun') {
      selectedIngredients?.forEach(i => {
        if (i?.type === 'bun') return dispatch({ type: REMOVE_SELECTED_INGREDIENT, payload: i })
      })
    }
    dispatch({
               type: ADD_SELECTED_INGREDIENT,
               payload: { ...itemData, localId: nanoid() }
             })
  }

  const [, dropTarget] = useDrop({
                                   accept: 'items',
                                   drop(itemData) {
                                     onDrop(itemData)
                                   }
                                 })

  const { ingredients } = useSelector(({ ingredients }) => ingredients);
  const { selectedIngredients } = useSelector(({ burgerConstructor }) => burgerConstructor);

  const handleButtonClick = () => {

    if (!userData) {
      history.push({
                     pathname: '/login',
                     state: { from: location }
                   });
      return
    } else {
      const ingredientIds = selectedIngredients.map((i) => i?.id);
      api.sendOrder(ingredientIds)
         .then(res => {
           dispatch({ type: ORDER_DETAILS_SET_VALUE, payload: { orderId: res.order.number } })
           dispatch({ type: ORDER_DETAILS_SET_STATUS, payload: { isModalOpen: true } })
         })
         .catch(res => console.log(`Возникла ошибка: ${res}`));
    }
  }


  const renderElement = selectedIngredients.map(({ id, localId, type }, index) => {
    if (type === 'bun') return null;
    const fullMealData = ingredients.find(i => i._id === id)
    return (
      <DraggableCard key={localId} localId={localId} meal={fullMealData} index={index}/>
    )
  })

  const bunData = ingredients?.find(i => {
    const selectedBun = selectedIngredients.find(i => i?.type === 'bun');
    return i._id === selectedBun?.id
  })

  const totalPrice = selectedIngredients.reduce((acc, item) => {
    const data = ingredients?.find(i => i._id === item?.id);
    return data?.price ? acc += data.price : acc

  }, 0)


  return (
    <div ref={dropTarget} className={styles.wrapper}>

      <div className={styles.constructor}>
        {bunData && <div className="pl-8 pr-3">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunData?.name} (верх)`}
            price={bunData?.price}
            thumbnail={bunData?.image_mobile}
          />
        </div>}

        <div className={`${styles.meals} pr-1`}>
          {renderElement}
        </div>
        {bunData && <div className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunData?.name} (низ)`}
            price={bunData?.price}
            thumbnail={bunData?.image_mobile}
          />
        </div>}
      </div>

      <div className={`${styles.container} mt-10`}>
        <div className={`${styles.amount} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary"/>
        </div>
        {selectedIngredients.length &&
        <Button type="primary" size="large" onClick={handleButtonClick}>Нажми на меня</Button>}
      </div>
    </div>
  );
}

export default BurgerConstructor;
