import React, {useEffect, useState} from "react";
import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import api from "../../utils/api";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] = useState(false)
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)


  //Получаем данные из апи

  useEffect(() => {
    api.getIngredients().then(res => setIngredients(res.data));
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

  const handleOpenOrderModal = () => {
    setIsOrderDetailsModalOpen(true);
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
          <section className={`${styles.section} mr-10`}>
            <BurgerIngredients onClick={handleOpenModal} ingredients={ingredients}/>
          </section>
          <section className={`${styles.section} pt-25 pl-4`}>
            <BurgerConstructor ingredients={ingredients} onOrderButtonClick={handleOpenOrderModal}/>
          </section>
        </main>
      </div>
      <IngredientDetails onClose={handleCloseModal} isOpen={isIngredientDetailsModalOpen} ingredient={selectedIngredient}/>
      <OrderDetails onClose={handleCloseModal} isOpen={isOrderDetailsModalOpen} />
    </div>
  );
}

export default App;
