import React, { useEffect, useState } from 'react';
import { OrderBrief } from "../OrderBrief/OrderBrief";
// import data from '../../utils/testdata.json'
import { useSocket } from "../../utils/use-socket";
import styles from './Feed.module.css';
import { Stats } from "../Stats/Stats";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Feed() {

  // const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { wsConnected, messages } = useSelector(({ wsReducer }) => wsReducer)

  useEffect(() => {
    console.log('что-то пришло из сокетов')
    dispatch({ type: 'WS_CONNECTION_START', payload: { token: null } })
    return () => dispatch({
                            type: 'WS_CONNECTION_CLOSE',
                            payload: { code: 1000 }
                          })
  }, [dispatch])


  /*
    const { sendData, connect, close } = useSocket('wss://norma.nomoreparties.space/orders/all', {
      onMessage: (e) => {
        const normalizedMessage = JSON.parse(e.data);
        setData(normalizedMessage)
      },
      onDisconnect: e => console.log('onDisconnect', e)
    });
    useEffect(() => {
      console.log('отрыто')
      connect();
      return () => {
        console.log('закрыто')
        close(1000);
      }
    }, [])*/


  if
  (messages.length === 0)
    return null

  const data = messages[messages.length - 1];

  const doneOrders = data.orders.filter(i => i.status === 'done')
  const inProgressOrders = data.orders.filter(i => i.status === 'created' || i.status === 'pending')
  const handleClick = (id) => {
    history.push({ pathname: `/feed/${id}`, state: { background: location } })
  }

  return (
    <>
      <section className={styles.container}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={styles.cards}>
          {data.orders.map(i => <OrderBrief key={i._id}
                                            onClick={handleClick}
                                            id={i.number}
                                            date={i.createdAt}
                                            title={i.name}
                                            ingredients={i.ingredients}/>)}
        </div>
      </section>
      <Stats total={data.total} totalToday={data.totalToday}
             doneOrders={doneOrders} inProgressOrders={inProgressOrders}/>
    </>
  );
}

export default Feed;
