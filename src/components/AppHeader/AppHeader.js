import React from "react";
import styles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import MenuButton from "../MenuButton/MenuButton";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${styles.header} mt-10`}>
        <nav className={styles.container}>
          <div>
            <MenuButton className="mr-1">
              <BurgerIcon type="primary" />
              <span className="ml-2">Конструктор</span>
            </MenuButton>
            <MenuButton>
              <ListIcon type="secondary" />
              <span className="ml-2 text_color_inactive">Лента заказов</span>
            </MenuButton>
          </div>

          <Logo />
          <MenuButton>
            <ProfileIcon type="secondary" />
            <span className="ml-2 text_color_inactive">Личный кабинет</span>
          </MenuButton>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
