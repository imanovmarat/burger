import React, {useEffect, useState} from "react";
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

import {IngredientsContext} from "../../contexts/IngredientsContext";
import {useDispatch, useSelector} from "react-redux";
import {INGREDIENT_DETAILS_SET_STATUS, INGREDIENT_DETAILS_SET_VALUE} from "../../services/actions/modal";
import {ADD_SELECTED_INGREDIENT} from "../../services/actions";

function App() {
  const [ingredients,] = useState([]);
  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] = useState(false)
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [orderInformation, setOrderInformation] = useState(0);

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
      isModalOpen: true
    })
    /*setIsIngredientDetailsModalOpen(true);
    setSelectedIngredient(ing);*/
  }

  const {isModalOpen} = useSelector(store => (store as any).ingredientDetailsReducer)

  const handleSendOrderClick = ({ingredientIds}: any) => {
    console.log(ingredientIds);
    api.sendOrder({ingredients})
      .then(res => {
        setOrderInformation(res?.order?.number);
        setIsOrderDetailsModalOpen(true);
      })
      .catch(res => console.log(`Возникла ошибка: ${res}`));

  }

  const handleCloseModal = () => {
    dispatch({
      type: INGREDIENT_DETAILS_SET_STATUS,
      isModalOpen: false
    })
    /*    setIsIngredientDetailsModalOpen(false);
        setSelectedIngredient(null);
        setIsOrderDetailsModalOpen(false);*/
  }

  const handleDrop = (itemData:any) => {
    console.log('itemId ', itemData)
    dispatch({
      type: ADD_SELECTED_INGREDIENT,
      payload: itemData
    })
  };


  return (
    <div className={styles.page}>
      <AppHeader/>
      <div className={styles.container}>
        <main className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <IngredientsContext.Provider value={ingredients}>
              <section className={`${styles.section} mr-10`}>
                <BurgerIngredients onClick={handleOpenModal}/>
              </section>
              <section className={`${styles.section} pt-25 pl-4`}>
                <BurgerConstructor onOrderButtonClick={handleSendOrderClick} onDropHandler={handleDrop}/>
              </section>
            </IngredientsContext.Provider>
          </DndProvider>
        </main>
      </div>

      <Modal onClose={handleCloseModal} isOpen={isModalOpen}>
        <IngredientDetails/>
      </Modal>

      <Modal onClose={handleCloseModal} isOpen={isOrderDetailsModalOpen}>
        <OrderDetails orderInformation={orderInformation}/>
      </Modal>

    </div>
  );
}

export default App;
