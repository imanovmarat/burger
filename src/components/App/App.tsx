import React, {useEffect, useState} from "react";
import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import api from "../../utils/api";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import { IngredientsContext } from "../../contexts/IngredientsContext";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] = useState(false)
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [orderInformation, setOrderInformation] = useState(0);


  //Получаем данные из апи

  useEffect(() => {
    api.getIngredients()
      .then(res => setIngredients(res.data))
      .catch(res => console.log(`Возникла ошибка: ${res}`));
  }, [])

  //Обрабочик на нажание клавиши esc

  React.useEffect(() => {
    function handleEscClose(evt:any) {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);

  },[])

  const handleOpenModal = (ing:any) => {
    setIsIngredientDetailsModalOpen(true);
    setSelectedIngredient(ing);
  }

  const handleSendOrderClick = ({ ingredientIds }:any) => {
    console.log(ingredientIds);
    api.sendOrder({ingredients})
      .then(res => {
        setOrderInformation(res?.order?.number);
        setIsOrderDetailsModalOpen(true);
      })
      .catch(res => console.log(`Возникла ошибка: ${res}`));

  }

  const handleCloseModal = () => {
    setIsIngredientDetailsModalOpen(false);
    setSelectedIngredient(null);
    setIsOrderDetailsModalOpen(false);
  }

  return (
    <div className={styles.page}>
      <AppHeader/>
      <div className={styles.container}>
        <main className={styles.content}>
          <IngredientsContext.Provider value={ingredients}>
          <section className={`${styles.section} mr-10`}>
            <BurgerIngredients onClick={handleOpenModal} />
          </section>
          <section className={`${styles.section} pt-25 pl-4`}>
            <BurgerConstructor onOrderButtonClick={handleSendOrderClick}/>
          </section>
          </IngredientsContext.Provider>
        </main>
      </div>

      <Modal onClose={handleCloseModal} isOpen={isIngredientDetailsModalOpen} >
        <IngredientDetails ingredient={selectedIngredient}/>
      </Modal >

      <Modal onClose={handleCloseModal} isOpen={isOrderDetailsModalOpen}  >
        <OrderDetails orderInformation={orderInformation} />
      </Modal >

    </div>
  );
}

export default App;
