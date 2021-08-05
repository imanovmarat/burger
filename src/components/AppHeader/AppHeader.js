import React from "react";
import styles from "./AppHeader.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className={`${styles.header} mt-10`}>
      <nav className={styles.container}>
        <div>
          <NavLink exact to="/" activeClassName={styles.link_active}
                   className={`${styles.link} mr-1 text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
            <BurgerIcon type="secondary"/>
            <span className="ml-2">Конструктор</span>
          </NavLink>
          <NavLink to="/feed" activeClassName={styles.link_active}
                   className={`${styles.link} mr-1 text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
            <ListIcon type="secondary"/>
            <span className="ml-2">Лента заказов</span>
          </NavLink>
        </div>

        <Logo/>
        <NavLink to="/profile" activeClassName={styles.link_active}
                 className={`${styles.link} mr-1 text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
          <ProfileIcon type="secondary"/>
          <span className="ml-2">Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
