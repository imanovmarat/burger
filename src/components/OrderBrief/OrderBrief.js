import React from "react";
import styles from './OrderBrief.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { renderTime } from "../../utils/time";
import { useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";

export function OrderBrief({ id, date, title, ingredients, onClick }) {
  const { ingredients: ingredientList } = useSelector(({ ingredients }) => ingredients)
  const handleClick = () => {
    onClick(id);
  }

  const renderPrice = () => {
    return ingredientList.reduce((acc, i) => {
      if (ingredients.indexOf(i._id) >= 0) {
        acc += i.price;
      }
      return acc
    }, 0)
  }

  const renderPictures = () => {

    const pictures = ingredientList.reduce((acc, i) => {
      if (ingredients.indexOf(i._id) >= 0) {
        acc.push({ id: i._id, img: i.image_mobile, title: i.name });
      }
      return acc
    }, [])

    return pictures.slice(0, 6).map((i, index, array) => {
                                      if (index + 1 !== array.length) {
                                        return <li className={styles.image_wrap} style={{ zIndex: array.length - index }} key={i.id}>
                                          <img className={styles.img}
                                               src={i.img}
                                               alt={i.title}/>
                                        </li>
                                      } else {
                                        if (pictures.length > 6) {
                                          return <li className={styles.image_wrap} style={{
                                            zIndex: array.length - index, position: 'relative',
                                          }} key={i.id}>

                                            <div className={`${styles.figure_wrap} text text_type_main-default`}>
                                              <span>{`+${pictures.length - array.length}`}</span>
                                            </div>
                                            <img className={styles.img}
                                                 src={i.img}
                                                 alt={i.title}/>


                                          </li>
                                        } else {
                                          return <li className={styles.image_wrap} style={{ zIndex: array.length - index }} key={i.id}>
                                            <img className={styles.img}
                                                 src={i.img}
                                                 alt={i.title}/>
                                          </li>
                                        }

                                      }
                                    }
    )
  };

  return <article className={`${styles.container} p-6 mb-4`} onClick={handleClick}>
    <div className={`${styles.service_info_wrap} mb-6`}>
      <span className="text text_type_digits-default">{'#' + id}</span>
      <span className="text text_type_main-default text_color_inactive">{renderTime(date)}</span>
    </div>
    <h2 className="text text_type_main-medium mb-6">{title}</h2>
    <div className={`${styles.img_and_price_wrap} mt-6`}>
      <ul className={styles.ingredients}>
        {renderPictures()}
      </ul>
      <div className={styles.price_wrap}>
        <span className="text text_type_digits-default">{renderPrice()}</span>
        <CurrencyIcon type={"primary"}/>
      </div>
    </div>
  </article>;
}

OrderBrief.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
}
