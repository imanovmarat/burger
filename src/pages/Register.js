import React, { useCallback, useEffect, useState } from 'react';

import styles from './Register.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { getUser, register } from "../services/actions/profile";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const dispatch = useDispatch();

  const { isAuthorized } = useSelector(({ profile }) => profile);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(getUser());
    }
  }, [isAuthorized, dispatch, getUser]);


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register({ email, password, name }));
  }

  function onIconClick() {
    setShowPassword(prev => !prev)
  }

  if (isAuthorized) {
    return (
      <Redirect
        to={'/'}
      />
    );
  }

  return (
    <section className={styles.container}>
      <form id="register" onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium ">Регистрация</h1>
        <Input size={"default"} type="text" placeholder={'Имя'} value={name} onChange={handleChangeName}/>
        <Input size={"default"} type="email" placeholder={'Электропочта'} value={email} onChange={handleChangeEmail}/>
        <Input type={showPassword ? 'text' : 'password'} placeholder={'Пароль'} value={password}
               onChange={handleChangePassword}
               icon={showPassword ? 'ShowIcon' : 'HideIcon'} onIconClick={onIconClick}/>
        <Button size={"medium"}>Зарегистрироваться</Button>
      </form>


      <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link
        to='/login' className={styles.link}>Войти</Link></p>
    </section>
  );
}

export default Register;
