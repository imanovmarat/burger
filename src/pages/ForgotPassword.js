import React, { useState } from 'react';

import styles from './ForgotPassword.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import api from "../utils/api";

function ForgotPassword() {

  const [email, setEmail] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.checkEmail({ email })
       .then(res => {
         console.log(res);
       })
       .catch(err => console.log(`Возникла ошибка: ${err}`));
  }

  return (
    <section className={styles.container}>
      <form id="forgot_password" onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium ">Восстановление пароля</h1>
        <Input size={"default"} type="email" placeholder={'Укажите e-mail'} value={email}
               onChange={handleChangeEmail}/>
        <Button size={"medium"}>Восстановить</Button>
      </form>


      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link
        to='/register' className={styles.link}>Войти</Link></p>
    </section>
  );
}

export default ForgotPassword;
