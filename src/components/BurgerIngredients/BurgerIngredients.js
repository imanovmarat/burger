import React, { useContext } from "react";
import styles from "./BurgerIngredients.module.css";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import MealCard from "../MealCard/MealCard";
import { IngredientsContext } from "../../contexts/IngredientsContext";

function BurgerIngredients({ onClick }) {

  const ingredients = useContext(IngredientsContext);

  const categories = ingredients?.reduce((prev, meal) => {
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
        {categories?.map((category, index) => (
          <React.Fragment key={index}>
            <h2 className="text text_type_main-medium">
              {
                category === 'bun'
                  ? 'Булки'
                  : category === 'main'
                  ? 'Начинка'
                  : category === 'sauce'
                    ? 'Соус' : 'Что-то пошло не так  :/'
              }
            </h2>
            <div className={`${styles.cards} pt-6 pr-1 pb-10 pl-4`}>
              {ingredients.map(meal => category === meal.type && (
                <MealCard key={meal._id} data={meal} onClick={onClick}/>))}
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

export default BurgerIngredients;

BurgerIngredients.propTypes = {

  onClick: PropTypes.func.isRequired
}
