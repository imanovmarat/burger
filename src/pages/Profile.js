import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { Button as YaButton, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch, useHistory, useLocation, withRouter } from "react-router-dom";
import Button from "../components/Button/Button";
import { getUser, logout } from "../services/actions/profile";
import { setUserForm, userForm } from "../services/actions/userDataForm";
import { OrderBrief } from "../components/OrderBrief/OrderBrief";
import Modal from "../components/Modal/Modal";
import OrderDescription from "../components/OrderDescription/OrderDescription";
import { getCookie } from "../utils/helpers";
import PropTypes from "prop-types";

function Profile({ location }) {
  console.log('location', location)
  const dispatch = useDispatch();
  const { userData, isAuthorized } = useSelector(({ profile }) => profile);
  const { form } = useSelector(({ userFormReducer }) => userFormReducer);
  const history = useHistory();
  const background = history?.action === 'PUSH' && location.state && location.state.background;
  const { wsConnected, messages: data } = useSelector(({ wsReducer }) => wsReducer)

  useEffect
  (() => {
    dispatch(getUser());
  }, [dispatch])

  useEffect
  (() => {
    if (userData) {
      setInitialDataToForm();
    }
  }, [userData])

  useEffect(() => {
    if (isAuthorized) {
      dispatch({ type: 'WS_CONNECTION_START', payload: { token: getCookie('token').split(' ')[1] } })
    }
    return () => dispatch({
                            type: 'WS_CONNECTION_CLOSE',
                            payload: { code: 1000 }
                          })
  }, [dispatch, isAuthorized])

  function setInitialDataToForm() {
    const keys = Object.keys(userData);
    keys.forEach(key => dispatch(setUserForm(key, userData[key])))
    dispatch(setUserForm('password', ''))
  }

  function handleChange(e) {
    dispatch(setUserForm(e.target.name, e.target.value))
  }

  function handleExit() {
    dispatch(logout());
    history.push('/');
  }

  function cancelChanges(e) {
    e.preventDefault();
    setInitialDataToForm();
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userForm({ email: form.email, name: form.name, password: form.password }));
  }

  if (!userData) {
    return (
      <p>Loading</p>
    );
  }

  const handleClick = (id) => {
    history.push({ pathname: `/profile/orders/${id}`, state: { background: location } })
  }


  return (
    <section className={`${styles.container} mt-30`}>
      <div>
        <ul className={`${styles.list} text text_type_main-medium`}>
          <li className={styles.list_item}>
            <NavLink exact to="/profile" activeClassName={styles.link_active}
                     className={`${styles.link}`}>Профиль</NavLink>
          </li>
          <li className={styles.list_item}>
            <NavLink exact to="/profile/orders" activeClassName={styles.link_active} className={`${styles.link}`}>История
              заказов</NavLink></li>
          <li className={styles.list_item}>
            <Button className={`${styles.link} text text_type_main-medium`} onClick={handleExit}>
              Выход
            </Button>
          </li>
        </ul>
        <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы
          можете
          изменить свои персональные данные</p>
      </div>

      <Switch location={background || location}>
        <Route exact path="/profile">
          <form id="profile" className={`${styles.form} ml-15`}>
            <Input size={"default"} type="text" placeholder={'Имя'} name='name'
                   value={form.name}
                   onChange={handleChange}
                   icon={'EditIcon'}/>
            <Input size={"default"} type="email" placeholder={'Электропочта'}
                   name='email'
                   value={form.email}
                   onChange={handleChange}
                   icon={'EditIcon'}/>
            <Input type={'password'} id='password' placeholder={'Пароль'} value={form.password}
                   name='password'
                   onChange={handleChange}
                   icon={'EditIcon'}/>
            <div className={`${styles.buttonsWrap}`}>
              <YaButton type={'secondary'} size={"medium"} onClick={cancelChanges}>Отмена</YaButton>
              <YaButton size={"medium"} onClick={handleSubmit}>Сохранить</YaButton>
            </div>
          </form>
        </Route>
        {!background && <Route path="/profile/orders/:id">
          <OrderDescription/>
        </Route>}
        <Route path="/profile/orders">
          <div className={`${styles.order_list} custom-scroll ml-15`}>
            {data[data.length - 1]?.orders.reverse().map(i => <OrderBrief key={i._id}
                                                                          onClick={handleClick}
                                                                          id={i.number}
                                                                          date={i.createdAt}
                                                                          title={i.name}
                                                                          ingredients={i.ingredients}/>)}
          </div>

        </Route>
      </Switch>

      {background &&
      <Route path="/profile/orders/:id">
        <Modal>
          <OrderDescription/>
        </Modal>
      </Route>
      }

    </section>
  );
}

export default withRouter(Profile);

Profile.propTypes = {
  location: PropTypes.object.isRequired,
}
