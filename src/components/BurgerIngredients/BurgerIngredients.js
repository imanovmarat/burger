import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import MealCard from "../MealCard/MealCard";
import {data} from "../../utils/data"

export class BurgerIngredients extends React.Component {
  render() {
    const categories = data.reduce((prev, meal) => {
      if (prev.includes(meal.type)) return prev;
      prev.push(meal.type);
      return prev;
    }, [])
    
    return (
      <>
          <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>

          <div className={`${styles.tabs} mb-10`}>
            <Tab value="one" active={true} onClick={() => {}}>Булки</Tab>
            <Tab value="two" active={false} onClick={() => {}}>Соусы</Tab>
            <Tab value="three" active={false} onClick={() => {}}>Начинки</Tab>
          </div>

          <div className={styles.meals}>
            {categories.map((categorie, index) => (
              <React.Fragment key={index}>
                <h2 className="text text_type_main-medium">
                  {
                    categorie === 'bun' 
                    ? 'Булки' 
                    : categorie === 'main'
                    ? 'Начинка'
                    : categorie === 'sauce'
                    ? 'Соус' : 'Что-то пошло не так  :/'
                  }
                </h2>
                <div className={`${styles.cards} pt-6 pr-1 pb-10 pl-4`}>
                  {data.map(meal => categorie === meal.type && (<MealCard key={meal._id} img={meal.image} title={meal.name} price={meal.price}/>))}
                </div>
              </React.Fragment>
            ))}

            {/* Для примера
            <h2 className="text text_type_main-medium">Начинки</h2>
            <div className={`${styles.cards} pt-6 pr-1 pb-10 pl-4`}>
              <MealCard img={img1Path} title="Краторная булка N-200i" price="20" quantity="1"/>
            </div>
            */}
            
          </div>
        </>
    );
  }
}

export default BurgerIngredients;
