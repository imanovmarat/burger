import React, { useEffect, useState } from 'react';

import styles from './ForgotPassword.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_AUTHORIZATION_STATUS } from "../services/actions/profile";

function ForgotPassword() {

  const [email, setEmail] = useState('');
  const { isAuthorized } = useSelector(({ profile }) => profile);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(history);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch({ type: SET_USER_AUTHORIZATION_STATUS, payload: true })
    }
  }, [dispatch])

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.checkEmail({ email })
       .then(_ => {
         history.push({
                        pathname: '/reset-password',
                        state: { from: history.location.pathname }
                      })
       })
       .catch(err => console.log(`Возникла ошибка: ${err}`));
  }

  if (isAuthorized) {
    history.replace({ pathname: '/' });
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
