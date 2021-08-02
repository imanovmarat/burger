import React, {useEffect} from "react";
import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import api from "../../utils/api";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

// @ts-ignore
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {
  INGREDIENT_DETAILS_SET_STATUS,
  INGREDIENT_DETAILS_SET_VALUE
} from "../../services/actions/ingredientDetailsModal";
import {ORDER_DETAILS_SET_STATUS, ORDER_DETAILS_SET_VALUE} from "../../services/actions/orderDetailsModal";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import {ProtectedRoute} from "../protected-route";
import {getIngredients} from "../../services/actions";
import {useAuth} from "../../utils/auth";

function App() {
  const {getUser}: any = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    getUser();
  }, [dispatch])

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

  const {isModalOpen: isIngredientDetailsModalOpen} = useSelector(store => (store as any).ingredientDetails);
  const {isModalOpen: isOrderDetailsModalOpen} = useSelector(store => (store as any).orderDetails);

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
    <Router>
      <div className={styles.page}>
        <AppHeader/>
        <div className={styles.container}>
          <main className={styles.content}>
            <Switch>
              <Route exact path='/'>
                <DndProvider backend={HTML5Backend}>
                  <section className={`${styles.section} mr-10`}>
                    <BurgerIngredients/>
                  </section>
                  <section className={`${styles.section} pt-25 pl-4`}>
                    <BurgerConstructor/>
                  </section>
                </DndProvider>
              </Route>
              <Route path='/login'>
                <Login/>
              </Route>
              <Route path='/register'>
                <Register/>
              </Route>
              <Route path='/forgot-password'>
                <ForgotPassword/>
              </Route>
              <Route path='/reset-password'>
                <ResetPassword/>
              </Route>
              <Route path='/feed'>
              </Route>
              <Route path='/feed/:id'>
              </Route>
              <ProtectedRoute path={'/profile'}>
                <Profile/>
              </ProtectedRoute>
              <Route path='/ingredients/:id'>
                <IngredientDetails/>
              </Route>
              <Route path='*'>
                <div>Тут ничего нет. 404</div>
              </Route>
            </Switch>
          </main>
        </div>

        <Modal onClose={handleCloseModal} isOpen={isIngredientDetailsModalOpen}>
          <IngredientDetails/>
        </Modal>

        <Modal onClose={handleCloseModal} isOpen={isOrderDetailsModalOpen}>
          <OrderDetails/>
        </Modal>

      </div>

    </Router>
  );
}

export default App;
