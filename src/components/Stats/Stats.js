import React from "react";
import styles from './Stats.module.css';
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export function Stats({ total, totalToday, doneOrders, inProgressOrders }) {
  console.log('total, totalToday, doneOrders, inProgressOrders', total, totalToday, doneOrders, inProgressOrders)
  const preparedDoneOrders = doneOrders.map((i, index) => {
    if (index >= 10) return
    return <p key={i._id}
              className="text text_type_digits-default text_color_success">{i.number}</p>
  });

  const preparedInProgressOrders = inProgressOrders.map((i, index) => {
    if (index >= 10) return
    return <p key={i._id}
              className="text text_type_digits-default">{i.number}</p>
  });

  function separator(array, step) {
    let subarray = [];
    for (let i = 0; i < Math.ceil(array.length / step); i++) {
      subarray[i] = array.slice((i * step), (i * step) + step);
    }
    return subarray;
  }

  function $element(i) {
    return <div key={nanoid()} className={`${styles.order_list} mb-4`}>{i}</div>
  }

  return <section className={`${styles.section} mt-20 ml-15`}>
    <div className={`${styles.orders_board} mb-15`}>
      <article className={styles.board}>
        <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
        <div className={styles.orders_wrap}>
          {separator(preparedDoneOrders, 5).map($element)}
        </div>
      </article>
      <article className={styles.board}>
        <h3 className="text text_type_main-medium mb-6">В работе:</h3>
        {separator(preparedInProgressOrders, 5).map($element)}
      </article>
    </div>
    <article>
      <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
      <p className={`${styles.total} text text_type_digits-large`}>{total}</p>
    </article>
    <article>
      <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
      <p className={`${styles.total_today} text text_type_digits-large`}>{totalToday}</p>
    </article>
  </section>;
}

Stats.propTypes = {
  total: PropTypes.number.isRequired,
  totalToday: PropTypes.number.isRequired,
  doneOrders: PropTypes.array.isRequired,
  inProgressOrders: PropTypes.array.isRequired
}
