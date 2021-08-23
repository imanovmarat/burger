import React, { useEffect } from 'react';
import styles from './OrderDescription.module.css';
import { IngCard } from "../IngCard/IngCard";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { renderTime } from "../../utils/time";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../services/actions/wsActionTypes";


function OrderDescription() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { wsConnected, messages } = useSelector(({ wsReducer }) => wsReducer);
  const { ingredients } = useSelector(({ ingredients }) => ingredients);

  const currentPath = path.split('/')[1]

  useEffect(() => {
    if (!wsConnected && currentPath === 'feed') {
      dispatch({ type: WS_CONNECTION_START, payload: { token: null } })
    }
    return () => dispatch({
                            type: WS_CONNECTION_CLOSE,
                            payload: { code: 1000 }
                          })
  }, [])

  if (ingredients.length === 0 || messages.length === 0) return null;

  const background = history?.action === 'PUSH' && location.state && location.state.background;
  const currentOrder = messages[messages.length - 1]?.orders.find(i => i.number === parseInt(params.id));

  const currentIngredients = currentOrder?.ingredients.reduce((acc, i) => {
    const hasIngredient = ingredients.find(element => element._id === i);
    if (hasIngredient) {
      const alreadyAdded = acc.find(i => i._id === hasIngredient._id);
      alreadyAdded ? alreadyAdded.count++ : acc.push({ ...hasIngredient, count: 1 })
    }
    return acc
  }, [])

  const renderPrice = currentIngredients?.reduce((acc, i) => acc += i.price * i.count, 0)

  return (
    <div className={`${styles.container} ${!background ? 'pt-15' : null}`}>
      <p className={`${styles.number} text text_type_digits-default mb-10`}>{`#${currentOrder?.number}`}</p>
      <h3 className={`${styles.title} text text_type_main-medium mb-3`}>{currentOrder.name}</h3>

      {
        currentOrder.status === 'done'
          ? <span className={`${styles.status} text text_type_main-default text_color_success`}>Выполнен</span>
          : currentOrder.status === 'pending'
            ? <span className={`${styles.status} text text_type_main-default`}>Готовится</span>
            : currentOrder.status === 'created'
              ? <span className={`${styles.status} text text_type_main-default`}>Создан</span>
              : <span className={`${styles.status} text text_type_main-default text_color_error`}>Ошибка</span>

      }

      <p className={`${styles.ingredients} text text_type_main-medium mt-15 mb-6`}>Состав:</p>
      {currentIngredients.map(i => <IngCard key={i._id} img={i.image_mobile} title={i.name} price={i.price}
                                            count={i.count}/>)}
      <div className={`${styles.footer} mt-10`}>
              <span
                className={`${styles.date} text text_type_main-default text_color_inactive`}>{renderTime(currentOrder.updatedAt)}</span>
        <div className={`${styles.total_price_wrap}`}>
          <span className={`${styles.total_price} text text_type_digits-default`}>{renderPrice}</span>
          <CurrencyIcon type={"primary"}/>
        </div>
      </div>

    </div>
  );
}

export default OrderDescription;
