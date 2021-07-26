import React from "react";
import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import api from "../../utils/api";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {
  INGREDIENT_DETAILS_SET_STATUS,
  INGREDIENT_DETAILS_SET_VALUE
} from "../../services/actions/ingredientDetailsModal";
import {ORDER_DETAILS_SET_STATUS, ORDER_DETAILS_SET_VALUE} from "../../services/actions/orderDetailsModal";

function App() {

  const dispatch = useDispatch();

  //Обрабочик на нажание клавиши esc

  React.useEffect(() => {
    function handleEscClose(evt: any) {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);

  }, [])

  const handleOpenModal = (ing: any) => {
    dispatch({
      type: INGREDIENT_DETAILS_SET_VALUE,
      payload: ing
    })
    dispatch({
      type: INGREDIENT_DETAILS_SET_STATUS,
      payload: {isModalOpen: true}
    })
  }

  const {isModalOpen: isIngredientDetailsModalOpen} = useSelector(store => (store as any).ingredientDetails);
  const {isModalOpen: isOrderDetailsModalOpen} = useSelector(store => (store as any).orderDetails);

  const handleSendOrderClick = ({ingredientIds}: any) => {
    api.sendOrder({ingredients: ingredientIds})
      .then(res => {
        dispatch({type: ORDER_DETAILS_SET_VALUE, payload: {orderId: res.order.number}})
        dispatch({type: ORDER_DETAILS_SET_STATUS, payload: {isModalOpen: true}})
      })
      .catch(res => console.log(`Возникла ошибка: ${res}`));

  }

  const handleCloseModal = () => {
    dispatch({
      type: INGREDIENT_DETAILS_SET_STATUS,
      payload: {isModalOpen: false}
    })
    dispatch({
      type: INGREDIENT_DETAILS_SET_VALUE,
      payload: {}
    })
    dispatch({
      type: ORDER_DETAILS_SET_STATUS,
      payload: {isModalOpen: false}
    })
  }


  return (
    <div className={styles.page}>
      <AppHeader/>
      <div className={styles.container}>
        <main className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <section className={`${styles.section} mr-10`}>
              <BurgerIngredients onClick={handleOpenModal}/>
            </section>
            <section className={`${styles.section} pt-25 pl-4`}>
              <BurgerConstructor onOrderButtonClick={handleSendOrderClick}/>
            </section>
          </DndProvider>
        </main>
      </div>

      <Modal onClose={handleCloseModal} isOpen={isIngredientDetailsModalOpen}>
        <IngredientDetails/>
      </Modal>

      <Modal onClose={handleCloseModal} isOpen={isOrderDetailsModalOpen}>
        <OrderDetails/>
      </Modal>

    </div>
  );
}

export default App;
