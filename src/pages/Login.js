import React, { useCallback, useState } from 'react';

import styles from './Login.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useSelector } from "react-redux";


function Login() {
  let { signIn } = useAuth();
  const history = useHistory();
  const { state } = history.location;
  const { isAuthorized } = useSelector(({ profile }) => profile);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    signIn({ email, password });
  }, [signIn, email, password])

  function onIconClick() {
    setShowPassword(prev => !prev)
  }


  if (isAuthorized) {
    return (
      <Redirect
        to={state?.from || '/'}
      />
    );
  }


  return (
    <section className={styles.container}>
      <form id="login" onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium ">Вход</h1>
        <Input size={"default"} type="email" placeholder={'Электропочта'} value={email} onChange={handleChangeEmail}/>
        <Input type={showPassword ? 'text' : 'password'} placeholder={'Пароль'} value={password}
               onChange={handleChangePassword}
               icon={showPassword ? 'ShowIcon' : 'HideIcon'} onIconClick={onIconClick}/>
        <Button size={"medium"}>Войти</Button>
      </form>


      <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь? <Link
        to='/register' className={styles.link}>Зарегистрируйтесь</Link></p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password'
                                                                                          className={styles.link}>Восстановить
        пароль</Link></p>
    </section>
  );
}

export default Login;
