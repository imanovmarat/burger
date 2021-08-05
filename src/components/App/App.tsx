import React, {useEffect} from "react";
import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

// @ts-ignore
import {Route, Switch, useLocation} from "react-router-dom";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch} from "react-redux";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import {ProtectedRoute} from "../ProtectedRoute";
import {getIngredients} from "../../services/actions";
import {ProtectedResetPasswordRoute} from "../ProtectedResetPasswordRoute";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;


  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])


  /*  const {isModalOpen: isIngredientDetailsModalOpen} = useSelector(store => (store as any).ingredientDetails);
    const {isModalOpen: isOrderDetailsModalOpen} = useSelector(store => (store as any).orderDetails);*/
  /*

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
  */


  return (
    <div className={styles.page}>
      <AppHeader/>
      <div className={styles.container}>
        <main className={styles.content}>
          <Switch location={background || location}>
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
            <ProtectedResetPasswordRoute path='/reset-password'>
              <ResetPassword/>
            </ProtectedResetPasswordRoute>
            <Route path='/feed'>
            </Route>
            <Route path='/feed/:id'>
            </Route>
            <ProtectedRoute path='/profile'>
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

      {background &&
      <Modal>
        <Switch>
          <Route path="/ingredients/:id">
            <IngredientDetails/>
          </Route>
          <Route path="/order">
            <OrderDetails/>
          </Route>
        </Switch>
      </Modal>

      }

      {/*      <Modal onClose={handleCloseModal} isOpen={isIngredientDetailsModalOpen}>
        <IngredientDetails/>
      </Modal>*/}
      {/*{background &&
      <Route path="/ingredients/:id">
        <div style={{'fontSize': '140px'}}>ЗИНА!!!!</div>
        <Modal onClose={handleCloseModal} isOpen={true}>
          <OrderDetails/>
        </Modal>
      </Route>}*/}

      {/*        <Modal onClose={handleCloseModal} isOpen={isOrderDetailsModalOpen}>
          <OrderDetails/>
        </Modal>*/}

    </div>
  );
}

export default App;
