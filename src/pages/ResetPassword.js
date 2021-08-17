import React, { useState } from 'react';

import styles from './ForgotPassword.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import api from "../utils/api";

function ResetPassword() {

  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const history = useHistory();

  const
    [showPassword, setShowPassword] = useState(false);

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeCode(e) {
    setCode(e.target.value);
  }

  function onIconClick() {
    setShowPassword(prev => !prev)
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.resetPassword({ password, token: code })
       .then(res => {
         console.log(res);
         history.replace({ pathname: '/login', state: null })
       })
       .catch(err => {
         console.log(`Возникла ошибка: ${err}`);
         history.replace({ pathname: '/login', state: null })
       });
  }

  return (
    <section className={styles.container}>
      <form id="forgot_password" onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium ">Восстановление пароля</h1>
        <Input type={showPassword ? 'text' : 'password'} placeholder={'Введите новый пароль'} value={password}
               onChange={handleChangePassword}
               icon={showPassword ? 'ShowIcon' : 'HideIcon'} onIconClick={onIconClick}/>
        <Input type={'text'} placeholder={'Введите код из письма'} value={code}
               onChange={handleChangeCode}/>
        <Button size={"medium"}>Восстановить</Button>
      </form>


      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link
        to='/register' className={styles.link}>Войти</Link></p>
    </section>
  );
}

export default ResetPassword;
