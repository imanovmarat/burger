import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <div className={styles.page}>
      <AppHeader/>
      <div className={styles.container}>
        <main className={styles.content}>
          <section className={`${styles.section} mr-10`}>
            <BurgerIngredients/>
          </section>
          <section className={`${styles.section} pt-25 pl-4`}>
            <BurgerConstructor/>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
