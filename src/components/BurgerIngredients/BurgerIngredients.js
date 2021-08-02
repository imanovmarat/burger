import React, { useEffect } from "react";
import styles from "./BurgerIngredients.module.css";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import MealCard from "../MealCard/MealCard";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions";
import {
  INGREDIENT_DETAILS_SET_STATUS,
  INGREDIENT_DETAILS_SET_VALUE
} from "../../services/actions/ingredientDetailsModal";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(({ ingredients }) => ingredients)

  const handleOpenModal = (ing) => {
    dispatch({
               type: INGREDIENT_DETAILS_SET_VALUE,
               payload: ing
             });

    dispatch({
               type: INGREDIENT_DETAILS_SET_STATUS,
               payload: { isModalOpen: true }
             });
  }

  const categories = ingredients?.reduce((prev, meal) => {
    if (prev.includes(meal.type)) return prev;
    prev.push(meal.type);
    return prev;
  }, [])

  const [nearest, setNearest] = React.useState('bun'); //TODO подумать как исправить начальное значение на динамику
  const scrollContainerRef = React.useRef(null);
  const elemRefs = React.useRef({});

  function titleCategory(title) {
    switch (title) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинка';
      case 'sauce':
        return 'Соус';

      default:
        return 'Что-то пошло не так  :/'
    }
  }

  const handleScroll = () => {
    const scrollContainerPosition = scrollContainerRef.current.getBoundingClientRect().top;
    let minDiff = Number.POSITIVE_INFINITY;
    let minName = "";

    const keys = Object.keys(elemRefs.current);
    keys.forEach((key) => {
      const ref = elemRefs.current[key];
      const diff = Math.abs(scrollContainerPosition - ref.getBoundingClientRect().top);

      if (diff < minDiff) {
        minDiff = diff;
        minName = key;
      }
    });

    setNearest(minName);
  };


  return (
    <>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>

      <div className={`${styles.tabs} mb-10`}>
        {categories?.map(i => <Tab key={i} value={i} active={i === nearest} onClick={null}>{titleCategory(i)}</Tab>)}
      </div>

      <div className={styles.meals} ref={scrollContainerRef} onScroll={handleScroll}>
        {categories?.map((category, index) => (
          <React.Fragment key={index}>
            <h2 className="text text_type_main-medium" ref={element => {
              if (!elemRefs.current[category]) {
                elemRefs.current[category] = element;
              }
            }}>
              {
                titleCategory(category)
              }
            </h2>
            <div className={`${styles.cards} pt-6 pr-1 pb-10 pl-4`}>
              {ingredients.map(meal => category === meal.type && (
                <MealCard key={meal._id} data={meal} onClick={handleOpenModal}/>))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default BurgerIngredients;
