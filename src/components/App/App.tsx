import React, {useEffect} from "react";
import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

// @ts-ignore
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
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
import Feed from "../Feed/Feed";
import OrderDescription from "../OrderDescription/OrderDescription";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = history?.action === 'PUSH' && location.state && location.state.background;


  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])
  /*  console.log('locationAPP', location)
    console.log('historyAPP', history)
    console.log('backgroundAPP', background)*/
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
            <Route path='/feed/:id'>
              <OrderDescription/>
            </Route>
            <Route path='/feed'>
              <Feed/>
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

      <Switch>
        <Route path="/ingredients/:id">
          <Modal>
            <IngredientDetails/>
          </Modal>
        </Route>
        <Route path="/order">
          <Modal>
            <OrderDetails/>
          </Modal>
        </Route>
        <Route path="/feed/:id">
          <Modal>
            <OrderDescription/>
          </Modal>
        </Route>
      </Switch>

      }

    </div>
  );
}

export default App;
