import React, { useReducer, useRef, useState } from 'react';
import styles from './Profile.module.css';
import { Button as YaButton, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useAuth } from "../utils/auth";
import Button from "../components/Button/Button";
import { changeUserDataRequest } from "../utils/api";
import { REQUEST_SUCCESS } from "../services/actions/profile";

function Profile() {
  let { signOut, userData, ...auth } = useAuth();
  const dispatch = useDispatch();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleExit() {
    signOut();
  }

  function cancelChanges(e) {
    e.preventDefault();
    setName(userData.name);
    setEmail(userData.email);
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    changeUserDataRequest({ email, name, password })
      .then(res => dispatch({ type: REQUEST_SUCCESS, payload: res }))
  }


  if (!userData) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
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
        <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете
          изменить свои персональные данные</p>
      </div>

      <form id="profile" className={`${styles.form} ml-15`}>
        <Input size={"default"} type="text" placeholder={'Имя'}
               value={name}
               onChange={handleChangeName}
               icon={'EditIcon'}/>
        <Input size={"default"} type="email" placeholder={'Электропочта'}
               value={email}
               onChange={handleChangeEmail}
               icon={'EditIcon'}/>
        <Input type={'password'} id='password' placeholder={'Пароль'} value={password}
               onChange={handleChangePassword}
               icon={'EditIcon'}/>
        <div className={`${styles.buttonsWrap}`}>
          <YaButton type={'secondary'} size={"medium"} onClick={cancelChanges}>Отмена</YaButton>
          <YaButton size={"medium"} onClick={handleSubmit}>Сохранить</YaButton>
        </div>
      </form>
    </section>
  );
}

export default Profile;
