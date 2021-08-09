import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { Button as YaButton, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "../components/Button/Button";
import { getUser, logout } from "../services/actions/profile";
import { setUserForm, userForm } from "../services/actions/userDataForm";

function Profile() {
  const dispatch = useDispatch();
  const { userData } = useSelector(({ profile }) => profile);
  const { form } = useSelector(({ userFormReducer }) => userFormReducer);

  useEffect
  (() => {
    dispatch(getUser());
  }, [getUser])

  useEffect
  (() => {
     if (userData) {
       setInitialDataToForm();
     }
   }
    ,
   [userData]
  )

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
  }

  function cancelChanges(e) {
    e.preventDefault();
    setInitialDataToForm();
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userForm({ email: form.email, name: form.name, password: form.password }));
  }

  if (!form) {
    return (
      <p>Loading</p>
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
    </section>
  );
}

export default Profile;
